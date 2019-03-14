using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Helpers;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;
using Microsoft.EntityFrameworkCore;

namespace EmployeeRecognitionPortal.Services
{
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
            var existingUser = _context.Users.FirstOrDefault(x => x.Email == user.Email);
            if (existingUser != null)
            {
                throw new EmailAlreadyExistsException($"User with username {user.Email} already exists");
            }

           var newUser = _mapper.Map<UserRequest, User>(user);
            
           _context.Users.Add(newUser);
           _context.SaveChanges();
           
           return _mapper.Map<User, UserResponse>(newUser);
        }

        public List<UserResponse> GetUsers()
        {
            var users = _context.Users
                .Include(x => x.AwardCreator)
                .Where(x => x.IsAdmin == false)
                .ToList();
            
            return _mapper.Map<List<User>, List<UserResponse>>(users);
        }
        
        public List<AdminResponse> GetAdmins()
        {
            var users = _context.Users
                .Where(x => x.IsAdmin == true)
                .ToList();
            
            return _mapper.Map<List<User>, List<AdminResponse>>(users);        
        }

        public void DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new UserNotFoundException($"User with id {id} not found");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public UserResponse UpdateUser(int id, UserPostRequest user, bool isAdmin)
        {
            var existingUser = _context.Users.Include(x => x.AwardCreator).FirstOrDefault(x => x.Id == id);
            if (existingUser == null)
            {
                throw new UserNotFoundException($"User with id {id} not found");
            }
            
            existingUser.AwardCreator.Name = string.IsNullOrWhiteSpace(user.Name) ? 
                existingUser.AwardCreator.Name: user.Name;
            
            if (isAdmin)
            {
                existingUser.Email = string.IsNullOrWhiteSpace(user.Email) ? existingUser.Email: user.Email;
                existingUser.Password = string.IsNullOrWhiteSpace(user.Password) ? 
                    existingUser.Password: PasswordHelper.PasswordEncryptDecrypt(user.Password);
                existingUser.AwardCreator.Signature = user.Signature ?? existingUser.AwardCreator.Signature;               
            }
            _context.SaveChanges();
            
            return _mapper.Map<User, UserResponse>(existingUser);
        }

        public AdminResponse GetAdmin(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new UserNotFoundException($"User with id {id} not found");
            }

            return _mapper.Map<User, AdminResponse>(user);        
        }

        public AdminResponse CreateAdmin(AdminRequest user)
        {
            var existingUser = _context.Users.FirstOrDefault(x => x.Email == user.Email);
            if (existingUser != null)
            {
                throw new EmailAlreadyExistsException($"User with username {user.Email} already exists");
            }
            
            var newUser = _mapper.Map<AdminRequest, User>(user);
            
            _context.Users.Add(newUser);
            _context.SaveChanges();
           
            return _mapper.Map<User, AdminResponse>(newUser);        }

        public AdminResponse UpdateAdmin(int id, AdminPostRequest user)
        {
            var existingAdmin = _context.Users.FirstOrDefault(x => x.Id == id);
            if (existingAdmin == null)
            {
                throw new UserNotFoundException($"User with id {id} not found");
            }
            
            existingAdmin.Email = string.IsNullOrWhiteSpace(user.Email) ? existingAdmin.Email: user.Email;
            existingAdmin.Password = string.IsNullOrWhiteSpace(user.Password) ? 
                existingAdmin.Password: PasswordHelper.PasswordEncryptDecrypt(user.Password);
            _context.SaveChanges();
            
            return _mapper.Map<User, AdminResponse>(existingAdmin);
        }

        public UserResponse GetUser(int id)
        {
            var user = _context.Users.Include(x => x.AwardCreator).FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new UserNotFoundException($"User with id {id} not found");
            }

            return _mapper.Map<User, UserResponse>(user);
        }
    }
}