# Admin's Dashboard - Full Stack Application

A modern admin dashboard with a .NET Core backend API and a responsive frontend built with HTML, CSS, JavaScript, and Bootstrap.

## 🏗️ Architecture Overview

This is a **full-stack web application** consisting of:

- **Backend**: ASP.NET Core Web API with Entity Framework Core
- **Database**: SQL Server with seeded data
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Icons**: Font Awesome for UI elements

## 📁 Project Structure

```
Addmi's DashBoard/
├── ECommerceApi/                 # Backend API (.NET Core)
│   ├── Controllers/              # API endpoints
│   ├── Data/                     # Database context and seeding
│   ├── Models/                   # Entity models
│   ├── Migrations/               # Database migrations
│   └── Program.cs                # Application startup
└── frontend/                     # Frontend application
    ├── index.html               # Main dashboard page
    ├── app.js                   # Frontend logic
    ├── styles.css               # Custom styling
    └── test-backend.html        # API testing page
```

## 🚀 Quick Start

### Backend Setup

1. **Navigate to the backend directory:** `cd ECommerceApi`
2. **Start the backend server:** `dotnet run`
3. **API will be available at:** `http://localhost:5266`
4. **API Documentation:** `http://localhost:5266/swagger`

### Frontend Setup

1. **Navigate to the frontend directory:** `cd frontend`
2. **Open with Live Server or any local server**
3. **Access the dashboard:** `http://localhost:5500/index.html` (adjust port if different)

## 📋 Detailed File Explanations

### Backend Files (ECommerceApi/)

#### **Models/**

- **`Product.cs`** - Product entity with name, image, category, user, description, price, and rating
- **`Category.cs`** - Category entity with name and navigation properties
- **`User.cs`** - User entity with name, email, phone, avatar, and navigation properties
- **`Admin.cs`** - Admin entity with profile information, authentication, and settings
- **`Order.cs`** - Order entity for managing customer orders
- **`Cart.cs`** - Cart entity for shopping cart functionality
- **`CartItem.cs`** - Cart item entity linking products to carts
- **`Message.cs`** - Message entity for communication features

#### **Controllers/**

- **`ProductsController.cs`** - Handles product CRUD operations with category and user data
- **`CategoriesController.cs`** - Manages categories with Font Awesome icon mapping
- **`UsersController.cs`** - Handles user management and profile information
- **`AdminController.cs`** - Manages admin profile, authentication, and settings
- **`OrdersController.cs`** - Handles order management
- **`CartsController.cs`** - Manages shopping cart operations
- **`CartItemsController.cs`** - Handles cart item operations

#### **Data/**

- **`ApplicationDbContext.cs`**: Entity Framework Core database context:

  - Defines database tables and relationships
  - Configures entity relationships and constraints

- **`DbInitializer.cs`**: Database seeding logic:
  - Creates initial data when application starts
  - Seeds 4 categories, 4 users, and 20 products
  - Prevents re-seeding if data already exists

#### **Program.cs**

- Application startup configuration:
  - Configures services and middleware
  - Sets up CORS for frontend communication
  - Initializes database with seed data
  - Configures API routing and Swagger documentation

#### **Migrations/**

- **`20250712164318_InitialCreate.cs`**: Creates initial database schema
- **`20250713132616_AddECommerceEntities.cs`**: Adds e-commerce entities
- **`20250714151429_AddUserAndCartEntities.cs`**: Adds user and cart entities
- **`20250715185738_FixUserProductRelation.cs`**: Fixes user-product relationships
- **`20250725222254_AddMissingColumns.cs`**: Adds missing columns for frontend compatibility
- **`20250725225434_AddPhoneNumberToUser.cs`**: Adds phone number to users

### Frontend Files (frontend/)

#### **`index.html`**

- Main dashboard page with:
  - Responsive layout with sidebar and main content area
  - Bootstrap 5 for styling and components
  - Font Awesome icons for navigation
  - Dark mode toggle functionality
  - Sidebar navigation with Dashboard, Categories, Products, Users, Orders, Notification

#### **`app.js`**

- Core frontend logic:
  - **API Integration**: Fetches data from backend API endpoints
  - **Dynamic Content Rendering**: Generates HTML for different pages
  - **Event Handling**: Manages user interactions and navigation
  - **Dark Mode**: Toggles and persists dark mode preference
  - **Fallback Logic**: Uses static data if API is unavailable

**Key Functions:**

- `fetchCategories()`: Gets categories from `/api/categories`
- `fetchProducts()`: Gets products from `/api/products`
- `fetchUsers()`: Gets users from `/api/users`
- `renderCategoriesPage()`: Displays category cards with icons
- `renderProductsPage()`: Displays product cards with details
- `renderUsersPage()`: Displays user cards with profiles
- `setActiveSidebar()`: Manages navigation state

#### **`styles.css`**

- Custom styling for the dashboard:
  - **Theme Colors**: Blue-based modern theme with white content area
  - **Layout**: Responsive sidebar and main content layout
  - **Components**: Styled cards, buttons, and navigation elements
  - **Dark Mode**: Complete dark theme implementation
  - **Responsive Design**: Mobile-friendly media queries
  - **Animations**: Smooth transitions and hover effects

**Key Features:**

- CSS custom properties for theme colors
- Flexbox and Grid layouts
- Card designs for products, categories, and users
- Hover effects and transitions
- Dark mode color schemes

#### **`test-backend.html`**

- API testing page for development:
  - Tests connection to backend API
  - Displays JSON responses from all endpoints
  - Useful for debugging API issues
  - Shows Categories, Users, and Products data

## 🔄 How the Application Works

### **Data Flow:**

1. **Backend Startup**:

   - Entity Framework creates/updates database schema
   - `DbInitializer` seeds the database with sample data
   - API endpoints become available at `http://localhost:5266`

2. **Frontend Loading**:

   - `index.html` loads with Bootstrap and custom styles
   - `app.js` initializes and fetches data from API
   - If API is available, loads live data; otherwise uses static fallback

3. **User Interaction**:
   - User clicks sidebar navigation items
   - JavaScript renders appropriate content (categories, products, users)
   - Dark mode toggle persists preference in localStorage

### **API Endpoints:**

- `GET /api/categories`: Returns categories with icons
- `GET /api/products`: Returns products with seller and category info
- `GET /api/users`: Returns users with profile information

### **Database Schema:**

- **Users**: 4 users with profiles and contact info
- **Categories**: 4 categories (Fashion, Health & Beauty, Food & Drinks, Technology)
- **Products**: 20 products distributed among users (5 each)
- **Relationships**: Products belong to categories and users

## 🎨 Features

### **Dashboard Features:**

- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Interactive Navigation**: Smooth page transitions
- ✅ **Real-time Data**: Fetches data from backend API
- ✅ **Fallback System**: Works offline with static data
- ✅ **Modern UI**: Bootstrap 5 with custom styling

### **Pages:**

- **Dashboard**: Welcome page with navigation instructions
- **Categories**: Displays 4 category cards with icons and click functionality
- **Products**: Shows 20 product cards with images, prices, ratings, and seller info
- **Users**: Displays 4 user cards with avatars, names, emails, and phone numbers

### **Interactive Features:**

- **Category Filtering**: Click a category to see its products
- **Back Navigation**: Return to all categories view
- **Dark Mode Toggle**: Switch between themes
- **Responsive Sidebar**: Collapses on mobile devices

## 🛠️ Technical Stack

### **Backend:**

- **Framework**: ASP.NET Core 8.0
- **ORM**: Entity Framework Core
- **Database**: SQL Server
- **API**: RESTful endpoints with JSON responses
- **Documentation**: Swagger/OpenAPI

### **Frontend:**

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript**: ES6+ with async/await
- **Bootstrap**: 5.3.2 for responsive components
- **Font Awesome**: Icons for UI elements

### **Development Tools:**

- **Package Manager**: NuGet (backend), CDN (frontend)
- **Database**: SQL Server Express
- **API Testing**: Swagger UI, custom test page

## 🔧 Customization

### **Adding New Features:**

1. **Backend**: Add new models, controllers, and migrations
2. **Frontend**: Add new JavaScript functions and HTML templates
3. **Styling**: Extend CSS with new component styles

### **Modifying Data:**

1. **Update `DbInitializer.cs`** to change seed data
2. **Modify models** to add new properties
3. **Update controllers** to return new data formats

### **Styling Changes:**

1. **Theme Colors**: Modify CSS custom properties in `styles.css`
2. **Layout**: Adjust flexbox/grid properties
3. **Components**: Update Bootstrap classes or add custom CSS

## 🚨 Troubleshooting

### **Common Issues:**

- **Backend won't start**: Check if SQL Server is running
- **Database errors**: Run `dotnet ef database update`
- **Frontend shows no data**: Check if backend is running on port 5266
- **CORS errors**: Ensure CORS is configured in `Program.cs`

### **API Testing:**

- Use `frontend/test-backend.html` to test API endpoints
- Check browser console for JavaScript errors
- Verify API responses in Network tab

## 📝 Future Enhancements

### **Potential Features:**

- **Authentication**: User login and authorization
- **CRUD Operations**: Add, edit, delete products/users
- **Search & Filtering**: Advanced product search
- **Orders Management**: Process and track orders
- **Real-time Updates**: WebSocket integration
- **Image Upload**: File upload functionality
- **Analytics Dashboard**: Charts and statistics

### **Technical Improvements:**

- **Caching**: Redis for performance optimization
- **Logging**: Structured logging with Serilog
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipeline
- **Docker**: Containerization for deployment

## 📄 License

This project is for educational and demonstration purposes.

---

**🎉 Your Admin's Dashboard is now fully functional with a complete backend-frontend integration!**

## Backend API Endpoints

### Admin Management

- **GET** `/api/admin/profile` - Get admin profile information
- **PUT** `/api/admin/profile` - Update admin profile (name, email, phone, avatar, password)
- **POST** `/api/admin/login` - Admin authentication
- **POST** `/api/admin/change-password` - Change admin password
- **PUT** `/api/admin/settings` - Update admin settings (dark mode)

### Categories

- **GET** `/api/categories` - Get all categories with icons
- **POST** `/api/categories` - Create new category
- **PUT** `/api/categories/{id}` - Update category
- **DELETE** `/api/categories/{id}` - Delete category

### Products

- **GET** `/api/products` - Get all products with category and user info
- **POST** `/api/products` - Create new product
- **PUT** `/api/products/{id}` - Update product
- **DELETE** `/api/products/{id}` - Delete product

### Users

- **GET** `/api/users` - Get all users with profile information
- **POST** `/api/users` - Create new user
- **PUT** `/api/users/{id}` - Update user
- **DELETE** `/api/users/{id}` - Delete user

### Orders

- **GET** `/api/orders` - Get all orders
- **POST** `/api/orders` - Create new order
- **PUT** `/api/orders/{id}` - Update order
- **DELETE** `/api/orders/{id}` - Delete order

### Carts

- **GET** `/api/carts` - Get all carts
- **POST** `/api/carts` - Create new cart
- **PUT** `/api/carts/{id}` - Update cart
- **DELETE** `/api/carts/{id}` - Delete cart

### Cart Items

- **GET** `/api/cartitems` - Get all cart items
- **POST** `/api/cartitems` - Create new cart item
- **PUT** `/api/cartitems/{id}` - Update cart item
- **DELETE** `/api/cartitems/{id}` - Delete cart item
