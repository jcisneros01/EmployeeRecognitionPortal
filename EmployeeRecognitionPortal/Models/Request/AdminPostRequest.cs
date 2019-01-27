using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Request
{
    public class AdminPostRequest
    {
        public string Email { get; set; }
        
        public string Password { get; set; }
    }
}