using System;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Response
{
    public class EmpOfMonthResponse
    {
      public int Id { get; set; }

      public string EmployeeName {get; set;}

      public string EmployeeEmail {get; set;}

      public DateTime DateAwarded {get; set;}
      
      public int AwardCreatorId { get; set; }

      public string LaTexFile { get; set; }
    }
}
