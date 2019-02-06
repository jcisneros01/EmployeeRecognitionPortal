using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models
{
    public class AwardCreator
    {
        [Key]
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public byte[] Signature { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }
    }
}