using API.Helpers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class WordsController(MyDbContext context) : BaseApiController
    {
        private readonly MyDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<List<Word>>> GetWords()
        {
            if (!_context.Words.Any()) 
                return NoContent();

            var words = await _context.Words.ToListAsync();
            return Ok(words);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Word>>> GetWord(int id)
        {
            var word = await _context.Words.FindAsync(id);

            return Ok(word);
        }

        [HttpGet("today")]
        public async Task<ActionResult<List<Word>>> GetWordOfTheDay()
        {
            var wordOfTheDayId = TimeHelper.CalculateTodaysWordId();
            var wordOfTheDay = await _context.Words.FindAsync(wordOfTheDayId);

            return Ok(wordOfTheDay);
        }

        [HttpGet("random")]
        public async Task<ActionResult<List<Word>>> GetRandomWord()
        {
            if (!_context.Words.Any()) 
                return NoContent();

            Random generator = new Random();
            var wordCount = await _context.Words.CountAsync();

            var wordId = generator.Next(1, wordCount+1);
            var word = await _context.Words.FindAsync(wordId);

            return Ok(word);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetCount()
        {
            var wordCount = await _context.Words.CountAsync();
            return Ok(wordCount);
        }

        [Authorize]
        [HttpDelete("wipeout")]
        public async Task<ActionResult> Wipeout()
        {
            var words = await _context.Words.ToListAsync();

            if (!words.Any())
            {
                return NotFound("No words were found.");
            }

            _context.Words.RemoveRange(words);
            await _context.SaveChangesAsync();

            return Ok("All words were removed.");
        }
    }
}