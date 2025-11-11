using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceApi.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;

        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        public bool FromAdmin { get; set; } = true;

        public int? SenderId { get; set; }

        [ForeignKey("SenderId")]
        public User? Sender { get; set; }

        // 👇 Receiver of the message (required)
        public int ReceiverId { get; set; }

        [ForeignKey("ReceiverId")]
        public User? Receiver { get; set; }
    }
}
