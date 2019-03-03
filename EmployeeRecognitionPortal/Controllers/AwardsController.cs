using EmployeeRecognitionPortal.Filters;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

 namespace EmployeeRecognitionPortal.Controllers
 {    
     [Authorize(Policy = "Admin")]
     [Route("[controller]")]
     public class AwardsController : Controller
     {
         private readonly IAwardsService _awardsService;

         public AwardsController(IAwardsService awardsService)
         {
             _awardsService = awardsService;
         }

         [HttpGet("reports")]
         public IActionResult GetReports(string type)
         {
             switch (type)
             {
                case "countbytype":
                    return Ok(_awardsService.GetAwardsByTypeData());
                 case "countbymonth":
                    return Ok(_awardsService.GetAwardCountByMonth());
                 default:
                    return BadRequest("Invalid query");
             }
         }
     }
 }
