using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Profiles
{
    public class UserResponseProfile : Profile
    {
        public UserResponseProfile()
        {
            CreateMap<User, UserResponse>();
        }
    }
}