namespace Vypex.CodingChallenge.Application.DTOs
{
    public record EmployeeDto(Guid Id, string Name, List<LeaveDayDto> leaveDays);

}
