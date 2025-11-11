using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class Admin
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [StringLength(20)]
        public string Phone { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? AvatarUrl { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Password { get; set; } = string.Empty;
        
        public bool DarkModeAuto { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
} 