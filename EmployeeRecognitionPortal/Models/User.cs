using System;

namespace EmployeeRecognitionPortal.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
    }
}