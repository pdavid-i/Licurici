using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ThoughtsController(MyDbContext context) : BaseApiController
    {
        private readonly MyDbContext _context = context;

        [HttpGet("random")]
        public async Task<ActionResult<Thought>> Random()
        {
            var random = new Random();
            var thoughtCount = _context.Thoughts.Count();
            
            if (thoughtCount == 0)
                return NoContent();

            var randomThoughtId = random.Next(1, thoughtCount+1);
            var randomThot = await _context.Thoughts.FindAsync(randomThoughtId);

            return Ok(randomThot);
        }

        [HttpGet("thoughts")]
        public async Task<ActionResult<List<Thought>>> GetThots()
        {
            var thots = await _context.Thoughts.ToListAsync();
            return Ok(thots);
        }

        [Authorize]
        [HttpDelete("wipeout")]
        public async Task<ActionResult> Wipeout()
        {
            var thoughts = await _context.Thoughts.ToListAsync();

            if (!thoughts.Any())
            {
                return NotFound("No thoughts behind those eyes.");
            }

            _context.Thoughts.RemoveRange(thoughts);
            await _context.SaveChangesAsync();

            return Ok("All thots were removed.");
        }
    }
}