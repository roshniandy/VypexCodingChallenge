namespace Vypex.CodingChallenge.Application.DTOs
{
    public record LeaveDayDto(Guid Id, Guid EmployeeId, DateTime StartDate, DateTime EndDate, string Reason);
}
