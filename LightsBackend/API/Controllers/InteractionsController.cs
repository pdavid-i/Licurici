using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Azure.AI.OpenAI.Assistants;
using Azure;

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
                interaction = new WordInteraction
                {
                    UserId = user.Id,
                    WordId = model.WordId,
                    Favourite = model.Favourite,
                    Usage = model.Usage,
                    UsageRating = model.UsageRating,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Interactions.Add(interaction);
            }

            await _context.SaveChangesAsync();

            return Ok(interaction);
        }


        [HttpGet("mine/{wordId}")]
        public async Task<IActionResult> GetWordInteraction(int wordId)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            // Find existing interaction or create a new one
            var interaction = await _context.Interactions
                                            .Include(i => i.Word) // Eager load the Word entity
                                            .FirstOrDefaultAsync(wi => wi.WordId == wordId && wi.UserId == user.Id);

            if (interaction == null)
            {
                return NotFound("User did not find this word yet.");
            }

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

        [HttpGet("myCount")]
        public async Task<ActionResult<int>> GetNumberOfWordsDiscovered()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userId = user.Id;
            var nrWordsForUser = await _context.Interactions
                                            .Where(wi => wi.UserId == userId)
                                            .CountAsync();

            return Ok(nrWordsForUser);
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

        [HttpPost("checkUsage")]
        public async Task<WordUsageFeedbackDto> CheckUsageScore([FromBody] WordUsageDto model)
        {

            AssistantsClient client = new AssistantsClient("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");

            // Create a thread
            Response<AssistantThread> threadResponse = await client.CreateThreadAsync();
            AssistantThread thread = threadResponse.Value;

            // Create a message
            Response<ThreadMessage> messageResponse = await client.CreateMessageAsync(
            thread.Id,
            MessageRole.User,
            $"Word: {model.Word}, Context: {model.Context}");
            ThreadMessage message = messageResponse.Value;

            // Running the thread
            Response<ThreadRun> runResponse = await client.CreateRunAsync(
            thread.Id,
            new CreateRunOptions("asst_9GaD8Z80gXImi9cKPUdjhQxf") { });
            ThreadRun run = runResponse.Value;

            do
            {
                await Task.Delay(TimeSpan.FromMilliseconds(500));
                runResponse = await client.GetRunAsync(thread.Id, runResponse.Value.Id);
            }
            while (runResponse.Value.Status == RunStatus.Queued || runResponse.Value.Status == RunStatus.InProgress);

            Response<PageableList<ThreadMessage>> afterRunMessagesResponse
                = await client.GetMessagesAsync(thread.Id, 1);
            IReadOnlyList<ThreadMessage> messages = afterRunMessagesResponse.Value.Data;

            var feedbackResponse = new WordUsageFeedbackDto();

            // Only care about the latest message
            if (messages.Count > 0)
            {
                ThreadMessage latestMessage = messages[0]; // Get the most recent message

                if (latestMessage.ContentItems.Count > 0 && latestMessage.ContentItems[0] is MessageTextContent textItem)
                {
                    var feedback = textItem.Text.Split('/');
                    feedbackResponse.Rating = feedback[0][0] - '0'; // spoghetti int cast
                    feedbackResponse.Comments = feedback[1];
                    return feedbackResponse;
                }
            }
            feedbackResponse.Rating = -1;
            feedbackResponse.Comments = "N-a mers bine ceva pe server. Daca se repeta, incearca din nou mai tarziu, poate il repar pana atunci.";
            return feedbackResponse;
        }
    }
}