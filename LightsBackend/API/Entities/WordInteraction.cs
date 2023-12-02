namespace API.Entities
{
    public class WordInteraction
    {
        public int Id { get; set; }
        public int WordId { get; set; }
        public Word Word { get; set; }

        public string UserId { get; set; } 
        public User User { get; set; } 

        public bool Favourite { get; set; }
        public string[] Uses { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
}
}