using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public interface IAuthService
    {
        LoginResponse GenerateToken(LoginRequest credentials);
        void SendUserPassword(string username);
    }
}