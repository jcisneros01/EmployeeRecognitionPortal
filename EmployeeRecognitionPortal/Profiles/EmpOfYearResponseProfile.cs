using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Profiles
{
    public class EmpOfYearResponseProfile : Profile
    {
        public EmpOfYearResponseProfile()
        {
            CreateMap<EmpOfYear, EmpOfYearResponse>();
        }
    }
}
