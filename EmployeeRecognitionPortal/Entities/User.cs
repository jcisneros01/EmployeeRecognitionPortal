using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        // create entity model for signature and store reference in this table
        // add endpoint to get user signatures ?
        [Required]
        public byte[] Signature { get; set; }
        
        [Required]
        public DateTime DateCreated { get; set; }

        public bool? IsDeleted { get; set; }
    }
}