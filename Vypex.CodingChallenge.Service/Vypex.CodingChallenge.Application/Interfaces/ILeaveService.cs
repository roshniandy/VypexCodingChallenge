using Vypex.CodingChallenge.Application.DTOs;

namespace Vypex.CodingChallenge.Application.Interfaces
{
    public interface ILeaveService
    {
        Task AddAsync(CreateLeaveDayDto leaveDay);
        Task<List<LeaveDayDto>> GetByEmpIdAsync(Guid id);
        Task DeleteAsync(Guid id);
        Task UpdateAsync(LeaveDayDto leaveDay);

    }
}
