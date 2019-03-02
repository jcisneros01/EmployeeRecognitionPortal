using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Profiles;
using EmployeeRecognitionPortal.Services;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Moq;

namespace EmployeeRecognitionPortalTests
{
    public class EmpOfYearServiceTests
    {
        private  EmpOfYearService _empOfYearService;
        private  Context _context;

        [SetUp]
        public void Setup()
        {
            var empOfYears = new List<EmpOfYear>
            {
                new EmpOfYear
                {
                    Id = 1,
                    EmployeeName = "Emp 1",
                    EmployeeEmail = "em@email.com",
                    DateAwarded = DateTime.Now,
                    AwardCreatorId = 1,
                    LaTexFile = ""                  
                },  
                
                new EmpOfYear
                {
                    Id = 2,
                    EmployeeName = "Emp 2",
                    EmployeeEmail = "em@email.com",
                    DateAwarded = DateTime.Now,
                    AwardCreatorId = 1,
                    LaTexFile = ""
                },
            };
            var eoyMockDbSet = new Mock<DbSet<EmpOfYear>>();
            eoyMockDbSet.As<IQueryable<EmpOfYear>>().Setup(x => x.Provider).Returns(empOfYears.AsQueryable().Provider);
            eoyMockDbSet.As<IQueryable<EmpOfYear>>().Setup(x => x.Expression).Returns(empOfYears.AsQueryable().Expression);
            eoyMockDbSet.As<IQueryable<EmpOfYear>>().Setup(x => x.ElementType).Returns(empOfYears.AsQueryable().ElementType);
            eoyMockDbSet.As<IQueryable<EmpOfYear>>().Setup(x => x.GetEnumerator()).Returns(empOfYears.AsQueryable().GetEnumerator);
            eoyMockDbSet
                .Setup(m => m.Remove(It.IsAny<EmpOfYear>()))
                .Callback<EmpOfYear>(x => empOfYears.Remove(x));
            eoyMockDbSet
                .Setup(m => m.Add(It.IsAny<EmpOfYear>()))
                .Callback<EmpOfYear>(x => empOfYears.Add(x));

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
                        UserId = 1,
                        User =  new User
                        {
                            Id = 1,
                            Email = "usr1@em.com",
                            Password = "pass",
                            DateCreated = DateTime.Now,
                            IsAdmin = false,
                        }
                    }
                }
            };
            var userMockDbSet = new Mock<DbSet<User>>();
            userMockDbSet.As<IQueryable<User>>().Setup(x => x.Provider).Returns(users.AsQueryable().Provider);
            userMockDbSet.As<IQueryable<User>>().Setup(x => x.Expression).Returns(users.AsQueryable().Expression);
            userMockDbSet.As<IQueryable<User>>().Setup(x => x.ElementType).Returns(users.AsQueryable().ElementType);
            userMockDbSet.As<IQueryable<User>>().Setup(x => x.GetEnumerator()).Returns(users.AsQueryable().GetEnumerator);
                        
            var mockContext = new Mock<Context>();
            mockContext
                .Setup(x => x.EmpOfYears).Returns(eoyMockDbSet.Object);
            mockContext
                .Setup(x => x.Users).Returns(userMockDbSet.Object);
            _context = mockContext.Object;
            
            var config = new MapperConfiguration(cfg => {
                cfg.AddProfile<EmpOfYearProfile>();
                cfg.AddProfile<EmpOfYearResponseProfile>();
            });
            var mapper = new Mapper(config);
            
            _empOfYearService = new EmpOfYearService(_context, mapper);
        }

        [Test]
        public void CreateEmpOfYear_ValidRequest_ReturnsEmpOfYear()
        {
            var request = new EmpOfYearRequest
            {
                EmployeeName = "Emp 3",
                EmployeeEmail = "em@email.com",
                DateAwarded = DateTime.Now,
                AwardCreatorId = 1
            };

            var empOfYear = _empOfYearService.CreateEmpOfYear(request);
            
            Assert.AreEqual(request.EmployeeName, empOfYear.EmployeeName);
        }
        
        [Test]
        public void CreateEmpOfYear_InvalidRequest_ReturnsEmpOfYear()
        {
            var request = new EmpOfYearRequest
            {
                EmployeeName = "Emp 3",
                EmployeeEmail = "em@email.com",
                DateAwarded = DateTime.Now,
                AwardCreatorId = 2
            };
            
            Assert.Throws<UserNotFoundException>(() => _empOfYearService.CreateEmpOfYear(request));
        }

        [Test]
        public void GetEmpOfYears_WhenCalled_ReturnsEmpOfYears()
        {
            var empOfYears = _empOfYearService.GetEmpOfYears();
            
            Assert.AreEqual(2, empOfYears.Count);
        }
        
        [Test]
        public void GetEmpOfYear_ValidId_ReturnsEmpOfYear()
        {
            var empOfYear = _empOfYearService.GetEmpOfYear(1);
            
            Assert.AreEqual("Emp 1", empOfYear.EmployeeName);
        }        
        
        [Test]
        public void GetEmpOfYear_InvalidId_ThrowsException()
        {
            var empOfYear = _empOfYearService.GetEmpOfYear(1);
            
            Assert.Throws<AwardNotFoundException>(() => _empOfYearService.GetEmpOfYear(4));
        }
                
        [Test]  
        public void DeleteUser_ValidId_DeletesUser()
        {
            _empOfYearService.DeleteEmpOfYear(1);
            
            Assert.IsNull(_context.EmpOfYears.FirstOrDefault(x => x.Id == 1));
        }                 
        
        [Test]  
        public void DeleteUser_InvalidId_ThrowsException()
        {  
            Assert.Throws<AwardNotFoundException>(() => _empOfYearService.DeleteEmpOfYear(4));
        }  
    }
}