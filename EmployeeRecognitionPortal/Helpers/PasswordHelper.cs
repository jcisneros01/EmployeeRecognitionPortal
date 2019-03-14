using System;
using System.Text;
using CryptoHelper;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Paddings;
using Org.BouncyCastle.Crypto.Parameters;

namespace EmployeeRecognitionPortal.Helpers
{
    
    public class PasswordHelper
    {
  
        private static int _key = 98080354;
        
        public static string PasswordEncryptDecrypt(string password)  
        {  
            StringBuilder _input = new StringBuilder(password); 
            StringBuilder _output = new StringBuilder(password.Length);  
            char _ch;


            for (int i = 0; i < _input.Length; i++)
            {
                _ch = _input[i];
                _ch = (char)(_ch ^ _key);
                _output.Append(_ch);
            }
    
            return _output.ToString();  
        }  
 
        public static bool VerifyPassword(string encryptedPassword, string attempt)
        {
            return attempt == PasswordEncryptDecrypt(encryptedPassword);
        }
        
        
 
    }
}