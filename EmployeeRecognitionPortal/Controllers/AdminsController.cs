using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

 namespace EmployeeRecognitionPortal.Controllers
 {
     
     [Route("[controller]")]
     public class AdminsController : Controller
     {
         private readonly IAdminService _adminService;

         public AdminsController(IAdminService adminService)
         {
             _adminService = adminService;
         }

         [HttpGet]
         public IActionResult Get()
         {
             var response = _adminService.GetAdmins();

             return Ok(response);
         }

         [HttpGet("{id}")]
         public IActionResult GetUser(int id)
         {
             var response = _adminService.GetAdmin(id);

             return Ok(response);
         }

         [HttpDelete("{id}")]
         public IActionResult DeleteUser(int id)
         {
             _adminService.DeleteAdmin(id);

             return Ok();
         }

         [HttpPost]
         [ValidateModel]
         public IActionResult CreateUser([FromBody]AdminRequest user)
         {
             var response = _adminService.CreateAdmin(user);

             return Ok(response);
         }

         [HttpPut("{id}")]
         [ValidateModel]
         public IActionResult UpdateUser(int id, [FromBody]AdminPostRequest user)
         {
             var response = _adminService.UpdateAdmin(id, user);

             return Ok(response);
         }
     }
 }
