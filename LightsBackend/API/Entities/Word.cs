namespace API.Entities
{
    public class Word
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string[] Definitions { get; set; }
        public string[] Examples { get; set; }
    }
}