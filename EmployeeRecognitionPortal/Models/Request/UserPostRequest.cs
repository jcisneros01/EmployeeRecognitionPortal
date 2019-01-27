using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Request
{
    public class UserPostRequest
    {
        public string Email { get; set; }
        
        public string Password { get; set; }
        
        public string Name { get; set; }
        
        public byte[] Signature { get; set; }
    }
}