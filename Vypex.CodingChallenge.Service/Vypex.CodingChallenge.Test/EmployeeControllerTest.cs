using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vypex.CodingChallenge.API.Controllers;
using Vypex.CodingChallenge.Application.DTOs;
using Vypex.CodingChallenge.Application.Interfaces;
using Vypex.CodingChallenge.Application.Mappings;
using Vypex.CodingChallenge.Application.Services;
using Vypex.CodingChallenge.Domain.Models;
using Vypex.CodingChallenge.Infrastructure.Data;
using Vypex.CodingChallenge.Infrastructure.Repositories;

namespace Vypex.CodingChallenge.Test
{
    public class EmployeeControllerTest
    {
        private IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        private EmployeesController _controller;

        [Fact]
        public async Task GetAll_ReturnsOkResult_WithListOfEmployees()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
.Options;

            using var context = new AppDbContext(options);
            context.Employees.AddRange(
                new Employee { Id = Guid.NewGuid(), Name = "John" },
                new Employee { Id = Guid.NewGuid(), Name = "Jane" }
            );
            await context.SaveChangesAsync();
            var employeeRepository = new EmployeeRepository(context);
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            var _employeeService = new EmployeeService(employeeRepository, mapper);

            _controller = new EmployeesController(_employeeService);

            var result = await _controller.GetAll();
            Assert.IsType<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsType<List<EmployeeDto>>(okResult.Value);
        }

        [Fact]
        public async Task GetById_ReturnsOkResult_WithExistingEmployeeID()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // unique db
.Options;

            using var context = new AppDbContext(options);
            List<Employee> employees = new List<Employee>
            {
                new Employee { Id = Guid.NewGuid(), Name = "John" },
                new Employee { Id = Guid.NewGuid(), Name = "Jane" }
            };
            context.Employees.AddRange(employees);
            var empId = employees.Find(e => e.Name == "John").Id;
            await context.SaveChangesAsync();
            var employeeRepository = new EmployeeRepository(context);
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            this._employeeService = new EmployeeService(employeeRepository, mapper);

            _controller = new EmployeesController(_employeeService);

            var result = await _controller.GetById(empId);
            Assert.IsType<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsType<EmployeeDto>(okResult.Value);
        }

        [Fact]
        public async Task GetById_ReturnsNotFoundResult_WithIncorrectEmployeeID()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // unique db
.Options;

            using var context = new AppDbContext(options);
            context.Employees.AddRange(new Employee { Id = Guid.NewGuid(), Name = "John" },
                new Employee { Id = Guid.NewGuid(), Name = "Jane" });
            await context.SaveChangesAsync();
            var employeeRepository = new EmployeeRepository(context);
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            this._employeeService = new EmployeeService(employeeRepository, mapper);

            _controller = new EmployeesController(_employeeService);

            var result = await _controller.GetById(Guid.NewGuid());
            Assert.IsType<NotFoundResult>(result);

        }
    }
}
