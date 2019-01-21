using Newtonsoft.Json;

namespace EmployeeRecognitionPortal.Models
{
    public class ErrorModel
    {
        public string Message { get; set; }
 
 
        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}