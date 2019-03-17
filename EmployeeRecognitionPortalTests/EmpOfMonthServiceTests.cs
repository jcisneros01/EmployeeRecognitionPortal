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
    public class EmpOfMonthServiceTests
    {
        private  EmpOfMonthService _empOfMonthService;
        private  Context _context;

        [SetUp]
        public void Setup()
        {
            var empOfMonths = new List<EmpOfMonth>
            {
                new EmpOfMonth
                {
                    Id = 1,
                    EmployeeName = "Emp 1",
                    EmployeeEmail = "em@email.com",
                    DateAwarded = DateTime.Now,
                    AwardCreatorId = 1,
                    LaTexFile = ""                  
                },  
                
                new EmpOfMonth
                {
                    Id = 2,
                    EmployeeName = "Emp 2",
                    EmployeeEmail = "em@email.com",
                    DateAwarded = DateTime.Now,
                    AwardCreatorId = 1,
                    LaTexFile = ""
                },
            };
            var eomMockDbSet = new Mock<DbSet<EmpOfMonth>>();
            eomMockDbSet.As<IQueryable<EmpOfMonth>>().Setup(x => x.Provider).Returns(empOfMonths.AsQueryable().Provider);
            eomMockDbSet.As<IQueryable<EmpOfMonth>>().Setup(x => x.Expression).Returns(empOfMonths.AsQueryable().Expression);
            eomMockDbSet.As<IQueryable<EmpOfMonth>>().Setup(x => x.ElementType).Returns(empOfMonths.AsQueryable().ElementType);
            eomMockDbSet.As<IQueryable<EmpOfMonth>>().Setup(x => x.GetEnumerator()).Returns(empOfMonths.AsQueryable().GetEnumerator);
            eomMockDbSet
                .Setup(m => m.Remove(It.IsAny<EmpOfMonth>()))
                .Callback<EmpOfMonth>(x => empOfMonths.Remove(x));
            eomMockDbSet
                .Setup(m => m.Add(It.IsAny<EmpOfMonth>()))
                .Callback<EmpOfMonth>(x => empOfMonths.Add(x));

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
                .Setup(x => x.EmpOfMonths).Returns(eomMockDbSet.Object);
            mockContext
                .Setup(x => x.Users).Returns(userMockDbSet.Object);
            _context = mockContext.Object;
            
            var config = new MapperConfiguration(cfg => {
                cfg.AddProfile<EmpOfMonthProfile>();
                cfg.AddProfile<EmpOfMonthResponseProfile>();
            });
            var mapper = new Mapper(config);
            
            _empOfMonthService = new EmpOfMonthService(_context, mapper);
        }

        [Test]
        public void CreateEmpOfMonth_ValidRequest_ReturnsEmpOfMonth()
        {
            var request = new EmpOfMonthRequest
            {
                EmployeeName = "Emp 3",
                EmployeeEmail = "em@email.com",
                DateAwarded = DateTime.Now,
                AwardCreatorId = 1
            };

            var empOfMonth = _empOfMonthService.CreateEmpOfMonth(request);
            
            Assert.AreEqual(request.EmployeeName, empOfMonth.EmployeeName);
        }
        
        [Test]
        public void CreateEmpOfMonth_InvalidRequest_ReturnsEmpOfMonth()
        {
            var request = new EmpOfMonthRequest
            {
                EmployeeName = "Emp 3",
                EmployeeEmail = "em@email.com",
                DateAwarded = DateTime.Now,
                AwardCreatorId = 2
            };
            
            Assert.Throws<UserNotFoundException>(() => _empOfMonthService.CreateEmpOfMonth(request));
        }

        [Test]
        public void GetEmpOfMonths_WhenCalled_ReturnsEmpofMonths()
        {
            var empofMonths = _empOfMonthService.GetEmpOfMonths(1);
            
            Assert.AreEqual(2, empofMonths.Count);
        }
        
        [Test]
        public void GetEmpOfMonth_ValidId_ReturnsEmpofMonth()
        {
            var empofMonth = _empOfMonthService.GetEmpOfMonth(1);
            
            Assert.AreEqual("Emp 1", empofMonth.EmployeeName);
        }        
        
        [Test]
        public void GetEmpOfMonth_InvalidId_ThrowsException()
        {
            var empofMonth = _empOfMonthService.GetEmpOfMonth(1);
            
            Assert.Throws<AwardNotFoundException>(() => _empOfMonthService.GetEmpOfMonth(4));
        }
                
        [Test]  
        public void DeleteUser_ValidId_DeletesUser()
        {
            _empOfMonthService.DeleteEmpOfMonth(1);
            
            Assert.IsNull(_context.EmpOfMonths.FirstOrDefault(x => x.Id == 1));
        }                 
        
        [Test]  
        public void DeleteUser_InvalidId_ThrowsException()
        {  
            Assert.Throws<AwardNotFoundException>(() => _empOfMonthService.DeleteEmpOfMonth(4));
        }  
    }
}