namespace API.DTOs
{
    public class WordInteractionDto
    {
        public int WordId { get; set; }
        public bool Favourite { get; set; }
        public string[] Uses { get; set; }

    }
}