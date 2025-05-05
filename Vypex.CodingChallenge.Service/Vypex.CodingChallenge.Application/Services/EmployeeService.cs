using AutoMapper;
using Vypex.CodingChallenge.Application.DTOs;
using Vypex.CodingChallenge.Application.Interfaces;
using Vypex.CodingChallenge.Domain.Interfaces;
using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Application.Services
{
    public class EmployeeService:IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        public async Task<List<EmployeeDto>> GetAllAsync()
        {
            return _mapper.Map<List<EmployeeDto>>(await _employeeRepository.GetAllAsync());
        }
        public async Task<EmployeeDto> GetByIdAsync(Guid id)
        {
            return _mapper.Map<EmployeeDto>(await _employeeRepository.GetAsync(id));
        }
        public async Task AddAsync(CreateEmployeeDto employee)
        {
            await _employeeRepository.AddAsync(_mapper.Map<Employee>(employee));
        }

        public async Task UpdateAsync(UpdateEmployeeDto employee)
        {
            await _employeeRepository.UpdateAsync(_mapper.Map<Employee>(employee));
        }
    }
}
