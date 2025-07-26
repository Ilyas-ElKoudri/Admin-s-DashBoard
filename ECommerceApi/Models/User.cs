using System;
using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty; // Changed from FullName to Name

        [Required, EmailAddress]
        public string? Email { get; set; }

        [Required, MaxLength(20)]
        public string? PasswordHash { get; set; }

        public string Role { get; set; } = "Customer";

        public bool IsBlocked { get; set; } = false; // permanently blocked
        public DateTime? BlockUntil { get; set; } // temporarily restricted

        // New field to match frontend expectations
        public string AvatarUrl { get; set; } = string.Empty;

        // Phone number field to match frontend expectations
        public string PhoneNumber { get; set; } = string.Empty;

        // 👇 NEW: List of products this user sells
        public ICollection<Product>? Products { get; set; }

        // Navigation properties
        public List<Order> Orders { get; set; } = new();
        public Cart? Cart { get; set; }

        public List<Message>? Messages { get; set; }
        public List<Message> SentMessages { get; set; } = new();
        public List<Message> ReceivedMessages { get; set; } = new();
    }
}