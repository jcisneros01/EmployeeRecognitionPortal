using System;
using System.Collections.Generic;
using EmployeeRecognitionPortal.Models;

namespace EmployeeRecognitionPortal.Services
{
    public interface IUserService
    {
        User CreateUser(User user);
        User GetUser(int id);
        List<User> GetUsers();
        void DeleteUser(int id);
        User UpdateUser(User user);
    }
}