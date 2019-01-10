using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeRecognitionPortal.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeRecognitionPortal.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly Context _context;

        public SampleDataController(Context context)
        {
            _context = context;
        }
        
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }
        
        // GET: 
        [HttpGet]
        public IActionResult Get()
        {
            var result = _context.Users.ToList();
            return Ok(result);
        }

        [HttpPost]
        public void Post([FromBody]User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get { return 32 + (int) (TemperatureC / 0.5556); }
            }
        }
    }
}