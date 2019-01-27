using EmployeeRecognitionPortal.Models.Request;

namespace EmployeeRecognitionPortal.Services
{
    public interface IAuthService
    {
        string GenerateToken(LoginRequest credentials);
        void SendUserPassword(string username);
    }
}