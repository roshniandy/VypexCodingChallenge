using Microsoft.EntityFrameworkCore;
using Vypex.CodingChallenge.Domain.Interfaces;
using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Infrastructure.Data;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public class LeaveRepository(AppDbContext dbContext):ILeaveRepository
    {
        public async Task AddAsync(LeaveDay leaveDay)
        {
            await dbContext.LeaveDays.AddAsync(leaveDay);
            await dbContext.SaveChangesAsync();
        }

        public async Task<List<LeaveDay>> GetAsync(Guid empId) => await dbContext.LeaveDays.Where(x=>x.EmployeeId == empId).ToListAsync();

        public async Task DeleteByIdAsync(Guid leaveId)
        {
            var leave = await dbContext.LeaveDays.FindAsync(leaveId);
            if (leave != null)
            {
                dbContext.LeaveDays.Remove(leave);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task UpdateAsync(LeaveDay leaveDay)
        {
            dbContext.LeaveDays.Update(leaveDay);
            await dbContext.SaveChangesAsync();
        }
    }
}
