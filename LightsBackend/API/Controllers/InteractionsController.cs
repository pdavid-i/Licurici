using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class WordInteractionsController : ControllerBase
    {
    private readonly MyDbContext _context;
    private readonly UserManager<User> _userManager;

    public WordInteractionsController(MyDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> PostWordInteraction([FromBody] WordInteractionDto model)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        // Find existing interaction or create a new one
        var interaction = await _context.Interactions
                                        .FirstOrDefaultAsync(wi => wi.WordId == model.WordId && wi.UserId == user.Id);

        if (interaction == null)
        {
            // Create new interaction if it doesn't exist
            interaction = new WordInteraction
            {
                UserId = user.Id,
                WordId = model.WordId,
                Favourite = model.Favourite,
                Uses = model.Uses,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.Interactions.Add(interaction);
        }

        await _context.SaveChangesAsync();

        return Ok(interaction);
    }

    [HttpGet("mine")]
    public async Task<ActionResult<IEnumerable<WordItemDto>>> GetUserWordInteractions()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var userId = user.Id;

        var wordInteractions = await _context.Interactions
                                        .Where(wi => wi.UserId == userId)
                                        .Select(wi => new WordItemDto
                                        {
                                            Name = wi.Word.Name,
                                            Id = wi.Word.Id,
                                        })
                                        .ToListAsync();

        return Ok(wordInteractions);
    }

    [HttpPost("favorite/{wordId}")]
    public async Task<IActionResult> ToggleFavorite(int wordId)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var userId = user.Id;

        // Find existing interaction or create a new one
        var interaction = await _context.Interactions
                                        .FirstOrDefaultAsync(wi => wi.WordId == wordId && wi.UserId == userId);

        if (interaction == null)
        {
            // Create new interaction if it doesn't exist
            interaction = new WordInteraction
            {
                UserId = userId,
                WordId = wordId,
                Favourite = true, // Set as favorite since it's a new interaction
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.Interactions.Add(interaction);
        }
        else
        {
            // Toggle the existing favorite status
            interaction.Favourite = !interaction.Favourite;
            interaction.UpdatedAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();
        return Ok(interaction);
    }

    [HttpGet("favorite/{wordId}")]
    public async Task<IActionResult> IsFavorite(int wordId)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var userId = user.Id;

        var interaction = await _context.Interactions
                                        .FirstOrDefaultAsync(wi => wi.WordId == wordId && wi.UserId == userId);

        if (interaction == null)
            return NotFound("User does not have this word yet.");

        return Ok(interaction.Favourite);
    }

    [HttpGet("favorites")]
    public async Task<IActionResult> GetFavorites()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var userId = user.Id;

        var wordInteractions = await _context.Interactions
                                        .Where(wi => wi.UserId == userId)
                                        .Where(wi => wi.Favourite == true)
                                        .Select(wi => new WordItemDto
                                        {
                                            Name = wi.Word.Name,
                                            Id = wi.Word.Id,
                                        })
                                        .ToListAsync();

        return Ok(wordInteractions);
    }

    [HttpDelete("deleteAll")]
    public async Task<IActionResult> DeleteAllUserInteractions()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        var userId = user.Id;

        // Find all interactions for the user
        var interactions = await _context.Interactions
                                         .Where(wi => wi.UserId == userId)
                                         .ToListAsync();

        if (!interactions.Any())
        {
            return NotFound("No interactions found for the user.");
        }

        // Remove all interactions
        _context.Interactions.RemoveRange(interactions);
        await _context.SaveChangesAsync();

        return Ok("All interactions deleted successfully.");
    }
}

}