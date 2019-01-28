using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models
{
    public class Admin
    {
        [Key]
        public int Id { get; set; }
           
        [Required]
        public string Email { get; set; }
           
        [Required]
        public string Password { get; set; }
               
        [Required]
        public DateTime DateCreated { get; set; }
        
        //todo: change userservice to soft delete
        public bool? IsDeleted { get; set; }
    }
}