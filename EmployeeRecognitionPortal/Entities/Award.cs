using System;
using System.Text;
using System.ComponentModel.DataAnnotations;

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
      public User AwardCreator {get; set; }

      public string LaTexFile { get; set; }

      //Initialize LaTexFile
      public abstract void CreateLaTex();

    }
}
