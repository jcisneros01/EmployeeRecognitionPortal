using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Response
{
    public class UserResponse
    {
        public int Id { get; set; }
        
        public string Email { get; set; }
        
        public string Password { get; set; }
        
        public string Name { get; set; }
        
        public byte[] Signature { get; set; }
    }
}