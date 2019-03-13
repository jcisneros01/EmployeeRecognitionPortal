using EmployeeRecognitionPortal.Services;
using Microsoft.AspNetCore.Mvc;
using EmployeeRecognitionPortal.Models;


// This content lives on another server:  52.247.199.88
//    It was easier to perform the linux specific tasks separately
//    than on the Windows server we have our application deployed.


namespace EmployeeRecognitionPortal.Controllers
{

  [Route("[controller]")]
  public class LatexController : Controller
  {
    [HttpGet]
    public IActionResult GetLatex()
    {

      return Ok();
    }

    [HttpPost]
    public IActionResult CreateLatex([FromBody] Award award)
    {
        Award _award = new Award();
        _award = award;

        EmployeeRecognitionPortal.Services.LatexService.CreateLatex(_award);



      return Ok();
    }

  }
}
