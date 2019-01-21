using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    //todo: create custom exceptions for errors and add global exception handler
    public class UserService : IUserService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public UserService(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public UserResponse CreateUser(UserRequest user)
        {
            var newUser = _mapper.Map<UserRequest, User>(user);
            
           _context.Users.Add(newUser);
           _context.SaveChanges();
           
           return _mapper.Map<User, UserResponse>(newUser);
        }

        public List<UserResponse> GetUsers()
        {
            var users = _context.Users.ToList();
            return _mapper.Map<List<User>, List<UserResponse>>(users);
        }

        public void DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new Exception($"User with {id} not found");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        //todo: user validation for user and admin
        //todo: modify fields by role
        public UserResponse UpdateUser(int id, UserRequest user)
        {
            var existingUser = _context.Users.FirstOrDefault(x => x.Id == id);
            if (existingUser == null)
            {
                throw new Exception($"User with {id} not found");
            }
            
            existingUser.Name = string.IsNullOrWhiteSpace(user.Name) ? existingUser.Name: user.Name;
            existingUser.Email = string.IsNullOrWhiteSpace(user.Email) ? existingUser.Email: user.Email;
            existingUser.Password = string.IsNullOrWhiteSpace(user.Password) ? existingUser.Password: user.Password;
            existingUser.Signature = user.Signature ?? existingUser.Signature;
            _context.SaveChanges();
            
            return _mapper.Map<User, UserResponse>(existingUser);
        }

        public UserResponse GetUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new Exception($"User with {id} not found");
            }

            return _mapper.Map<User, UserResponse>(user);
        }
        
        
    }
}