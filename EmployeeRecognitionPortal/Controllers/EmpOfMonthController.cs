using System;
using System.Linq;
using System.Security.Claims;
using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;

namespace EmployeeRecognitionPortal.Controllers
{
    [Authorize(Policy = "User")]
    [Route("[controller]")]
   public class EmpOfMonthController : Controller
   {
       private IEmpOfMonthService _eomService;
       private IUserService _userService;

       public EmpOfMonthController(IEmpOfMonthService eomService, IUserService userService)
       {
         _eomService = eomService;
         _userService = userService;
       }

       [HttpPost]
       [ValidateModel]
       public IActionResult CreateEmpOfMonth([FromBody]EmpOfMonthRequest eom)
       {
         var res = _eomService.CreateEmpOfMonth(eom);
         return Ok(res);
       }

       [HttpGet]
       public IActionResult Get()
       {
         var userId = _userService.GetUserId(User.Identity as ClaimsIdentity);
         var res = _eomService.GetEmpOfMonths(userId);
         return Ok(res);
       }

       [HttpGet("{id}")]
       public IActionResult Get(int id)
       {
         var res = _eomService.GetEmpOfMonth(id);
         return Ok(res);
       }

       [HttpDelete("{id}")]
       public IActionResult DeleteEmpOfMonth(int id){
              _eomService.DeleteEmpOfMonth(id);
         return Ok();
       }
   }
}
