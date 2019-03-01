using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Helpers;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;
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
        public LoginResponse GenerateToken(LoginRequest credentials)
        {
            if (!IsAuthenticated(credentials))
            {
                throw new Exception("Unable to authenticate user.");
            }
            
            var user = _context.Users.FirstOrDefault(x => x.Email == credentials.Email);
            var loginRes = new LoginResponse();
            loginRes.Id = user.Id;
            
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
 
            var token = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: new List<Claim>(),
                expires: DateTime.Now.AddDays(1),
                signingCredentials: signinCredentials
            );

            loginRes.Jwt = new JwtSecurityTokenHandler().WriteToken(token);
            
            return loginRes;
        }
        
        //todo: send email via smtp
        public void SendUserPassword(string username)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == username);
            if (user == null)
                return;

            var msg = new MailMessage(
                "employeerecognitionapp@gmail.com",
                user.Email,
                "Your password for Employee Recognition Portal",
                "Hi, \n\nYour password for Employee Recognition Portal is:\n\n" + user.Password + "\n\nBest,\nEmployee Recognition Portal"
            );

            var client = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential("employeerecognitionapp@gmail.com", "osuBeavers19"),
                Timeout = 20000
            };

            try
            {
                Console.WriteLine("Sending Message to " + user.Email);
                client.Send(msg);
            }
            catch (Exception ex)
            {
                Console.Write(ex.ToString());
            }


        }
        
        private bool IsAuthenticated(LoginRequest credentials)
        {
            var user =_context.Users.FirstOrDefault(x => x.Email == credentials.Email);
            if (user != null) 
                return PasswordHelper.VerifyPassword(user.Password, credentials.Password);
          
             throw new UserNotFoundException($"User with username {credentials.Email} not found"); 
        }
    }
}