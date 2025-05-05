using Vypex.CodingChallenge.Application.DTOs;

namespace Vypex.CodingChallenge.Application.Interfaces
{
    public interface IEmployeeService
    {
        Task<List<EmployeeDto>> GetAllAsync();
        Task<EmployeeDto> GetByIdAsync(Guid id);
        Task AddAsync(CreateEmployeeDto employee);
        Task UpdateAsync(UpdateEmployeeDto employee);
    }
}
