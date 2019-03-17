using System;
using System.Collections.Generic;
using System.Security.Claims;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public interface IUserService
    {
        UserResponse CreateUser(UserRequest user);
        UserResponse GetUser(int id);
        List<UserResponse> GetUsers();
        void DeleteUser(int id);
        UserResponse UpdateUser(int id, UserPostRequest user, bool isAdmin);
        List<AdminResponse> GetAdmins();
        AdminResponse GetAdmin(int id);
        AdminResponse CreateAdmin(AdminRequest user);
        AdminResponse UpdateAdmin(int id, AdminPostRequest user);
        int GetUserId(ClaimsIdentity identity);
    }
}