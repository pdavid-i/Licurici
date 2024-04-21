namespace API.Entities
{
    public class SentenceInteraction
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int IncompleteSentenceId { get; set; }
        public DateTime GuessDate { get; set; }
        public DateTime? HintUsedDate { get; set; }
        public User User { get; set; }
        public IncompleteSentence WordGuess { get; set; }
    }
}
