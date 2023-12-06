namespace API.DTOs
{
    public class UserProfileDto
    {
        public string Email {get; set; }
        public string Name {get; set;}
        public int WordsDiscoveredCount {get; set;}
        public int FavoriteWordsCount {get; set;}
        public string LatestWord {get; set;}
        public string ProfilePicture {get; set;}
    }
}