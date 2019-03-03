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
        
        public LoginResponse GenerateToken(LoginRequest credentials)
        {
            var user = GetAuthenticatedUser(credentials);
            if (user == null)
            {
                throw new Exception("Unable to authenticate user.");
            }
                                    
            var token = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: GetUserClaims(user),
                expires: DateTime.Now.AddDays(1),
                signingCredentials: GetSigningCredentials()
            );
            
            return new LoginResponse
            {
                Id = user.Id,
                Jwt = new JwtSecurityTokenHandler().WriteToken(token),
                IsAdmin = user.IsAdmin
            };;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                "this is my custom Secret key for authentication"));
            return new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        }

        private List<Claim> GetUserClaims(User user)
        {
            string role = user.IsAdmin ? "IsAdmin" : "IsUser";
            return new List<Claim>
            {
                new Claim("UserId", user.Id.ToString()),
                new Claim(role, "")
            };
        }

        public void SendUserPassword(string username)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == username);
            if (user == null)
                return;

            var msg = new MailMessage(
                "employeerecognitionapp@gmail.com",
                user.Email,
                "Your password for Employee Recognition Portal",
                "Hi, \n\nYour password for Employee Recognition Portal is:\n\n" + user.Password + 
                "\n\nBest,\nEmployee Recognition Portal"
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
        
        private User GetAuthenticatedUser(LoginRequest credentials)
        {
            var user =_context.Users.FirstOrDefault(x => x.Email == credentials.Email);
            if (user != null)
            {
                var isAuthenticated = PasswordHelper.VerifyPassword(user.Password, credentials.Password);
                if (isAuthenticated)
                {
                    return user;
                }

                return null;
            }
            
            throw new UserNotFoundException($"User with username {credentials.Email} not found"); 
        }
    }
}