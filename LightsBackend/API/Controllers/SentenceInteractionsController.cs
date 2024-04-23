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
    public class SentenceInteractionsController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly UserManager<User> _userManager;

        public SentenceInteractionsController(MyDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("interaction")]
        public async Task<IActionResult> PostSentenceInteraction([FromBody] SentenceInteractionDto model)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            // Find existing interaction or create a new one
            var interaction = await _context.SentenceInteractions
                                            .FirstOrDefaultAsync(si => si.IncompleteSentenceId == model.SentenceId && si.UserId == user.Id);

            if (interaction == null)
            {
                interaction = new SentenceInteraction
                {
                    UserId = user.Id,
                    IncompleteSentenceId = model.SentenceId,
                    GuessDate = DateTime.UtcNow,
                    HintUsedDate = model.hintUsed ? DateTime.UtcNow : null
                };
                _context.SentenceInteractions.Add(interaction);
            }
            else
            {
                interaction.GuessDate = DateTime.UtcNow;
                interaction.HintUsedDate = model.hintUsed ? DateTime.UtcNow : null;
            }

            await _context.SaveChangesAsync();

            return Ok(interaction);
        }

        [HttpGet("countSolvedy")]
        public async Task<IActionResult> GetSolvedCount()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var count = await _context.SentenceInteractions
                                                     .Where(si => si.UserId == user.Id)
                                                     .CountAsync();

            return Ok(count);
        }

        [HttpGet("random")]
        public async Task<IActionResult> GetRandomSentence()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var completedSentenceIds = await _context.SentenceInteractions
                                                     .Where(si => si.UserId == user.Id)
                                                     .Select(si => si.IncompleteSentenceId)
                                                     .ToListAsync();

            var unsolvedSentences = _context.IncompleteSentences
                                .Where(s => !completedSentenceIds.Contains(s.Id));

            // We first try to get a random sentence that the user has not solved yet
            var randomSentence = await unsolvedSentences.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync();

            if (randomSentence == null)
            {
                // If there are no more unsolved sentences, we return a random sentence
                randomSentence = await _context.IncompleteSentences.OrderBy(r => Guid.NewGuid()).FirstOrDefaultAsync();
            }

            return Ok(randomSentence);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllSentences()
        {
            if (!_context.IncompleteSentences.Any())
            {
                return NoContent();
            }

            return Ok(await _context.IncompleteSentences.ToListAsync());
        }
    }
}