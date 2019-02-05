using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

 namespace EmployeeRecognitionPortal.Controllers
 {
     [Authorize]
     [Route("[controller]")]
     public class UsersController : Controller
     {
         private readonly IUserService _userService;

         public UsersController(IUserService userService)
         {
             _userService = userService;
         }

         [HttpGet]
         public IActionResult Get()
         {
             var response = _userService.GetUsers();

             return Ok(response);
         }

         [HttpGet("{id}")]
         public IActionResult GetUser(int id)
         {
             var response = _userService.GetUser(id);

             return Ok(response);
         }

         [HttpDelete("{id}")]
         public IActionResult DeleteUser(int id)
         {
             _userService.DeleteUser(id);

             return Ok();
         }

         [HttpPost]
         [ValidateModel]
         public IActionResult CreateUser([FromBody]UserRequest user)
         {
             var response = _userService.CreateUser(user);

             return Ok(response);
         }

         [HttpPut("{id}")]
         [ValidateModel]
         public IActionResult UpdateUser(int id, [FromBody]UserPostRequest user)
         {
             var response = _userService.UpdateUser(id, user);

             return Ok(response);
         }
     }
 }
