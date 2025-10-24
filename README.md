# Admin Dashboard - E-Commerce Management System

Enterprise-grade administrative dashboard for e-commerce platform management, built with ASP.NET Core 8.0 backend and modern JavaScript frontend.

## Overview

This application provides a comprehensive management interface for e-commerce operations, including product catalog management, user administration, order processing, and analytics. The system follows RESTful API design principles with a decoupled frontend architecture.

## 📸 Screenshots

![dashboard.png](https...)
*Caption: Main dashboard overview.*

![products.png](https...)
*Caption: Product management page.*

## Core Features

### Dashboard
- Real-time statistics and analytics
- Top-rated products display
- Order status overview
- Key performance indicators

### Product Management
- Full CRUD operations for products
- Category-based organization
- Image management
- Pricing and inventory tracking
- Rating system

### User Management
- User account administration
- Status management (Active, Blocked, Restricted)
- Profile management
- Activity tracking

### Order Management
- Order processing and tracking
- Status management (Pending, Confirmed, Delivered)
- Order statistics and reporting

### Admin Settings
- Profile management
- Security settings
- Theme customization (Dark/Light mode)
- System preferences

## Architecture

### Technology Stack

**Backend:**
- ASP.NET Core 8.0 Web API
- Entity Framework Core (ORM)
- SQL Server
- OpenAPI/Swagger (API Documentation)

**Frontend:**
- Vanilla JavaScript (ES6+)
- HTML5/CSS3
- Bootstrap 5.3.2
- Font Awesome 6.4.0

### Project Structure

```
Admin-Dashboard/
├── ECommerceApi/                    # Backend Web API
│   ├── Controllers/                 # RESTful API controllers
│   ├── Models/                      # Domain entities
│   ├── Data/                        # Data access layer & context
│   ├── Program.cs                   # Application entry point
│   └── appsettings.json             # Configuration (template)
└── frontend/                        # Frontend SPA
    ├── index.html                   # Main application shell
    ├── app.js                       # Application logic
    └── styles.css                   # Custom styles
```

## Getting Started

### Prerequisites

- .NET 8.0 SDK or later
- SQL Server (LocalDB, Express, or Full)
- Modern web browser (Chrome, Firefox, Edge)

### Backend Configuration

1. **Configure Database Connection**

   Update `appsettings.json` with your SQL Server connection string:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=YOUR_SERVER;Database=ECommerceDb;Trusted_Connection=true;MultipleActiveResultSets=true"
     }
   }
   ```

2. **Initialize Database**

   ```bash
   cd ECommerceApi
   dotnet restore
   dotnet ef database update
   ```

3. **Run Backend**

   ```bash
   dotnet run
   ```

   API will be accessible at `https://localhost:5266` (or configured port)

### Frontend Configuration

1. **Update API Endpoint**

   In `frontend/app.js`, configure the backend URL:
   ```javascript
   const API_BASE_URL = "https://localhost:5266/api";
   ```

2. **Serve Frontend**

   Option 1 - Simple HTTP Server:
   ```bash
   cd frontend
   python -m http.server 8000
   ```

   Option 2 - Open directly:
   ```bash
   # Open index.html in your browser
   ```

## API Documentation

### Base URL
```
http://localhost:5266/api
```

### Endpoints Overview

#### Products
- `GET /api/products` - Retrieve all products
- `GET /api/products/{id}` - Retrieve specific product
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

#### Categories
- `GET /api/categories` - Retrieve all categories
- `GET /api/categories/{id}` - Retrieve specific category
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

#### Users
- `GET /api/users` - Retrieve all users
- `GET /api/users/{id}` - Retrieve specific user
- `PUT /api/users/{id}/block` - Block user account
- `PUT /api/users/{id}/unblock` - Unblock user account
- `PUT /api/users/{id}/restrict` - Restrict user access
- `PUT /api/users/{id}/unrestrict` - Remove restrictions
- `DELETE /api/users/{id}` - Delete user account

#### Orders
- `GET /api/orders` - Retrieve all orders
- `GET /api/orders/statistics` - Retrieve order statistics
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}` - Update order status

#### Admin
- `GET /api/admin/profile` - Retrieve admin profile
- `PUT /api/admin/profile` - Update admin profile
- `PUT /api/admin/settings` - Update admin settings
- `POST /api/admin/change-password` - Change admin password
- `POST /api/admin/login` - Admin authentication

For detailed API documentation, run the application and navigate to `/swagger` endpoint.

## Development

### Database Migrations

Create a new migration after model changes:
```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

### Running Tests

The project includes API endpoint testing capabilities via Swagger UI at `/swagger`.

### CORS Configuration

For production deployments, update CORS policy in `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("https://your-production-domain.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

## Security

### Backend Security Measures
- Password hashing using SHA256 algorithm
- CORS policy enforcement
- Model validation attributes
- Comprehensive error handling and logging

### Frontend Security
- Input sanitization
- Confirmation dialogs for destructive operations
- Graceful error handling with user feedback

### Security Best Practices
1. **Never commit sensitive data** - Use environment variables or secure configuration management
2. **Change default credentials** - Update admin credentials after initial setup
3. **Use HTTPS** - Always use encrypted connections in production
4. **Regular updates** - Keep dependencies and frameworks up to date
5. **Database backups** - Implement regular backup strategies

## Deployment

### Backend Deployment

1. **Build the application:**
   ```bash
   dotnet build --configuration Release
   ```

2. **Publish the application:**
   ```bash
   dotnet publish --configuration Release --output ./publish
   ```

3. **Deploy to hosting platform:**
   - Azure App Service
   - AWS Elastic Beanstalk
   - Docker containers
   - IIS (Windows Server)
   - Linux with Nginx/Apache reverse proxy

4. **Environment Configuration:**
   - Update connection strings for production database
   - Configure appropriate CORS origins
   - Set up SSL/TLS certificates
   - Configure logging and monitoring

### Frontend Deployment

1. **Update API endpoint** in `app.js`:
   ```javascript
   const API_BASE_URL = "https://your-api-domain.com/api";
   ```

2. **Deploy static files** to:
   - Azure Static Web Apps
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Traditional web hosting

3. **Production Checklist:**
   - Minify JavaScript and CSS
   - Optimize images
   - Enable caching headers
   - Configure CDN if necessary

## Performance Considerations

### Backend Optimization
- Entity Framework query optimization with `.Include()` for related entities
- Database indexing on frequently queried columns
- Implement caching strategies for frequently accessed data
- Connection pooling for database connections

### Frontend Optimization
- Lazy loading for images and components
- Efficient DOM manipulation
- Debouncing for search and filter operations
- Local storage for user preferences

## Dependencies

### Backend (.NET 8.0)
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" />
<PackageReference Include="Swashbuckle.AspNetCore" />
```

### Frontend
- Bootstrap 5.3.2 (CSS framework)
- Font Awesome 6.4.0 (Icons)
- Vanilla JavaScript (No external dependencies)

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

### Development Standards
- Follow C# coding conventions
- Write meaningful commit messages
- Add appropriate comments for complex logic
- Test thoroughly before submitting PR

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Support

For issues, questions, or contributions:
- Open an issue in the repository
- Review existing documentation
- Check Swagger API documentation at `/swagger`

---

**Note:** This is a production-ready admin dashboard system. Ensure proper security measures are implemented before deploying to production environments.
