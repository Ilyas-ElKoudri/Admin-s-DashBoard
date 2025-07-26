using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceApi.Data;
using ECommerceApi.Models;
using System.Security.Cryptography;
using System.Text;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/profile
        [HttpGet("profile")]
        public async Task<ActionResult<object>> GetAdminProfile()
        {
            var admin = await _context.Admins.FirstOrDefaultAsync();
            
            if (admin == null)
            {
                return NotFound("Admin profile not found");
            }

            return new
            {
                name = admin.Name,
                email = admin.Email,
                phone = admin.Phone,
                avatarUrl = admin.AvatarUrl,
                darkModeAuto = admin.DarkModeAuto
            };
        }

        // PUT: api/admin/profile
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateAdminProfile([FromBody] AdminProfileUpdateDto updateDto)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync();
            
            if (admin == null)
            {
                return NotFound("Admin profile not found");
            }

            // Validate current password if password change is requested
            if (!string.IsNullOrEmpty(updateDto.NewPassword))
            {
                if (string.IsNullOrEmpty(updateDto.CurrentPassword))
                {
                    return BadRequest("Current password is required to change password");
                }

                var hashedCurrentPassword = HashPassword(updateDto.CurrentPassword);
                if (admin.Password != hashedCurrentPassword)
                {
                    return BadRequest("Current password is incorrect");
                }

                if (updateDto.NewPassword.Length < 6)
                {
                    return BadRequest("New password must be at least 6 characters long");
                }

                admin.Password = HashPassword(updateDto.NewPassword);
            }

            // Update profile information
            admin.Name = updateDto.Name ?? admin.Name;
            admin.Email = updateDto.Email ?? admin.Email;
            admin.Phone = updateDto.Phone ?? admin.Phone;
            admin.AvatarUrl = updateDto.AvatarUrl ?? admin.AvatarUrl;
            admin.DarkModeAuto = updateDto.DarkModeAuto ?? admin.DarkModeAuto;
            admin.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Profile updated successfully" });
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error updating profile");
            }
        }

        // POST: api/admin/login
        [HttpPost("login")]
        public async Task<ActionResult<object>> Login([FromBody] AdminLoginDto loginDto)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync();
            
            if (admin == null)
            {
                return NotFound("Admin profile not found");
            }

            var hashedPassword = HashPassword(loginDto.Password);
            
            if (admin.Password != hashedPassword)
            {
                return Unauthorized("Invalid credentials");
            }

            return new
            {
                message = "Login successful",
                admin = new
                {
                    name = admin.Name,
                    email = admin.Email,
                    phone = admin.Phone,
                    avatarUrl = admin.AvatarUrl,
                    darkModeAuto = admin.DarkModeAuto
                }
            };
        }

        // POST: api/admin/change-password
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync();
            
            if (admin == null)
            {
                return NotFound("Admin profile not found");
            }

            var hashedCurrentPassword = HashPassword(changePasswordDto.CurrentPassword);
            
            if (admin.Password != hashedCurrentPassword)
            {
                return BadRequest("Current password is incorrect");
            }

            if (changePasswordDto.NewPassword.Length < 6)
            {
                return BadRequest("New password must be at least 6 characters long");
            }

            admin.Password = HashPassword(changePasswordDto.NewPassword);
            admin.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Password changed successfully" });
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error changing password");
            }
        }

        // PUT: api/admin/settings
        [HttpPut("settings")]
        public async Task<IActionResult> UpdateSettings([FromBody] AdminSettingsDto settingsDto)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync();
            
            if (admin == null)
            {
                return NotFound("Admin profile not found");
            }

            admin.DarkModeAuto = settingsDto.DarkModeAuto;
            admin.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Settings updated successfully" });
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error updating settings");
            }
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }
    }

    // DTOs for API requests
    public class AdminProfileUpdateDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? AvatarUrl { get; set; }
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
        public bool? DarkModeAuto { get; set; }
    }

    public class AdminLoginDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }

    public class AdminSettingsDto
    {
        public bool DarkModeAuto { get; set; }
    }
} 