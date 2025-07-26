using ECommerceApi.Models;
using System.Security.Cryptography;
using System.Text;

namespace ECommerceApi.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            // Ensure database is created
            context.Database.EnsureCreated();

            // Initialize Admin
            if (!context.Admins.Any())
            {
                var admin = new Admin
                {
                    Name = "Admin User",
                    Email = "admin@dashboard.com",
                    Phone = "+212 600000000",
                    AvatarUrl = "https://img.freepik.com/premium-vector/avatar-icon002_750950-50.jpg",
                    Password = HashPassword("admin123"),
                    DarkModeAuto = false,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                context.Admins.Add(admin);
                context.SaveChanges();
            }

            // Initialize Categories
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category { Name = "Fashion" },
                    new Category { Name = "Health & Beauty" },
                    new Category { Name = "Food & Drinks" },
                    new Category { Name = "Technology" }
                };

                context.Categories.AddRange(categories);
                context.SaveChanges();
            }

            // Initialize Users
            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User { 
                        Name = "Ilyas Kodri", 
                        Email = "ilyas.kodri@example.com", 
                        PhoneNumber = "+212 600000001",
                        AvatarUrl = "https://img.freepik.com/premium-vector/avatar-icon002_750950-50.jpg"
                    },
                    new User { 
                        Name = "Siham Beqali", 
                        Email = "siham.beqali@example.com", 
                        PhoneNumber = "+212 600000002",
                        AvatarUrl = "https://img.freepik.com/premium-vector/avatar-icon002_750950-50.jpg"
                    },
                    new User { 
                        Name = "Oussama Zerhouni", 
                        Email = "oussama.zerhouni@example.com", 
                        PhoneNumber = "+212 600000003",
                        AvatarUrl = "https://img.freepik.com/premium-vector/avatar-icon002_750950-50.jpg"
                    },
                    new User { 
                        Name = "Nawal Laamri", 
                        Email = "nawal.laamri@example.com", 
                        PhoneNumber = "+212 600000004",
                        AvatarUrl = "https://img.freepik.com/premium-vector/avatar-icon002_750950-50.jpg"
                    }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }

            // Initialize Products
            if (!context.Products.Any())
            {
                var categories = context.Categories.ToList();
                var users = context.Users.ToList();

                var products = new List<Product>();

                // Fashion products
                products.AddRange(new List<Product>
                {
                    new Product { Name = "Classic White T-Shirt", ImageUrl = "https://img.freepik.com/free-photo/white-t-shirt_93675-1300.jpg", CategoryId = categories[0].Id, UserId = users[0].Id, Description = "Comfortable cotton t-shirt perfect for everyday wear", Price = 25.99M, Rating = 4.5 },
                    new Product { Name = "Denim Jeans", ImageUrl = "https://img.freepik.com/free-photo/jeans_93675-1300.jpg", CategoryId = categories[0].Id, UserId = users[1].Id, Description = "High-quality denim jeans with perfect fit", Price = 89.99M, Rating = 4.8 },
                    new Product { Name = "Leather Jacket", ImageUrl = "https://img.freepik.com/free-photo/leather-jacket_93675-1300.jpg", CategoryId = categories[0].Id, UserId = users[2].Id, Description = "Stylish leather jacket for a bold look", Price = 199.99M, Rating = 4.7 },
                    new Product { Name = "Running Shoes", ImageUrl = "https://img.freepik.com/free-photo/running-shoes_93675-1300.jpg", CategoryId = categories[0].Id, UserId = users[3].Id, Description = "Comfortable running shoes for athletes", Price = 129.99M, Rating = 4.6 },
                    new Product { Name = "Summer Dress", ImageUrl = "https://img.freepik.com/free-photo/summer-dress_93675-1300.jpg", CategoryId = categories[0].Id, UserId = users[0].Id, Description = "Elegant summer dress for special occasions", Price = 79.99M, Rating = 4.4 }
                });

                // Health & Beauty products
                products.AddRange(new List<Product>
                {
                    new Product { Name = "Organic Face Cream", ImageUrl = "https://img.freepik.com/free-photo/face-cream_93675-1300.jpg", CategoryId = categories[1].Id, UserId = users[1].Id, Description = "Natural face cream for healthy skin", Price = 34.99M, Rating = 4.3 },
                    new Product { Name = "Vitamin C Serum", ImageUrl = "https://img.freepik.com/free-photo/vitamin-c-serum_93675-1300.jpg", CategoryId = categories[1].Id, UserId = users[2].Id, Description = "Brightening vitamin C serum", Price = 49.99M, Rating = 4.7 },
                    new Product { Name = "Hair Dryer", ImageUrl = "https://img.freepik.com/free-photo/hair-dryer_93675-1300.jpg", CategoryId = categories[1].Id, UserId = users[3].Id, Description = "Professional hair dryer with multiple settings", Price = 89.99M, Rating = 4.5 },
                    new Product { Name = "Electric Toothbrush", ImageUrl = "https://img.freepik.com/free-photo/electric-toothbrush_93675-1300.jpg", CategoryId = categories[1].Id, UserId = users[0].Id, Description = "Advanced electric toothbrush for oral health", Price = 129.99M, Rating = 4.8 },
                    new Product { Name = "Yoga Mat", ImageUrl = "https://img.freepik.com/free-photo/yoga-mat_93675-1300.jpg", CategoryId = categories[1].Id, UserId = users[1].Id, Description = "Premium yoga mat for home workouts", Price = 39.99M, Rating = 4.6 }
                });

                // Food & Drinks products
                products.AddRange(new List<Product>
                {
                    new Product { Name = "Organic Coffee Beans", ImageUrl = "https://img.freepik.com/free-photo/coffee-beans_93675-1300.jpg", CategoryId = categories[2].Id, UserId = users[2].Id, Description = "Premium organic coffee beans", Price = 24.99M, Rating = 4.9 },
                    new Product { Name = "Green Tea", ImageUrl = "https://img.freepik.com/free-photo/green-tea_93675-1300.jpg", CategoryId = categories[2].Id, UserId = users[3].Id, Description = "Antioxidant-rich green tea", Price = 19.99M, Rating = 4.4 },
                    new Product { Name = "Protein Powder", ImageUrl = "https://img.freepik.com/free-photo/protein-powder_93675-1300.jpg", CategoryId = categories[2].Id, UserId = users[0].Id, Description = "High-quality protein powder for fitness", Price = 59.99M, Rating = 4.6 },
                    new Product { Name = "Dark Chocolate", ImageUrl = "https://img.freepik.com/free-photo/dark-chocolate_93675-1300.jpg", CategoryId = categories[2].Id, UserId = users[1].Id, Description = "Premium dark chocolate with 70% cocoa", Price = 14.99M, Rating = 4.7 },
                    new Product { Name = "Olive Oil", ImageUrl = "https://img.freepik.com/free-photo/olive-oil_93675-1300.jpg", CategoryId = categories[2].Id, UserId = users[2].Id, Description = "Extra virgin olive oil for cooking", Price = 29.99M, Rating = 4.5 }
                });

                // Technology products
                products.AddRange(new List<Product>
                {
                    new Product { Name = "Wireless Headphones", ImageUrl = "https://img.freepik.com/free-photo/wireless-headphones_93675-1300.jpg", CategoryId = categories[3].Id, UserId = users[3].Id, Description = "High-quality wireless headphones", Price = 199.99M, Rating = 4.8 },
                    new Product { Name = "Smartphone", ImageUrl = "https://img.freepik.com/free-photo/smartphone_93675-1300.jpg", CategoryId = categories[3].Id, UserId = users[0].Id, Description = "Latest smartphone with advanced features", Price = 899.99M, Rating = 4.9 },
                    new Product { Name = "Laptop", ImageUrl = "https://img.freepik.com/free-photo/laptop_93675-1300.jpg", CategoryId = categories[3].Id, UserId = users[1].Id, Description = "Powerful laptop for work and gaming", Price = 1299.99M, Rating = 4.7 },
                    new Product { Name = "Smart Watch", ImageUrl = "https://img.freepik.com/free-photo/smart-watch_93675-1300.jpg", CategoryId = categories[3].Id, UserId = users[2].Id, Description = "Feature-rich smartwatch for fitness tracking", Price = 299.99M, Rating = 4.6 },
                    new Product { Name = "Wireless Charger", ImageUrl = "https://img.freepik.com/free-photo/wireless-charger_93675-1300.jpg", CategoryId = categories[3].Id, UserId = users[3].Id, Description = "Fast wireless charging pad", Price = 49.99M, Rating = 4.4 }
                });

                context.Products.AddRange(products);
                context.SaveChanges();
            }

            // Initialize Orders
            if (!context.Orders.Any())
            {
                var users = context.Users.ToList();
                var products = context.Products.ToList();
                
                // Create sample orders with different statuses
                var orders = new List<Order>();
                
                // 8 Confirmed orders
                for (int i = 0; i < 8; i++)
                {
                    orders.Add(new Order
                    {
                        UserId = users[i % users.Count].Id,
                        Status = "Confirmed",
                        OrderDate = DateTime.UtcNow.AddDays(-(i + 1))
                    });
                }
                
                // 4 Delivered orders
                for (int i = 0; i < 4; i++)
                {
                    orders.Add(new Order
                    {
                        UserId = users[i % users.Count].Id,
                        Status = "Delivered",
                        OrderDate = DateTime.UtcNow.AddDays(-(i + 5))
                    });
                }
                
                // 4 Not Confirmed orders
                for (int i = 0; i < 4; i++)
                {
                    orders.Add(new Order
                    {
                        UserId = users[i % users.Count].Id,
                        Status = "Not Confirmed",
                        OrderDate = DateTime.UtcNow.AddDays(-(i + 10))
                    });
                }

                context.Orders.AddRange(orders);
                context.SaveChanges();
            }
        }

        private static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }
} 