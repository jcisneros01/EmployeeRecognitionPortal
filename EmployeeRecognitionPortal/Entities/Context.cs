using Microsoft.EntityFrameworkCore;

namespace EmployeeRecognitionPortal.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<EmpOfMonth> EmpOfMonths { get; set; }
        public DbSet<EmpOfYear> EmpOfYears { get; set; }
    }
}
