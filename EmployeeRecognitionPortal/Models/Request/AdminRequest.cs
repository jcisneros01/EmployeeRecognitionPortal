using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Request
{
    public class AdminRequest
    {
        public string Email { get; set; }
        
        public string Password { get; set; }
    }
}