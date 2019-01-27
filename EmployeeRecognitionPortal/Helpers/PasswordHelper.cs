using CryptoHelper;

namespace EmployeeRecognitionPortal.Helpers
{
    public class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            return Crypto.HashPassword(password);
        }
 
        public static bool VerifyPassword(string hash, string password)
        {
            return Crypto.VerifyHashedPassword(hash, password);
        }
 
    }
}