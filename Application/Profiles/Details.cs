using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Profile>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var HostedEventsCount = _context.Activities
                    .Where(x => x.Attendees.Any(a => a.AppUser.UserName == request.Username && a.IsHost))
                    .Count();

                var JoinedEventsCount = _context.Activities
                    .Where(x => x.Attendees.Any(a => a.AppUser.UserName == request.Username))
                    .Count();

                var upcomingEvent = _context.Activities
                    .OrderBy(x => x.Date)
                    .Where(x => x.Attendees.Any(a => a.AppUser.UserName == request.Username && a.IsHost))
                    .FirstOrDefault();

                var user = await _context.Users
                    .ProjectTo<Profile>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .SingleOrDefaultAsync(x => x.Username == request.Username);

                user.HostedEventsCount = HostedEventsCount;
                user.JoinedEventsCount = JoinedEventsCount;
                
                if (upcomingEvent != null)
                {
                    user.EventId = upcomingEvent.Id;
                    user.EventDate = upcomingEvent?.Date.ToString("dd/MM/yyyy");
                }

                
                return Result<Profile>.Success(user);
            }
        }
    }
}