using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

 namespace EmployeeRecognitionPortal.Controllers
 {
     //[Authorize(Policy = "Admin")]
     [Route("[controller]")]
     public class AdminsController : Controller
     {
         private readonly IUserService _userService;

         public AdminsController(IUserService userService)
         {
             _userService = userService;
         }

         [HttpGet]
         public IActionResult Get()
         {
             var response = _userService.GetAdmins();

             return Ok(response);
         }

         [HttpGet("{id}")]
         public IActionResult GetAdmins(int id)
         {
             var response = _userService.GetAdmin(id);

             return Ok(response);
         }

         [HttpDelete("{id}")]
         public IActionResult DeleteAdmin(int id)
         {
             _userService.DeleteUser(id);

             return Ok();
         }

         [HttpPost]
         [ValidateModel]
         public IActionResult CreateAdmin([FromBody]AdminRequest user)
         {
             var response = _userService.CreateAdmin(user);

             return Ok(response);
         }

         [HttpPut("{id}")]
         [ValidateModel]
         public IActionResult UpdateAdmin(int id, [FromBody]AdminPostRequest user)
         {
             var response = _userService.UpdateAdmin(id, user);

             return Ok(response);
         }
     }
 }
