using System;
using System.Collections.Generic;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public interface IAdminService
    {
        AdminResponse CreateAdmin(AdminRequest admin);
        AdminResponse GetAdmin(int id);
        List<AdminResponse> GetAdmins();
        void DeleteAdmin(int id);
        AdminResponse UpdateAdmin(int id, AdminPostRequest admin);
    }
}