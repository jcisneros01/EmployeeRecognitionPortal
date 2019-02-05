using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;

namespace EmployeeRecognitionPortal.Profiles
{
    public class EmpOfYearProfile : Profile
    {
        public EmpOfYearProfile()
        {
            CreateMap<EmpOfYearRequest, EmpOfYear>();
        }
    }
}
