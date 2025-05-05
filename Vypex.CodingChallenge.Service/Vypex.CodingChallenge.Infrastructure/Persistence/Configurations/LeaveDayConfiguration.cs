using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Infrastructure.Persistence.Configurations
{
    public class LeaveDayConfiguration : IEntityTypeConfiguration<LeaveDay>
    {
        public void Configure(EntityTypeBuilder<LeaveDay> builder)
        {
            builder.HasKey(ld => ld.Id);

            builder.Property(ld => ld.StartDate)
                   .IsRequired();

            builder.Property(ld => ld.EndDate)
                   .IsRequired();

            builder.HasOne(ld => ld.Employee)
                   .WithMany(e => e.LeaveDays)
                   .HasForeignKey(ld => ld.EmployeeId);
        }
    }
}
