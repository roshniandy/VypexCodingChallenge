using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Vypex.CodingChallenge.Application.Interfaces;
using Vypex.CodingChallenge.Application.Mappings;
using Vypex.CodingChallenge.Application.Services;

namespace Vypex.CodingChallenge.Application
{
    public static class ApplicationModule
    {
        public static IServiceCollection AddApplicationModule(this IServiceCollection services)
        {
            IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
            services.AddSingleton(mapper);
            services.AddAutoMapper(typeof(MappingConfig).Assembly);
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<ILeaveService, LeaveService>();
            return services;
        }
    }
}
