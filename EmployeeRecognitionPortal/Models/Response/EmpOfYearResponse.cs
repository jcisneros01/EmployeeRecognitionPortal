using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Response
{
    public class EmpOfYearResponse
    {
      public int Id { get; set; }

      public string EmployeeName {get; set;}

      public string EmployeeEmail {get; set;}

      public DateTime DateAwarded {get; set;}

      public User AwardCreator {get; set; }

      public string LaTexFile { get; set; }
    }
}
