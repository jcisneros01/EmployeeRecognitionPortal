using System;
using System.ComponentModel.DataAnnotations;


namespace EmployeeRecognitionPortal.Models.Request
{
    public class EmpOfYearPostRequest
    {

      public string EmployeeName {get; set;}

      public string EmployeeEmail {get; set;}

      public DateTime DateAwarded {get; set;}

      public User AwardCreator {get; set; }

      public string LaTexFile {get; set;}
    }
}
