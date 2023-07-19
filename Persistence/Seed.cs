using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName="Yukari", UserName="yukari", Email="gap@test.com"},
                    new AppUser{DisplayName="Maribel", UserName="maribel", Email="mari@test.com"},
                    new AppUser{DisplayName="John", UserName="john", Email="john@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Event 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Event 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Event 2",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Event 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Event 1",
                        Date = DateTime.UtcNow.AddMonths(1),
                        Description = "Event 1 month in future",
                        Category = "music",
                        City = "Chernobog",
                        Venue = "Z2K Stadium",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Event 2",
                        Date = DateTime.UtcNow.AddMonths(2),
                        Description = "Event 2 months in future",
                        Category = "food",
                        City = "Lungmen",
                        Venue = "Central Park",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Event 3",
                        Date = DateTime.UtcNow.AddMonths(3),
                        Description = "Event 3 months in future",
                        Category = "drinks",
                        City = "Nagazora",
                        Venue = "Sushi Bar",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Event 4",
                        Date = DateTime.UtcNow.AddMonths(4),
                        Description = "Event 4 months in future",
                        Category = "culture",
                        City = "Oured",
                        Venue = "Belkan War Museum",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Event 5",
                        Date = DateTime.UtcNow.AddMonths(5),
                        Description = "Event 5 months in future",
                        Category = "drinks",
                        City = "Luna Capital",
                        Venue = "An Shang Tea",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Event 6",
                        Date = DateTime.UtcNow.AddMonths(6),
                        Description = "Event 6 months in future",
                        Category = "music",
                        City = "City 17",
                        Venue = "H9 Area",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Event 7",
                        Date = DateTime.UtcNow.AddMonths(7),
                        Description = "Event 7 months in future",
                        Category = "travel",
                        City = "Dinsmark",
                        Venue = "All",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Event 8",
                        Date = DateTime.UtcNow.AddMonths(8),
                        Description = "Event 8 months in future",
                        Category = "drinks",
                        City = "Griswall",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
