
using System.Collections.Generic;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public interface IEmpOfYearService
    {
      EmpOfYearResponse CreateEmpOfYear(EmpOfYearRequest eom);
      List <EmpOfYearResponse> GetEmpOfYears(int userId);
      EmpOfYearResponse GetEmpOfYear(int id);
      void DeleteEmpOfYear(int id);
    }
}
