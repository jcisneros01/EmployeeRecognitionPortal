using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Profiles
{
    public class AdminResponseProfile : Profile
    {
        public AdminResponseProfile()
        {
            CreateMap<User, AdminResponse>();
        }
    }
}