using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

 namespace EmployeeRecognitionPortal.Controllers
 {

   [Route("[controller]")]
   public class EmpOfMonthController : Controller
   {
     private IEmpOfMonthService _eomService;

     public EmpOfMonthController(IEmpOfMonthService eomService)
     {
            _eomService = eomService;
     }

     //Create
     [HttpPost]
     [ValidateModel]
     public IActionResult CreateEmpOfMonth([FromBody]EmpOfMonthRequest eom)
     {
       var res = _eomService.CreateEmpOfMonth(eom);
       return Ok(res);
     }

     //Read
     [HttpGet]
     public IActionResult Get()
     {
       var res = _eomService.GetEmpOfMonths();
       return Ok(res);
     }

     [HttpGet("{id}")]
     public IActionResult Get(int id)
     {
       var res = _eomService.GetEmpOfMonth(id);
       return Ok(res);
     }

     //Delete
     [HttpDelete("{id}")]
     public IActionResult DeleteEmpOfMonth(int id){
            _eomService.DeleteEmpOfMonth(id);
       return Ok();
     }



   }


 }
