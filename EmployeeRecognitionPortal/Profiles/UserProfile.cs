using System;
using AutoMapper;
using EmployeeRecognitionPortal.Helpers;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;

namespace EmployeeRecognitionPortal.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserRequest, User>()
                .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => PasswordHelper.HashPassword(src.Password)));                
        }
    }
}