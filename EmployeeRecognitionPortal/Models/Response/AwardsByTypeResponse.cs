using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Response
{
    public class AwardsByTypeResponse
    {
        public List<AwardByTypeData> Awards { get; set; }
        
        public int AwardTotal { get; set; }
    }
}