using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EmployeeRecognitionPortal.Exceptions;
using EmployeeRecognitionPortal.Models;
using EmployeeRecognitionPortal.Models.Request;
using EmployeeRecognitionPortal.Models.Response;

namespace EmployeeRecognitionPortal.Services
{
    public class EmpOfYearService : IEmpOfYearService
    {
        private readonly Context _context;
        private readonly IMapper _mapper;

        public EmpOfYearService(Context context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public EmpOfYearResponse CreateEmpOfYear(EmpOfYearRequest eoy)
        {
           var newEOY = _mapper.Map<EmpOfYearRequest, EmpOfYear>(eoy);

           //Create LaTex File
           newEOY.CreateLaTex();

           _context.EmpOfYears.Add(newEOY);
           _context.SaveChanges();

           return _mapper.Map<EmpOfYear, EmpOfYearResponse>(newEOY);
        }

        public List<EmpOfYearResponse> GetEmpOfYears()
        {
            var eoys = _context.EmpOfYears.ToList();
            return _mapper.Map<List<EmpOfYear>, List<EmpOfYearResponse>>(eoys);
        }

        public EmpOfYearResponse GetEmpOfYear(int id)
        {
          var eoy = _context.EmpOfYears.FirstOrDefault(x => x.Id == id);
          if(eoy == null)
          {
            throw new AwardNotFoundException($"Award with id {id} was not in the database.");
          }

          return _mapper.Map<EmpOfYear, EmpOfYearResponse>(eoy);
        }

        public void DeleteEmpOfYear(int id)
        {
          var eoy = _context.EmpOfYears.FirstOrDefault(x => x.Id == id);
          if(eoy == null)
          {
            throw new AwardNotFoundException($"Award with id {id} was not in the database.");
          }
        }

    }
}
