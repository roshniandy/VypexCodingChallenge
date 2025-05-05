namespace Vypex.CodingChallenge.Application.DTOs
{
    public record CreateLeaveDayDto(Guid EmployeeId, DateTime StartDate, DateTime EndDate, string Reason);
}
