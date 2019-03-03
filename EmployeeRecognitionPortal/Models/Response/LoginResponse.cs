namespace EmployeeRecognitionPortal.Models.Response
{
    public class LoginResponse
    {
        public string Jwt { get; set; }

        public int Id { get; set; }

        public bool IsAdmin { get; set; }
    }
}