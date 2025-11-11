namespace ECommerceApi.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public string Status { get; set; } = "Pending"; // Pending, Confirmed, Delivered
        public int UserId { get; set; }
        public User? User { get; set; }

        public List<Product>? Products { get; set; }
    }
}
