using Microsoft.EntityFrameworkCore;

namespace EmployeeRecognitionPortal.Models
{
    public class Context : DbContext
    { 
        public Context(DbContextOptions<Context> options) : base(options)
        {

        } 
        
        public Context()
        {

        }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
        
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<AwardCreator> AwardCreators { get; set; }
        public virtual DbSet<EmpOfMonth> EmpOfMonths { get; set; }
        public virtual DbSet<EmpOfYear> EmpOfYears { get; set; }
    }
}
