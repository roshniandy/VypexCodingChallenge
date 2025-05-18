using Microsoft.EntityFrameworkCore;
using Vypex.CodingChallenge.Domain.Interfaces;
using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Infrastructure.Data;

namespace Vypex.CodingChallenge.Infrastructure.Repositories
{
    public class EmployeeRepository(AppDbContext dbContext) :IEmployeeRepository
    {
        public async Task<List<Employee>> GetAllAsync() => await dbContext.Employees.Include(e => e.LeaveDays).ToListAsync();

        public async Task<Employee> GetAsync(Guid id)
        {
            return await dbContext.Employees.Include(e => e.LeaveDays)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task AddAsync(Employee employee)
        {
            await dbContext.Employees.AddAsync(employee);
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Employee employee)
        {
            dbContext.Employees.Update(employee);
            await dbContext.SaveChangesAsync();
        }

    }   
}
