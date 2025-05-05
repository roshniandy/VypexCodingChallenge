
namespace Vypex.CodingChallenge.Domain.Models
{
    public class LeaveDay
    {
        public Guid Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;
    }
}
