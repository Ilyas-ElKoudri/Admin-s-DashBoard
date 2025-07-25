using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        // This tells EF Core: “A Category has many Products.”
        public List<Product> Products { get; set; } = new(); // One-to-many relationship
    }
}
