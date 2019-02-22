using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EmployeeRecognitionPortal.Models.Response
{
    public class AwardCountByMonthResponse
    {
        public List<AwardCountByMonthData> AwardCountByMonth{ get; set; }
        
    }
}