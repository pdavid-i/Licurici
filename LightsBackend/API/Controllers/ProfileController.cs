using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        private readonly MyDbContext _context;
        private readonly UserManager<User> _userManager;

        public ProfileController(UserManager<User> userManager, MyDbContext dbContext)
        {
            _userManager = userManager;
            _context = dbContext;
        }

        [Authorize]
        [HttpGet("current-profile")]
        public async Task<ActionResult<UserProfileDto>> GetCurrentUserProfileInfo()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var wordsDiscovered = await _context.Interactions
                                        .Where(wi => wi.UserId == user.Id)
                                        .OrderByDescending(wi => wi.CreatedAt)
                                        .Select(wi => new 
                                        { 
                                            wi.Word.Name,
                                            wi.Favourite
                                        })
                                        .ToListAsync();

            if (wordsDiscovered.Count == 0) {
                return NotFound(); // 404
            }

            var FavoriteWordsCount = wordsDiscovered.Count(w => w.Favourite);
            var LatestWord = wordsDiscovered.FirstOrDefault().Name;                

            return new UserProfileDto
            {
                Email = user.Email,
                Name = User.Identity.Name,
                ProfilePicture = user.ProfilePicture,
                WordsDiscoveredCount = wordsDiscovered.Count,
                FavoriteWordsCount = FavoriteWordsCount,
                LatestWord = LatestWord
            };
        }
    }
}