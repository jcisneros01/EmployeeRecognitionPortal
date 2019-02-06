using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Services;
using Microsoft.EntityFrameworkCore;
using NSubstitute;
using NUnit.Framework;

namespace EmployeeRecognitionPortalTests
{
    public class UserServiceTests
    {
        private  IUserService _userService;
        private  Context _context;
        private  IMapper _mapper;
        
        [SetUp]  
        public void Setup()
        {
            var users = new List<User>
            {
                new User
                {
                    Id = 1,
                    Email = "usr1@em.com",
                    Password = "pass",
                    DateCreated = DateTime.Now,
                    IsAdmin = false,
                    AwardCreator = new AwardCreator
                    {
                        Name = "testuser",
                        Signature = null,
                        UserId = 1
                    } 
                 },   
                 
                new User
                {
                    Id = 2,
                    Email = "admin1@em.com",
                    Password = "pass",
                    DateCreated = DateTime.Now,
                    IsAdmin = true,
                    AwardCreator = null
                }
            };

            var userData = Substitute
                .For<DbSet<User>, IQueryable<User>>();
            
            _mapper = Substitute.For<IMapper>();
            _userService = new UserService(_context, _mapper);
        }  
  
        [Test]  
        public void Test1()  
        {  
            Assert.Pass();  
        }  
    }
}