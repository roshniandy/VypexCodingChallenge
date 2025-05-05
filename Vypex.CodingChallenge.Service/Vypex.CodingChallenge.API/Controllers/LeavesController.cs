using Microsoft.AspNetCore.Mvc;
using Vypex.CodingChallenge.Application.DTOs;
using Vypex.CodingChallenge.Application.Interfaces;

namespace Vypex.CodingChallenge.API.Controllers
{
    [ApiController]
    [Route("api/leave")]
    public class LeavesController(ILeaveService leaveService) : ControllerBase
    {

        [HttpGet("emp-leaves/{id}")]
        public async Task<IActionResult> GetByEmpId(Guid id) => Ok(await leaveService.GetByEmpIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> AddLeaves(CreateLeaveDayDto dto)
        {
            await leaveService.AddAsync(dto);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateLeaves(LeaveDayDto dto)
        {
            await leaveService.UpdateAsync(dto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await leaveService.DeleteAsync(id);
            return Ok();
        }
    }

}
