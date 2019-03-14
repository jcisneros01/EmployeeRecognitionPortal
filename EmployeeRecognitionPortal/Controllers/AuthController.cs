using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Mvc;
 
 namespace EmployeeRecognitionPortal.Controllers
 {    
     [Route("[controller]")]
     public class AuthController: Controller
     {
         private readonly IAuthService _authService;

         public AuthController(IAuthService authService)
         {
             _authService = authService;
         }
         
         [HttpPost("token")]
         [ValidateModel]
         public IActionResult CreateToken([FromBody]LoginRequest credentials)
         {   
             var token =_authService.GenerateToken(credentials);
             
             return Ok(token);
         }

         [HttpPost("recoverpassword")]
         [ValidateModel]
         public IActionResult RecoverPassword([FromBody] PasswordResetRequest request)
         {
             _authService.SendUserPassword(request.Email);
             
             return Ok();
         }
     }
 }