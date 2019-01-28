using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Helpers;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeRecognitionPortal.Services
{
    public class AuthService: IAuthService
    {
        private readonly Context _context;

        public AuthService(Context context)
        {
            _context = context;
        }
        
        //todo: claims for  user and some kind of id
        public string GenerateToken(LoginRequest credentials)
        {
            if (!IsAuthenticated(credentials))
            {
                throw new Exception("Unable to authenticate user.");
            }
            
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
 
            var token = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signinCredentials
            );
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
        //todo: send email via smtp
        public void SendUserPassword(string username)
        {
            throw new System.NotImplementedException(username);
        }
        
        //todo: unify user and admins to remove redundant query and then unify user/admin services
        //todo: edge case- admin and user have same email!
        //todo: add validate to make all email addresses unique 
        private bool IsAuthenticated(LoginRequest credentials)
        {
            var user =_context.Users.FirstOrDefault(x => x.Email == credentials.Email);
            if (user != null) 
                return PasswordHelper.VerifyPassword(user.Password, credentials.Password);
            
            var admin = _context.Admins.FirstOrDefault(x => x.Email == credentials.Email);
            if (admin != null) 
                return PasswordHelper.VerifyPassword(admin.Password, credentials.Password);
            
             throw new UserNotFoundException($"User with username {credentials.Email} not found"); 
        }
    }
}