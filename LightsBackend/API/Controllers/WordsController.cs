using API.Helpers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WordsController : ControllerBase
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

        [HttpGet("/today")]
        public async Task<ActionResult<List<Word>>> GetWordOfTheDay()
        {
            var wordOfTheDayId = TimeHelper.CalculateTodaysWordId();
            var wordOfTheDay = await _context.Words.FindAsync(wordOfTheDayId);

            return Ok(wordOfTheDay);
        }
    }
}