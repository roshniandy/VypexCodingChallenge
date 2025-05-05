using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Domain.Interfaces
{
    public interface ILeaveRepository
    {
        Task AddAsync(LeaveDay leaveDay);
        Task<List<LeaveDay>> GetAsync(Guid empId);
        Task DeleteByIdAsync(Guid leaveId);
        Task UpdateAsync(LeaveDay leaveDay);
    }
}
