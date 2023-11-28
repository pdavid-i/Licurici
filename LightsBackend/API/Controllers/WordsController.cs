using API.Helpers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class WordsController : BaseApiController
    {
        private readonly MyDbContext _context;
        public WordsController(MyDbContext context)
        {
            this._context = context;
        }   

        [HttpGet]
        public async Task<ActionResult<List<Word>>> GetWords()
        {
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
            Random generator = new Random();
            var wordCount = await _context.Words.CountAsync();
            var wordId = generator.Next(1, wordCount);
            var word = await _context.Words.FindAsync(wordId);

            return Ok(word);
        }
    }
}