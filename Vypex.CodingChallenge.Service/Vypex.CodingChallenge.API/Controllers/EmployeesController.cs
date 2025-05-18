using Microsoft.AspNetCore.Mvc;
using Vypex.CodingChallenge.Application.DTOs;
using Vypex.CodingChallenge.Application.Interfaces;

namespace Vypex.CodingChallenge.API.Controllers
{
    [ApiController]
    [Route("api/employee")]
    public class EmployeesController(IEmployeeService employeeService) : ControllerBase
    {
        //[HttpGet(Name = "GetEmployees")]
        //public IEnumerable<Employee> Get() => FakeEmployeesSeed.Generate(5);

        //[HttpGet("{id}", Name = "GetEmployeeById")]
        //public Employee GetById(Guid id) => FakeEmployeesSeed.Generate(1).First();

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await employeeService.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var employee = await employeeService.GetByIdAsync(id);
            if (employee == null)
                return NotFound();

            return Ok(employee);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(UpdateEmployeeDto dto)
        {
            await employeeService.UpdateAsync(dto);
            return Ok();
        }

        //[HttpPost]
        //public async Task<IActionResult> CreateEmployee(CreateEmployeeDto dto)
        //{
        //    await employeeService.AddAsync(dto);
        //    return Ok();
        //}

    }

}
