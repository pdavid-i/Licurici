namespace API.Helpers
{
    public class TimeHelper
    {
        public static int CalculateTodaysWordId()
        {
            var startDate = new DateTime(2023, 11, 24); // Starting date: 11 November 2023
            var todayDate = DateTime.Today; // Today's date

            var daysDifference = (todayDate - startDate).Days;
            return daysDifference + 1; // Adding 1 because 11 November 2023 is word 1
        }
    }
}