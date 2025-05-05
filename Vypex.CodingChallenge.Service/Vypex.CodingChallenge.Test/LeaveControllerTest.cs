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
    public class LeaveControllerTest
    {
        private ILeaveService _leaveService;
        private LeavesController _controller;

        [Fact]
        public async Task GetAll_ReturnsOkResult_WithGetLeavesByEmpID()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;

            using var context = new AppDbContext(options);
            var employees = new List<Employee>
            {
                new Employee { Id = Guid.NewGuid(), Name = "John" },
                new Employee { Id = Guid.NewGuid(), Name = "Jane" }
            };
            var emp = employees.FirstOrDefault();
            var leaveDays = new List<LeaveDay>
            {
                new LeaveDay { Id = Guid.NewGuid(), Employee = emp, EmployeeId = emp.Id,
                    StartDate = new DateTime(), EndDate = new DateTime(), Reason="sick leave"  }
            };
            context.Employees.AddRange(employees);
            context.LeaveDays.AddRange(leaveDays);

            await context.SaveChangesAsync();
            var leaveRepository = new LeaveRepository(context);
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            this._leaveService = new LeaveService(leaveRepository, mapper);

            _controller = new LeavesController(_leaveService);

            var result = await _controller.GetByEmpId(emp.Id);
            Assert.IsType<OkObjectResult>(result);
            var okResult = result as OkObjectResult;
            Assert.IsType<List<LeaveDayDto>>(okResult.Value);
        }


        [Fact]
        public async Task GetAll_ReturnsOkResult_WithDeleteLeaves()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;

            using var context = new AppDbContext(options);

            var emp = new Employee() { Id = Guid.NewGuid(), Name = "John" };
            var leaveDays = new LeaveDay()
            {
                Id = Guid.NewGuid(),
                Employee = emp,
                EmployeeId = emp.Id,
                StartDate = new DateTime(),
                EndDate = new DateTime(),
                Reason = "sick leave"
            };

            context.Employees.Add(emp);
            context.LeaveDays.Add(leaveDays);
            await context.SaveChangesAsync();

            var leaveRepository = new LeaveRepository(context);
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            this._leaveService = new LeaveService(leaveRepository, mapper);

            _controller = new LeavesController(_leaveService);

            var result = await _controller.Delete(leaveDays.Id);
            Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task GetAll_ReturnsOkResult_WithAddLeaves()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;

            using var context = new AppDbContext(options);
            var emp = new Employee() { Id = Guid.NewGuid(), Name = "John" };
            context.Employees.Add(emp);
            await context.SaveChangesAsync();

            CreateLeaveDayDto dto = new CreateLeaveDayDto(emp.Id, DateTime.Now, DateTime.Now.AddDays(5), "Vacation");

            var leaveRepository = new LeaveRepository(context);
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            this._leaveService = new LeaveService(leaveRepository, mapper);

            _controller = new LeavesController(_leaveService);

            var result = await _controller.AddLeaves(dto);
            Assert.IsType<OkResult>(result);
            var okResult = result as OkResult;
        }

    }
}
