using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ResetPasswordDto
    {
        public string Password { get; set; }
        public string Token { get; set; }
    }
}