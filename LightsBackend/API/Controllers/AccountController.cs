using System.Web;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly EmailService _emailService;
        private readonly MyDbContext _context;


        public AccountController(UserManager<User> userManager, TokenService tokenService, EmailService emailService, MyDbContext dbContext)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _emailService = emailService;
            _context = dbContext;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();
            
            return new UserDto 
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User{UserName = registerDto.UserName, Email = registerDto.Email};

            var result = await _userManager.CreateAsync(user, registerDto.Password);      

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)   
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("current-user")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return BadRequest("User not found.");

            // Check for existing, unexpired tokens
            var existingToken = await _context.Tokens
            .FirstOrDefaultAsync(t => t.Email == model.Email && t.CreationTime.AddHours(24) > DateTime.UtcNow);
            if (existingToken != null)
            {
                return BadRequest("Un email activ a fost deja trimis pentru aceasta adresa. Daca s-a pierdut, incearca mai tarziu.");
            }

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            string encodedToken = HttpUtility.UrlEncode(token);

               _context.Tokens.Add(new PasswordResetToken 
                { 
                    Email = model.Email, 
                    Token = token, 
                    CreationTime = DateTime.UtcNow
                });
            await _context.SaveChangesAsync();
            await _emailService.SendEmailResetPasswordAsync(model.Email, encodedToken);

            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto model)
        {
            var existingToken = await _context.Tokens
            .FirstOrDefaultAsync(t => t.Token == model.Token && t.CreationTime.AddHours(24) > DateTime.UtcNow);
            if (existingToken == null)
            {
                return BadRequest("Invalid or expired token");
            }

            var email = existingToken.Email;

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return BadRequest("User not found.");

            var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);
            if (!result.Succeeded) return BadRequest("Password reset failed.");

            var removeTokens = await _context.Tokens.Where(t => t.Email == email).ToListAsync();
            _context.Tokens.RemoveRange(removeTokens);
            await _context.SaveChangesAsync();
            return Ok("Password was reset succesfuly");
        }
    }
}