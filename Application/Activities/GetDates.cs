using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class GetDates
    {
        public class Query : IRequest<Result<ActivityDates>> 
        {
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<ActivityDates>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<ActivityDates>> Handle(Query request, CancellationToken cancellationToken)
            {
                var attendedActivities = await _context.Activities
                    .Include(a => a.Attendees)
                    .Where(a => a.Attendees.Any(u => u.AppUser.UserName == request.UserName))
                    .ToListAsync();

                var dates = new ActivityDates
                {
                    IsGoing = await _context.Activities
                        .Include(a => a.Attendees)
                        .Where(a => a.Attendees.Any(u => u.AppUser.UserName == request.UserName && !u.IsHost))
                        .Select(a => a.Date.ToString("dd/MM/yyyy"))
                        .ToListAsync(),
                    IsHost = await _context.Activities
                        .Include(a => a.Attendees)
                        .Where(a => a.Attendees.Any(u => u.AppUser.UserName == request.UserName && u.IsHost))
                        .Select(a => a.Date.ToString("dd/MM/yyyy"))
                        .ToListAsync()
                };
                
                return Result<ActivityDates>.Success(dates);
            }
        }
        
    }
}