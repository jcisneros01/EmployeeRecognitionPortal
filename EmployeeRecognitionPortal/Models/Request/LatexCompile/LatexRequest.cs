using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models
{

  // This content lives on another server:  52.247.199.88
  //    It was easier to perform the linux specific tasks separately
  //    than on the Windows server we have our application deployed.

    public class LatexRequest
    {
        [Required]
        public Award award {get; set;}
    }
}
