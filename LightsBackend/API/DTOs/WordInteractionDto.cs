namespace API.DTOs
{
    public class WordInteractionDto
    {
        public int WordId { get; set; }
        public bool Favourite { get; set; }
        public string Usage { get; set; }
        public int UsageRating { get; set; }
    }
}