using System;
using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;

namespace EmployeeRecognitionPortal.Profiles
{
    public class AdminProfile : Profile
    {
        public AdminProfile()
        {
            CreateMap<AdminRequest, Admin>()
                .ForMember(dest => dest.DateCreated, opt => opt.MapFrom(src => DateTime.Now));
        }
    }
}