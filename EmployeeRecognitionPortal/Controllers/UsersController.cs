using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Mvc;
 
 namespace EmployeeRecognitionPortal.Controllers
 {
     [Route("[controller]")]
     public class UsersController : Controller
     {
         private readonly Context _context;
         private readonly IUserService _userService;
 
         public UsersController(Context context, IUserService userService)
         {
             _context = context;
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
         public IActionResult CreateUser([FromBody]User user)
         {    
             if (!ModelState.IsValid)
             {
                 return BadRequest();
             }
             
             User response = _userService.CreateUser(user);

             return Ok(response);
         }      
         
         [HttpPut]
         public IActionResult UpdateUser([FromBody]User user)
         {    
             if (!ModelState.IsValid)
             {
                 return BadRequest();
             }
             
             User response = _userService.UpdateUser(user);

             return Ok(response);
         }
     }
 }