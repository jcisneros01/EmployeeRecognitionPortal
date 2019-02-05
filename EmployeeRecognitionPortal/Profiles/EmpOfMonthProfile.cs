using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;

namespace EmployeeRecognitionPortal.Profiles
{
    public class EmpOfMonthProfile : Profile
    {
        public EmpOfMonthProfile()
        {
            CreateMap<EmpOfMonthRequest, EmpOfMonth>();
        }
    }
}
