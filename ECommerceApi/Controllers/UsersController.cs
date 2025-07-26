using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ECommerceApi.Data;
using ECommerceApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        // ✅ Returns all users in frontend-expected format
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    name = u.Name,
                    imageUrl = u.AvatarUrl,
                    email = u.Email,
                    phoneNumber = u.PhoneNumber
                })
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/Users/5
        // ✅ Returns a single user by ID, including all related data
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Products)
                .Include(u => u.Orders)
                .Include(u => u.Messages)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound();

            return user;
        }

        // PUT: api/Users/5
        // ✅ Updates a user's details
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User updatedUser)
        {
            if (id != updatedUser.Id)
                return BadRequest("User ID mismatch.");

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            // Only update editable fields
            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.Role = updatedUser.Role;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Users
        // ✅ Creates a new user
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        // ✅ Deletes a user
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/Users/5/block
        // ✅ Blocks a user permanently or temporarily for given days
        [HttpPut("{id}/block")]
        public async Task<IActionResult> BlockUser(int id, [FromQuery] int? days)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            if (days == null)
            {
                user.IsBlocked = true; // permanently blocked
                user.BlockUntil = null;
            }
            else
            {
                user.IsBlocked = false;
                user.BlockUntil = DateTime.UtcNow.AddDays(days.Value);
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = days == null
                    ? $"User {user.Name} has been permanently blocked."
                    : $"User {user.Name} has been restricted from selling until {user.BlockUntil}."
            });
        }

        // POST: api/Users/5/message
        // ✅ Admin sends message to a user
        [HttpPost("{id}/message")]
        public async Task<IActionResult> SendMessageToUser(int id, [FromBody] string content)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            var message = new Message
            {
                Content = content,
                ReceiverId = id,       // 🛠️ Receiver is the target user
                SenderId = 0,          // 🛠️ Assuming SenderId = 0 means Admin; adjust if using a separate admin entity
                FromAdmin = true,
                SentAt = DateTime.UtcNow
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Message sent to {user.Name}" });
        }

        private bool UserExists(int id) => _context.Users.Any(e => e.Id == id);
    }
}


