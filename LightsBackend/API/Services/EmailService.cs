using System.Text;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.Helpers
{
    public class EmailService
    {
        private readonly string _apiKey;

        public EmailService(IConfiguration configuration)
        {
            _apiKey = configuration["SendGrid:APIKey"];
        }

        public async Task SendEmailAsync(string toEmail, string subject, string message, string htmlContent)
        {
            var client = new SendGridClient(_apiKey);
            var from = new EmailAddress("itsdavedabrave@gmail.com", "Logos");
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, message, htmlContent);
            await client.SendEmailAsync(msg);
        }

        public async Task SendEmailResetPasswordAsync(string toEmail, string token)
        {   
            var subject = "Resetare Parola";
            StringBuilder body = new StringBuilder();
            StringBuilder htmlBody = new StringBuilder();

            body.AppendLine("Salut! Ai primit acest link pentru ca cineva a initiat resetarea parolei pentru contul tau din aplicatia Logos.");
            body.AppendLine("Acceseaza urmatorul link pentru resetarea parolei:");
            body.AppendLine("Click aici");

            htmlBody.AppendLine("<p>Saluti! Ai primit acest link pentru ca cineva a initiat resetarea parolei pentru contul tau din aplicatia Logos.</p>");
            htmlBody.AppendLine("<p>Acceseaza urmatorul link pentru resetarea parolei: </p>");
            htmlBody.AppendLine($"<a href='http://localhost:3000/reset-password/{token}'>Click aici</a> ");

            await SendEmailAsync(toEmail, subject, body.ToString(), htmlBody.ToString());
        }   
    }
}