using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Vypex.CodingChallenge.Domain.Interfaces;
using Vypex.CodingChallenge.Infrastructure.Data;
using Vypex.CodingChallenge.Infrastructure.Repositories;

namespace Vypex.CodingChallenge.Infrastructure
{
    public static class InfrastructureModule
    {
        public static IServiceCollection AddInfrastructureModule(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddDbContext<AppDbContext>(options =>
            //    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<AppDbContext>(options =>
            {
                //     options.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=TestApiDb;Trusted_Connection=True;TrustServerCertificate=true;MultipleActiveResultSets=true")
                //.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))
               .LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Information);
            });
           
            //services.AddDbContext<CodingChallengeContext>(options => options
            //    .UseSqlite(connectionString));

            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<ILeaveRepository, LeaveRepository>();
            return services;
        }
    }
}
