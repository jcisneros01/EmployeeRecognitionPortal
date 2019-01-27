using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Helpers;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public class AdminService : IAdminService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public AdminService(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public AdminResponse CreateAdmin(AdminRequest admin)
        {
            var newAdmin = _mapper.Map<AdminRequest, Admin>(admin);
            
            _context.Admins.Add(newAdmin);
            _context.SaveChanges();

            return _mapper.Map<Admin, AdminResponse>(newAdmin);
        }
       
        public List<AdminResponse> GetAdmins()
        {
            var admins = _context.Admins.ToList();
            return _mapper.Map<List<Admin>, List<AdminResponse>>(admins);           
        }
        
        public AdminResponse GetAdmin(int id)
        {
            var admin = _context.Admins.FirstOrDefault(x => x.Id == id);
            if (admin == null)
            {
                throw new UserNotFoundException($"User with id {id} not found");
            }

            return _mapper.Map<Admin, AdminResponse>(admin);        }
           
        public void DeleteAdmin(int id)
        {
            var admin = _context.Admins.FirstOrDefault(x => x.Id == id);
            if (admin == null)
            {
                throw new UserNotFoundException($"User with id {id} not found");
            }

            _context.Admins.Remove(admin);
            _context.SaveChanges();
        }

        public AdminResponse UpdateAdmin(int id, AdminPostRequest admin)
        {
            var existingAdmin = _context.Admins.FirstOrDefault(x => x.Id == id);
            if (existingAdmin == null)
            {
                throw new UserNotFoundException($"User with id {id} not found");
            }
            
            existingAdmin.Email = string.IsNullOrWhiteSpace(admin.Email) ? existingAdmin.Email: admin.Email;
            existingAdmin.Password = string.IsNullOrWhiteSpace(admin.Password) ? 
                existingAdmin.Password: PasswordHelper.HashPassword(admin.Password);
            _context.SaveChanges();
            
            return _mapper.Map<Admin, AdminResponse>(existingAdmin);
            
        }
    }
}