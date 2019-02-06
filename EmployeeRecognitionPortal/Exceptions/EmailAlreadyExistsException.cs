using System;

namespace EmployeeRecognitionPortal.Exceptions
{
    public class EmailAlreadyExistsException : Exception
    {
        public EmailAlreadyExistsException()
        {
        }

        public EmailAlreadyExistsException(string message)
            : base(message)
        {
        }
    }
}
