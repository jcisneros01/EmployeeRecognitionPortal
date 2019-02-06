using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Profiles
{
    public class UserResponseProfile : Profile
    {
        public UserResponseProfile()
        {
            CreateMap<User, UserResponse>()
                .ForPath(dest => dest.Name, opt => opt.MapFrom(src => src.AwardCreator.Name))
                .ForPath(dest => dest.Signature, opt => opt.MapFrom(src => src.AwardCreator.Signature));
        }
    }
}