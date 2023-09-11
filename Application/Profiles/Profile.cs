using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
        public int JoinedEventsCount { get; set; }
        public int HostedEventsCount { get; set; }
        public Guid EventId { get; set; }
        public string EventDate { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}