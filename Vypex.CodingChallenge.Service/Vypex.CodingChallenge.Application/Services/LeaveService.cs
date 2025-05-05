using AutoMapper;
using Vypex.CodingChallenge.Application.DTOs;
using Vypex.CodingChallenge.Application.Interfaces;
using Vypex.CodingChallenge.Domain.Interfaces;
using Vypex.CodingChallenge.Domain.Models;

namespace Vypex.CodingChallenge.Application.Services
{
    public class LeaveService:ILeaveService
    {
        private readonly ILeaveRepository _leaveRepository;
        private readonly IMapper _mapper;

        public LeaveService(ILeaveRepository leaveRepository, IMapper mapper)
        {
            _leaveRepository = leaveRepository;
            _mapper = mapper;
        }
        public async Task AddAsync(CreateLeaveDayDto leaveDay)
        {
            await _leaveRepository.AddAsync(_mapper.Map<LeaveDay>(leaveDay));
        }

        public async Task<List<LeaveDayDto>> GetByEmpIdAsync(Guid empId)
        {
            return _mapper.Map<List<LeaveDayDto>>(await _leaveRepository.GetAsync(empId));
        }

        public async Task DeleteAsync(Guid id)
        {
            await _leaveRepository.DeleteByIdAsync(id);
        }

        public async Task UpdateAsync(LeaveDayDto leaveDay)
        {
            await _leaveRepository.UpdateAsync(_mapper.Map<LeaveDay>(leaveDay));
        }
    }
}
