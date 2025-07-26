# Admin's Dashboard - Full Stack E-Commerce Management System

A comprehensive admin dashboard for managing an e-commerce platform, built with a .NET Core API backend and a modern JavaScript/HTML/CSS frontend.

## 🏗️ Project Structure

```
Addmi's DashBoard/
├── ECommerceApi/                    # .NET Core Backend
│   ├── Controllers/                 # API Controllers
│   │   ├── ProductsController.cs    # Product management endpoints
│   │   ├── CategoriesController.cs  # Category management endpoints
│   │   ├── UsersController.cs       # User management endpoints
│   │   ├── OrdersController.cs      # Order management endpoints
│   │   └── AdminController.cs       # Admin profile & settings endpoints
│   ├── Models/                      # Data Models
│   │   ├── Product.cs               # Product entity
│   │   ├── Category.cs              # Category entity
│   │   ├── User.cs                  # User entity
│   │   ├── Order.cs                 # Order entity
│   │   └── Admin.cs                 # Admin entity
│   ├── Data/                        # Database & Data Access
│   │   ├── ApplicationDbContext.cs  # Entity Framework context
│   │   └── DbInitializer.cs         # Database seeding
│   ├── Program.cs                   # Application startup & configuration
│   └── appsettings.json             # Configuration settings
├── frontend/                        # Frontend Application
│   ├── index.html                   # Main dashboard page
│   ├── app.js                       # Core JavaScript functionality
│   ├── styles.css                   # Custom styling
│   └── test-backend.html            # Backend API testing
└── README.md                        # This file
```

## 🚀 Quick Start

### Backend Setup

```bash
cd ECommerceApi
dotnet restore
dotnet ef database update
dotnet run
```

The API will be available at `http://localhost:5266`

### Frontend Setup

```bash
cd frontend
# Open index.html in a web browser
# Or serve with a local server
python -m http.server 8000
```

## 🔧 Backend Architecture (.NET Core API)

### Core Technologies

- **ASP.NET Core 8.0** - Web framework
- **Entity Framework Core** - ORM for database operations
- **SQL Server** - Database
- **Swagger/OpenAPI** - API documentation

### Key Components

#### 1. Data Models (`Models/`)

**Product.cs** - Product entity with enhanced properties:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ImageUrl { get; set; }        // Product image URL
    public string Description { get; set; }     // Product description
    public decimal Price { get; set; }
    public double Rating { get; set; }          // Product rating (0.0-5.0)
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
}
```

**User.cs** - User entity with management features:

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string? AvatarUrl { get; set; }
    public bool IsBlocked { get; set; } = false;        // Permanent block
    public DateTime? BlockUntil { get; set; }           // Temporary restriction
    public bool IsRestricted { get; set; } = false;     // Access restriction
    public List<Product>? Products { get; set; }
}
```

**Admin.cs** - Admin profile management:

```csharp
public class Admin
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string? AvatarUrl { get; set; }
    public string Password { get; set; }        // Hashed password
    public bool DarkModeAuto { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
```

#### 2. API Controllers (`Controllers/`)

**ProductsController.cs** - Product management endpoints:

```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<object>>> GetProducts()
{
    var products = await _context.Products
        .Include(p => p.Category)
        .Include(p => p.User)
        .Select(p => new
        {
            name = p.Name,
            imageUrl = p.ImageUrl,
            category = p.Category != null ? p.Category.Name : "Unknown",
            listedBy = p.User != null ? p.User.Name : "Unknown",
            avatarUrl = p.User != null ? p.User.AvatarUrl : "",
            description = p.Description,
            price = p.Price,
            rating = p.Rating
        })
        .ToListAsync();
    return Ok(products);
}
```

**UsersController.cs** - User management with status controls:

```csharp
[HttpPut("{id}/block")]
public async Task<IActionResult> BlockUser(int id)
{
    var user = await _context.Users.FindAsync(id);
    if (user == null) return NotFound();
    user.IsBlocked = true;
    await _context.SaveChangesAsync();
    return Ok(new { message = $"User {user.Name} has been blocked successfully." });
}

[HttpPut("{id}/restrict")]
public async Task<IActionResult> RestrictUser(int id)
{
    var user = await _context.Users.FindAsync(id);
    if (user == null) return NotFound();
    user.IsRestricted = true;
    await _context.SaveChangesAsync();
    return Ok(new { message = $"User {user.Name} has been restricted successfully." });
}
```

**AdminController.cs** - Admin profile & settings management:

```csharp
[HttpPut("profile")]
public async Task<IActionResult> UpdateAdminProfile([FromBody] AdminProfileUpdateDto dto)
{
    var admin = await _context.Admins.FirstOrDefaultAsync();
    if (admin == null) return NotFound();

    admin.Name = dto.Name;
    admin.Email = dto.Email;
    admin.Phone = dto.Phone;
    admin.AvatarUrl = dto.AvatarUrl;
    admin.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();
    return Ok(new { message = "Profile updated successfully" });
}
```

#### 3. Database Context (`Data/`)

**ApplicationDbContext.cs** - Entity Framework configuration:

```csharp
public class ApplicationDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Admin> Admins { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=ECommerceDb;Trusted_Connection=true;MultipleActiveResultSets=true");
    }
}
```

**DbInitializer.cs** - Database seeding with sample data:

```csharp
public static void Initialize(ApplicationDbContext context)
{
    // Seed default admin
    if (!context.Admins.Any())
    {
        var admin = new Admin
        {
            Name = "Admin User",
            Email = "admin@example.com",
            Phone = "+1234567890",
            Password = HashPassword("admin123"),
            DarkModeAuto = false
        };
        context.Admins.Add(admin);
    }

    // Seed categories, users, products, and orders...
    context.SaveChanges();
}
```

#### 4. Application Configuration (`Program.cs`)

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add CORS for frontend communication
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:8000", "http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Database seeding on startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    DbInitializer.Initialize(context);
}
```

## 🎨 Frontend Architecture (JavaScript/HTML/CSS)

### Core Technologies

- **Vanilla JavaScript** - Core functionality
- **HTML5** - Structure
- **CSS3** - Styling with custom properties
- **Bootstrap 5.3.2** - UI components
- **Font Awesome** - Icons

### Key Components

#### 1. Main Page (`index.html`)

**Structure:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Bootstrap, Font Awesome, Custom CSS -->
  </head>
  <body>
    <!-- Top Bar with dark mode toggle -->
    <header class="topbar">
      <h1 class="dashboard-title">Admin's Dashboard</h1>
      <button id="darkModeToggle">
        <i class="fas fa-moon"></i>
      </button>
    </header>

    <div class="dashboard-container">
      <!-- Sidebar Navigation -->
      <nav class="sidebar">
        <ul class="nav nav-pills">
          <li>
            <a href="#"><i class="fas fa-chart-line"></i>Dashboard</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-list"></i>Categories</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-box-open"></i>Products</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-users"></i>Users</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-cog"></i>Settings</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-shopping-cart"></i>Orders</a>
          </li>
        </ul>
      </nav>

      <!-- Main Content Area -->
      <div class="main-content">
        <main class="app-content">
          <!-- Dynamic content loaded here -->
        </main>
      </div>
    </div>
  </body>
</html>
```

#### 2. Core JavaScript (`app.js`)

**API Integration:**

```javascript
const API_BASE_URL = "http://localhost:5266/api";

// Fetch data from backend with fallback to static data
async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (response.ok) {
      products = await response.json();
    } else {
      throw new Error("Failed to fetch products");
    }
  } catch (error) {
    console.warn("Using static product data:", error);
    // Fallback to static data
    products = [
      /* static product data */
    ];
  }
}
```

**Dynamic Page Rendering:**

```javascript
function renderDashboardPage() {
  const main = document.querySelector(".app-content");
  main.innerHTML = `
        <div class="dashboard-container">
            <!-- Statistics Cards -->
            <div class="row g-4 mb-4">
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-box-open"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number">${totalProducts}</div>
                            <div class="stat-label">Total Products</div>
                        </div>
                    </div>
                </div>
                <!-- More stat cards... -->
            </div>
            
            <!-- Top Rated Products Section -->
            <div class="section-card">
                <div class="section-header">
                    <h4><i class="fas fa-star"></i> Top Rated Products</h4>
                </div>
                <div class="row g-3">
                    ${topRatedProducts
                      .map(
                        (product) => `
                        <div class="col-12 col-md-6 col-lg-3">
                            <div class="product-card-small">
                                <div class="product-image-small">
                                    <img src="${product.imageUrl}" alt="${product.name}">
                                </div>
                                <div class="product-info-small">
                                    <div class="product-name">${product.name}</div>
                                    <div class="product-meta">
                                        <span class="rating">
                                            <i class="fas fa-star"></i> ${product.rating}
                                        </span>
                                        <span class="price">DH${product.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;
}
```

**User Management Functions:**

```javascript
async function blockUser(userName) {
  if (confirm(`Are you sure you want to block ${userName}?`)) {
    const user = users.find((u) => u.name === userName);
    if (user) {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${user.id}/block`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const result = await response.json();
          showNotification(result.message, "success");
          await fetchUsers(); // Refresh data
          renderUsersPage(); // Update UI
        }
      } catch (error) {
        showNotification("Network error while blocking user", "danger");
      }
    }
  }
}
```

**Settings Management:**

```javascript
async function loadAdminProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/profile`);
    if (response.ok) {
      adminProfile = await response.json();
    } else {
      throw new Error("Failed to load admin profile");
    }
  } catch (error) {
    console.warn("Using default admin profile:", error);
    adminProfile = {
      name: "Admin User",
      email: "admin@example.com",
      phone: "+1234567890",
      avatarUrl: "https://example.com/avatar.jpg",
      darkModeAuto: false,
    };
  }
}
```

#### 3. Styling (`styles.css`)

**CSS Custom Properties for Theming:**

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
  --card-bg: #ffffff;
  --sidebar-bg: #0d6efd;
  --topbar-bg: #f8f9fa;
  --hover-bg: #e9ecef;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --border-color: #404040;
  --card-bg: #2d2d2d;
  --sidebar-bg: #1e3a8a;
  --topbar-bg: #1e3a8a;
  --hover-bg: #374151;
}
```

**Responsive Layout:**

```css
.sidebar {
  width: 200px;
  min-height: calc(100vh - 88px);
  border-radius: 0 2rem 2rem 0; /* Rounded right side only */
  position: fixed;
  top: 88px;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
  max-height: calc(100vh - 88px);
}

.main-content {
  margin-left: 200px; /* Width of sidebar */
  min-height: calc(100vh - 88px);
  background: var(--bg-secondary);
}

.app-content {
  background: var(--card-bg);
  border-radius: 0 0 1.5rem 1.5rem; /* Rounded bottom only */
  min-height: 70vh;
  padding: 1.5rem;
}
```

**Dark Mode Support:**

```css
body.dark-mode {
  background: #181f2a;
  color: #e0e6ed;
  transition: background 0.3s, color 0.3s;
}

.dark-mode .sidebar {
  background: linear-gradient(135deg, #1e293b 80%, #0f172a 100%);
  box-shadow: 2px 0 12px rgba(15, 23, 42, 0.18);
}

.dark-mode .app-content {
  background: #181f2a;
  color: #e0e6ed;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.1);
}
```

## 🔄 Frontend-Backend Integration

### API Communication Flow

1. **Data Fetching:**

   ```javascript
   // Frontend makes API calls to backend
   const response = await fetch(`${API_BASE_URL}/products`);
   const products = await response.json();
   ```

2. **Error Handling:**

   ```javascript
   try {
     const response = await fetch(`${API_BASE_URL}/products`);
     if (response.ok) {
       products = await response.json();
     } else {
       throw new Error("API request failed");
     }
   } catch (error) {
     // Fallback to static data
     products = [
       /* static data */
     ];
   }
   ```

3. **Real-time Updates:**
   ```javascript
   // After user actions, refresh data and UI
   await fetchUsers();
   renderUsersPage();
   ```

### CORS Configuration

Backend allows frontend communication:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:8000", "http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

## 📊 Dashboard Features

### 1. **Dashboard Page**

- Total Products, Users, Categories statistics
- Top Rated Products display
- Top Selling Products display
- Total Orders, Confirmed, Delivered statistics
- Real-time data from backend

### 2. **Categories Page**

- Display all product categories
- Interactive category cards with icons
- Click to filter products by category
- Back button to return to all categories

### 3. **Products Page**

- Display all products with images
- Product details: name, category, price, rating
- User avatars for product owners
- Responsive grid layout
- Category filtering functionality

### 4. **Users Page**

- User management with status badges
- Block/Unblock functionality
- Restrict/Unrestrict functionality
- Delete user functionality
- Real-time status updates

### 5. **Settings Page**

- Admin profile management
- Password change functionality
- Dark mode toggle
- Profile preview
- Backend persistence

### 6. **Orders Page**

- Order management display
- Order status tracking
- Product information in orders
- Order statistics

## 🎨 UI/UX Features

### Design System

- **Color Scheme:** Blue-based theme with white content areas
- **Typography:** Segoe UI font family
- **Icons:** Font Awesome icons throughout
- **Spacing:** Consistent padding and margins
- **Shadows:** Subtle shadows for depth

### Responsive Design

- **Desktop:** Full sidebar with text labels
- **Tablet:** Compact sidebar
- **Mobile:** Collapsed sidebar with icons only

### Dark Mode

- **Toggle:** Moon/Sun icon in top bar
- **Persistence:** Local storage for preference
- **Smooth Transitions:** 0.3s transition animations
- **Complete Coverage:** All components support dark mode

### Interactive Elements

- **Hover Effects:** Cards lift and scale on hover
- **Loading States:** Smooth transitions between pages
- **Notifications:** Toast notifications for user feedback
- **Confirmation Dialogs:** For destructive actions

## 🔧 Development Workflow

### Backend Development

1. **Model Changes:** Update entity models
2. **Migration:** `dotnet ef migrations add MigrationName`
3. **Database Update:** `dotnet ef database update`
4. **Controller Updates:** Add/modify API endpoints
5. **Testing:** Use Swagger UI or test files

### Frontend Development

1. **HTML Structure:** Update `index.html`
2. **JavaScript Logic:** Modify `app.js`
3. **Styling:** Update `styles.css`
4. **Testing:** Open in browser and test functionality

### API Testing

Use the included `test-backend.html` file to test API endpoints:

```html
<button onclick="testGetProducts()">Test Get Products</button>
<button onclick="testGetUsers()">Test Get Users</button>
```

## 🚀 Deployment

### Backend Deployment

1. Build the project: `dotnet build`
2. Publish: `dotnet publish -c Release`
3. Deploy to hosting platform (Azure, AWS, etc.)

### Frontend Deployment

1. Static files can be deployed to any web server
2. Update `API_BASE_URL` in `app.js` to point to production backend
3. Deploy to platforms like Netlify, Vercel, or traditional hosting

## 📝 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get specific product
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get specific category
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### Users

- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get specific user
- `PUT /api/users/{id}/block` - Block user
- `PUT /api/users/{id}/unblock` - Unblock user
- `PUT /api/users/{id}/restrict` - Restrict user
- `PUT /api/users/{id}/unrestrict` - Unrestrict user
- `DELETE /api/users/{id}` - Delete user

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders/statistics` - Get order statistics
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}` - Update order status

### Admin

- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile
- `PUT /api/admin/settings` - Update admin settings
- `POST /api/admin/change-password` - Change admin password
- `POST /api/admin/login` - Admin login

## 🔒 Security Features

### Backend Security

- **Password Hashing:** SHA256 hashing for admin passwords
- **CORS Protection:** Configured CORS policy
- **Input Validation:** Model validation attributes
- **Error Handling:** Proper error responses

### Frontend Security

- **Input Sanitization:** HTML encoding for user inputs
- **Confirmation Dialogs:** For destructive actions
- **Error Handling:** Graceful error handling with fallbacks

## 📈 Performance Optimizations

### Backend

- **Entity Framework:** Optimized queries with Include()
- **Database Indexing:** Proper database indexes
- **Caching:** Consider implementing caching for frequently accessed data

### Frontend

- **Lazy Loading:** Images loaded on demand
- **Efficient DOM Updates:** Minimal DOM manipulation
- **CSS Optimization:** Efficient selectors and properties
- **Asset Optimization:** Minified CSS and JavaScript for production

## 🧪 Testing

### Backend Testing

- **Unit Tests:** Test individual components
- **Integration Tests:** Test API endpoints
- **Database Tests:** Test data operations

### Frontend Testing

- **Manual Testing:** Test all user interactions
- **Cross-browser Testing:** Test in different browsers
- **Responsive Testing:** Test on different screen sizes

## 📚 Dependencies

### Backend Dependencies

- `Microsoft.EntityFrameworkCore.SqlServer` - SQL Server provider
- `Microsoft.EntityFrameworkCore.Tools` - EF Core tools
- `Swashbuckle.AspNetCore` - Swagger documentation

### Frontend Dependencies

- `Bootstrap 5.3.2` - UI framework
- `Font Awesome 6.4.0` - Icons
- `Vanilla JavaScript` - Core functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

1. Check the documentation
2. Review the code comments
3. Test the API endpoints
4. Check browser console for errors

---

**Note:** This is a comprehensive admin dashboard system designed for e-commerce management. The system provides full CRUD operations for products, categories, users, and orders, with a modern, responsive interface and robust backend API.
