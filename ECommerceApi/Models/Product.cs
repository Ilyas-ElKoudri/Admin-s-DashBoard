using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class Product
    {
        public int Id { get; set; }                 // Primary Key

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;  // Product Name, initialized to avoid null

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public decimal Price { get; set; }          // Price

        [Required]
        public int CategoryId { get; set; }         // Foreign Key

        public Category? Category { get; set; }      // Navigation property, nullable since it might not be loaded

        public int UserId { get; set; }
        public User? User { get; set; } // Seller

        // New fields to match frontend expectations
        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        [Range(0.0, 5.0)]
        public double Rating { get; set; } = 0.0;
    }
}