using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

 namespace EmployeeRecognitionPortal.Controllers
{
   [Authorize]
   [Route("[controller]")]
   public class EmpOfYearController : Controller
   {
       private readonly IEmpOfYearService _eoyService;

       public EmpOfYearController(IEmpOfYearService eoyService)
       {
          _eoyService = eoyService;
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
         var res = _eoyService.GetEmpOfYears();
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
