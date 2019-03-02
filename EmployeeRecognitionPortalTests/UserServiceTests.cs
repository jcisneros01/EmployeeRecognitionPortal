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
    public class UserServiceTests
    {
        private  IUserService _userService;
        private  Context _context;

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
                    Email = "usr2@em.com",
                    Password = "pass",
                    DateCreated = DateTime.Now,
                    IsAdmin = false,
                    AwardCreator = new AwardCreator
                    {
                        Name = "testuser2",
                        Signature = null,
                        UserId = 2
                    }
                },

                new User
                {
                    Id = 3,
                    Email = "admin1@em.com",
                    Password = "pass",
                    DateCreated = DateTime.Now,
                    IsAdmin = true,
                    AwardCreator = null
                },

                new User
                {
                    Id = 4,
                    Email = "admin2@em.com",
                    Password = "pass",
                    DateCreated = DateTime.Now,
                    IsAdmin = true,
                    AwardCreator = null
                }
            };
            var userMockDbSet = new Mock<DbSet<User>>();
            userMockDbSet.As<IQueryable<User>>().Setup(x => x.Provider).Returns(users.AsQueryable().Provider);
            userMockDbSet.As<IQueryable<User>>().Setup(x => x.Expression).Returns(users.AsQueryable().Expression);
            userMockDbSet.As<IQueryable<User>>().Setup(x => x.ElementType).Returns(users.AsQueryable().ElementType);
            userMockDbSet.As<IQueryable<User>>().Setup(x => x.GetEnumerator()).Returns(users.AsQueryable().GetEnumerator);
            userMockDbSet
                .Setup(m => m.Remove(It.IsAny<User>()))
                .Callback<User>(x => users.Remove(x));
            userMockDbSet
                .Setup(m => m.Add(It.IsAny<User>()))
                .Callback<User>(x => users.Add(x));

            var mockContext = new Mock<Context>();
           
            mockContext
                .Setup(x => x.Users).Returns(userMockDbSet.Object);
            

            _context = mockContext.Object;
            
            var config = new MapperConfiguration(cfg => {
                cfg.AddProfile<AdminResponseProfile>();
                cfg.AddProfile<UserProfile>();
                cfg.AddProfile<UserResponseProfile>();
            });
            var mapper = new Mapper(config);
            
            _userService = new UserService(_context, mapper);
        }  
  
        [Test]  
        public void GetUser_ValidId_ReturnsUser()
        {
            var user = _userService.GetUser(1);
            
            Assert.AreEqual("usr1@em.com", user.Email);
        }    
        
        [Test]  
        public void GetUser_InvalidId_ReturnsException()
        {            
            Assert.Throws<UserNotFoundException>(() => _userService.GetUser(0));
        }  
        
        [Test]  
        public void GetUsers_WhenCalled_ReturnsUsers()
        {
            var users = _userService.GetUsers();
            
            Assert.AreEqual(2, users.Count);
        }          
        
        [Test]  
        public void DeleteUser_ValidId_DeletesUser()
        {
            _userService.DeleteUser(1);
            
            Assert.IsNull(_context.Users.FirstOrDefault(x => x.Id == 1));
        }          
        
        [Test]  
        public void DeleteUser_InvalidId_ThrowsException()
        {
            _userService.DeleteUser(1);
            
            Assert.Throws<UserNotFoundException>(() => _userService.DeleteUser(0));
        }    
                      
        [Test]  
        public void CreateUser_ValidParam_ReturnsUser()
        {     
            var user = _userService.CreateUser(new UserRequest
            {
                Email = "usrem@email.com",
                Password = "pass",
                Name = "name",
                Signature = null
            });
     
            Assert.IsNotNull(_context.Users.FirstOrDefault(x => x.Email == "usrem@email.com"));
        }  
        
        [Test]  
        public void CreateUser_InvalidId_ReturnsException()
        {            
            Assert.Throws<EmailAlreadyExistsException>(() => _userService.CreateUser(new UserRequest
            {
                Email = "usr1@em.com"
            }));
        }  

        [Test]  
        public void GetAdmin_ValidId_ReturnsAdmin()
        {
            var user = _userService.GetAdmin(3);
            
            Assert.AreEqual("admin1@em.com", user.Email);
        }    
        
        [Test]  
        public void GetAdmin_InvalidId_ReturnsException()
        {            
            Assert.Throws<UserNotFoundException>(() => _userService.GetAdmin(0));
        }  
              
        [Test]  
        public void CreateAdmin_ValidParam_ReturnsUser()
        {     
            var user = _userService.CreateAdmin(new AdminRequest
            {
                Email = "userem@email.com",
                Password = "pass"
            });
            
            Assert.IsNotNull(_context.Users.FirstOrDefault(x => x.Email == "userem@email.com"));
        }  
        
        [Test]  
        public void GetAdmins_WhenCalled_ReturnsAdmins()
        {
            var admins = _userService.GetAdmins();
            
            Assert.AreEqual(2, admins.Count);
        }  
        
        [Test]  
        public void UpdateUser_ValidId_ReturnsUser()
        {
            var user = _userService.UpdateUser(1, new UserPostRequest
            {
                Name = "fname"
            });
            
            Assert.AreEqual("fname", user.Name);
       }           
                
        [Test]  
        public void UpdateUser_InvalidId_ThrowsException()
        {
            var user = new UserPostRequest
            {
                Name = "fname"
            };
            
            Assert.Throws<UserNotFoundException>(() => _userService.UpdateUser(0, user));
       }           
        
        [Test]  
        public void UpdateAdmin_ValidId_ReturnsAdmin()
        {
            var admin = _userService.UpdateAdmin(3, new AdminPostRequest
            {
                Email = "fname@email.com"
            });
            
            Assert.AreEqual("fname@email.com", admin.Email);
       } 
        
                        
        [Test]  
        public void UpdateAdmin_InvalidId_ThrowsException()
        {
            var user = new AdminPostRequest
            {
                Email = "fname@email.com"
            };
            
            Assert.Throws<UserNotFoundException>(() => _userService.UpdateAdmin(0, user));
        }   
    }
}