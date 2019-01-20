using System;
using System.Collections.Generic;
using System.Linq;
using EmployeeRecognitionPortal.Models;

namespace EmployeeRecognitionPortal.Services
{
    //todo: create custom exceptions for errors and add global exception handler
    //todo: add request models and response models
    public class UserService : IUserService
    {
        private readonly Context _context;
        
        public UserService(Context context)
        {
            _context = context;
        }
        
        public User CreateUser(User user)
        {
           _context.Users.Add(user);
           _context.SaveChanges();
           
           return user;
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList();
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
        //todo: change fields you can modify by role
        public User UpdateUser(User user)
        {
            var existingUser = _context.Users.FirstOrDefault(x => x.Id == user.Id);
            if (user == null)
            {
                throw new Exception($"User with {user.Id} not found");
            }

            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.Signature = user.Signature;
            _context.SaveChanges();
            
            return existingUser;
        }

        public User GetUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new Exception($"User with {id} not found");
            }

            return user;
        }
        
        
    }
}