using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Profiles
{
    public class EmpOfMonthResponseProfile : Profile
    {
        public EmpOfMonthResponseProfile()
        {
            CreateMap<EmpOfMonth, EmpOfMonthResponse>();
        }
    }
}
