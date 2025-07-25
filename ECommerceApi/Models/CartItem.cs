﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceApi.Models
{
    public class CartItem
    {
        public int Id { get; set; }

        [Required]
        public int CartId { get; set; }

        [ForeignKey("CartId")]
        public Cart? Cart { get; set; }

        [Required]
        public int ProductId { get; set; }

        [ForeignKey("ProductId")]
        public Product? Product { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}