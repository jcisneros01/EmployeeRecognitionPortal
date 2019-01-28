using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models
{
    public class AwardYear
    {
      [Required]
      public string EmployeeName {get; set;}

      [Required]
      public string EmployeeEmail {get; set;}

      [Required]
      public DateTime DateAwarded {get; set;}

      [Required]
      public User AwardCreator {get; set; }

      public string LaTexFile { get; set; }
    }
}
