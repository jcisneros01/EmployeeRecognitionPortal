using System;

namespace EmployeeRecognitionPortal.Exceptions
{
    public class AwardNotFoundException : Exception
    {
        public AwardNotFoundException()
        {
        }

        public AwardNotFoundException(string message)
            : base(message)
        {
        }
    }
}
