using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Request
{
    public class EmpOfYearRequest
    {
      [Required]
      public string EmployeeName {get; set;}

      [Required]
      public string EmployeeEmail {get; set;}

      [Required]
      public DateTime DateAwarded {get; set;}

      [Required]
      public int AwardCreatorId {get; set; }
    }
}
