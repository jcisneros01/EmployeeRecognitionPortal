using Microsoft.EntityFrameworkCore;

namespace EmployeeRecognitionPortal.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<EmpOfMonth> EmpOfMonths { get; set; }
        public DbSet<EmpOfYear> EmpOfYears { get; set; }
    }
}
