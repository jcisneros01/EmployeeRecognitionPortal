using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models
{
    public class User
    {
        //todo: add validation to make all email addresses unique 
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
          
        [Required]
        public DateTime DateCreated { get; set; }
        
        public string Name { get; set; }
        
        public byte[] Signature { get; set; }

        public bool IsAdmin { get; set; }
    }
}