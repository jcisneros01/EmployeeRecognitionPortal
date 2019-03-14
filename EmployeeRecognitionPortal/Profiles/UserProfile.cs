using System;
using AutoMapper;
using EmployeeRecognitionPortal.Helpers;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserRequest, User>()
                .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => DateTime.Now))
                .ForPath(dest => dest.AwardCreator.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsAdmin, opt => opt.MapFrom(src => false))
                .ForPath(dest => dest.AwardCreator.Signature, opt => opt.MapFrom(src => src.Signature))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => PasswordHelper.PasswordEncryptDecrypt(src.Password)));

            CreateMap<AdminRequest, User>()
                .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.IsAdmin, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => PasswordHelper.PasswordEncryptDecrypt(src.Password)));
        }
    }
}