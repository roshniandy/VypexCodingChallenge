namespace Vypex.CodingChallenge.Domain.Models
{
    public class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public List<LeaveDay> LeaveDays { get; set; } = new();
    }
}
