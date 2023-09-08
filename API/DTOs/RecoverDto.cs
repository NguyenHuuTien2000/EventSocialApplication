using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RecoverDto
    {
        [Required]
        public string Token { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }


        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,10}$", ErrorMessage = "Password must contain at least 5-10 characters, 1 uppercase, 1 lowercase and 1 number")]
        public string Password { get; set; }
    }
}