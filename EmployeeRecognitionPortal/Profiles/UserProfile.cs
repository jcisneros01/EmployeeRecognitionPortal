using System;
using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;

namespace EmployeeRecognitionPortal.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserRequest, User>()
                .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => DateTime.Now));
        }
    }
}