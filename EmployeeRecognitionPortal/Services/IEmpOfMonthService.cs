
using System.Collections.Generic;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public interface IEmpOfMonthService
    {
      EmpOfMonthResponse CreateEmpOfMonth(EmpOfMonthRequest eom);
      List <EmpOfMonthResponse> GetEmpOfMonths();
      EmpOfMonthResponse GetEmpOfMonth(int id);
      void DeleteEmpOfMonth(int id);
    }
}
