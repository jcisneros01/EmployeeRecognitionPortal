using System.Security.Claims;
using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

 namespace EmployeeRecognitionPortal.Controllers
 {
     [Route("[controller]")]
     public class UsersController : Controller
     {
         private readonly IUserService _userService;

         public UsersController(IUserService userService)
         {
             _userService = userService;
         }
         
         [Authorize(Policy = "Admin")]
         [HttpGet]
         public IActionResult Get()
         {
             var response = _userService.GetUsers();

             return Ok(response);
         }
         
         [Authorize(Policy = "Admin")]
         [HttpGet("{id}")]
         public IActionResult GetUser(int id)
         {
             var response = _userService.GetUser(id);

             return Ok(response);
         }
         
         [Authorize(Policy = "Admin")]
         [HttpDelete("{id}")]
         public IActionResult DeleteUser(int id)
         {
             _userService.DeleteUser(id);

             return Ok();
         }
         
         [Authorize(Policy = "Admin")]
         [HttpPost]
         [ValidateModel]
         public IActionResult CreateUser([FromBody]UserRequest user)
         {
             var response = _userService.CreateUser(user);

             return Ok(response);
         }

         [Authorize]
         [HttpPut("{id}")]
         [ValidateModel]
         public IActionResult UpdateUser(int id, [FromBody]UserPostRequest user)
         {
             var identity = User.Identity as ClaimsIdentity;
             var isAdmin = identity.HasClaim(c => c.Type == "IsAdmin");
             
             var response = _userService.UpdateUser(id, user, isAdmin);

             return Ok(response);
         }
     }
 }
