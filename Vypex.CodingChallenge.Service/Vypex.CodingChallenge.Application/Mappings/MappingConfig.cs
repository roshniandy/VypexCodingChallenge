using AutoMapper;
using Vypex.CodingChallenge.Application.DTOs;
using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Application.Mappings
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<Employee, EmployeeDto>();
                config.CreateMap<EmployeeDto, Employee>();
                config.CreateMap<CreateEmployeeDto, Employee>();
                config.CreateMap<UpdateEmployeeDto, Employee>();
                config.CreateMap<LeaveDayDto, LeaveDay>();
                config.CreateMap<LeaveDay, LeaveDayDto>();
                config.CreateMap<CreateLeaveDayDto, LeaveDay>();
            });
            return mappingConfig;
        }

    }
}
