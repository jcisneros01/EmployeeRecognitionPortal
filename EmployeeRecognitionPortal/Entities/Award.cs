using System;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeRecognitionPortal.Models
{
    public abstract class Award
    {
      [Key]
      public int Id { get; set; }

      [Required]
      public string EmployeeName {get; set;}

      [Required]
      public string EmployeeEmail {get; set;}

      [Required]
      public DateTime DateAwarded {get; set;}
      
      [Required]
      public int AwardCreatorId { get; set; }
      
      [ForeignKey("AwardCreatorId")]
      public AwardCreator AwardCreator {get; set; }
      
      //todo: Convert base64 img to png for LaTex 
      public string LaTexFile { get; set; }

      //Initialize LaTexFile
      public abstract void CreateLaTex();

    }
}
