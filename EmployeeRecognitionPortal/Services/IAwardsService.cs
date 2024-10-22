using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public interface IAwardsService
    {
        AwardsByTypeResponse GetAwardsByTypeData();
        AwardDataByMonthResponse GetAwardDataByMonth();
    }
}