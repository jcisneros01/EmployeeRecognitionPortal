using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Response
{
    public class AdminResponse
    {
        public int Id { get; set; }
        
        public string Email { get; set; }
        
        public string Password { get; set; }
    }
}