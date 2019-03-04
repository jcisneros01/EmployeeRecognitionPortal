using System;

namespace EmployeeRecognitionPortal.Exceptions
{
    public class InvalidLoginAttemptException : Exception
    {
        public InvalidLoginAttemptException()
        {
        }

        public InvalidLoginAttemptException(string message)
            : base(message)
        {
        }
    }
}
