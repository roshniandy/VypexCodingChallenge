using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Domain.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee> GetAsync(Guid id);
        Task AddAsync(Employee employee);
        Task UpdateAsync(Employee employee);

    }
}
