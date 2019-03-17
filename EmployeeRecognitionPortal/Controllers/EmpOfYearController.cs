using System.Security.Claims;
using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

 namespace EmployeeRecognitionPortal.Controllers
{
    [Authorize(Policy = "User")]
    [Route("[controller]")]
   public class EmpOfYearController : Controller
   {
       private readonly IEmpOfYearService _eoyService;
       private readonly IUserService _userService;
       
       public EmpOfYearController(IEmpOfYearService eoyService, IUserService userService)
       {
         _eoyService = eoyService;
         _userService = userService;
       }

       [HttpPost]
       [ValidateModel]
       public IActionResult CreateEmpOfYear([FromBody]EmpOfYearRequest eoy)
       {
         var res = _eoyService.CreateEmpOfYear(eoy);
         return Ok(res);
       }

       [HttpGet]
       public IActionResult Get()
       {
         var userId = _userService.GetUserId(User.Identity as ClaimsIdentity);
         var res = _eoyService.GetEmpOfYears(userId);
         return Ok(res);
       }

       [HttpGet("{id}")]
       public IActionResult Get(int id)
       {
         var res = _eoyService.GetEmpOfYear(id);
         return Ok(res);
       }

       [HttpDelete("{id}")]
       public IActionResult DeleteEmpOfYear(int id){
              _eoyService.DeleteEmpOfYear(id);
         return Ok();
       }
   }
}
