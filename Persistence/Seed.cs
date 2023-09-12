using System.Globalization;
using System.Reflection;
using CsvHelper;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
                    new() {DisplayName="Yukari", UserName="yukari", Email="gap@test.com"},
                    new() {DisplayName="Maribel", UserName="maribel", Email="mari@test.com"},
                    new() {DisplayName="John", UserName="john", Email="john@test.com"},
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

        public static async Task SeedUsers(DataContext context, UserManager<AppUser> userManager)
        {
            if (userManager.Users.Count() <= 10)
            {
                using var reader = new StreamReader("Persistence/MOCK_DATA.csv");

                using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

                var records = csv.GetRecords<dynamic>();
                var users = new List<AppUser>();

                foreach (var record in records)
                {
                    string displayName = record.DisplayName;
                    string email = record.Email;
                    string userName = record.UserName;
                    string bio = record.Bio;

                    var user = new AppUser
                    {
                        DisplayName = displayName,
                        Email = email,
                        UserName = userName,
                        Bio = bio,
                        EmailConfirmed = true
                    };
                    
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                users.AddRange(userManager.Users);

                Random random = new Random();

                foreach (var target in users)
                {
                    int followers = random.Next(7,33);
                    foreach (var observer in users)
                    {
                        if (followers == 0) break;
                        if (target.Id != observer.Id) {
                            var following = new UserFollowing
                            {
                                Observer = observer,
                                Target = target
                            };
                            followers--;
                            context.UserFollowings.Add(following);
                        }
                    }
                }

                await context.SaveChangesAsync();
            }
        }

        public async static Task SeedAvatars(DataContext context, UserManager<AppUser> userManager)
        {
            if (context.Users.Where(u => u.Photos.Count() == 0).Count() > 1)
            {
                var users = userManager.Users.Include(u => u.Photos).ToList();
                foreach (var user in users)
                {
                    if (user.Photos == null || user.Photos.Count == 0)
                    {
                        var photo = new Photo
                        {
                            Url = "https://i.pravatar.cc/150?u=" + user.Email,
                            IsMain = true,
                            Id = Guid.NewGuid().ToString()
                        };
                        user.Photos.Add(photo);
                    }
                }
            }
            await context.SaveChangesAsync();
        }

        public static async Task SeedEvents(DataContext context)
        {
            if (context.Activities.Count() <= 10)
            {
                using var reader = new StreamReader("../Persistence/EVENTS_MOCK_DATA.csv");

                using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

                var records = csv.GetRecords<dynamic>();

                Random random = new Random();

                string[] categories = { "music", "travel", "drinks", "culture", "food", "film" };

                var users = context.Users.ToList();

                var activities = new List<Activity>();

                foreach (var record in records)
                {
                    string title = record.Title;
                    string description = record.Description;
                    string city = record.City;
                    string venue = record.Venue;

                    int numTime = random.Next(-8, 8);
                    bool isMonth = random.Next(0, 2) == 1;
                    var date = isMonth? DateTime.UtcNow.AddMonths(numTime) : DateTime.UtcNow.AddDays(numTime);

                    var activity = new Activity
                    {
                        Title = title,
                        Description = description,
                        City = city,
                        Venue = venue,
                        Date = date,
                        Category = categories[random.Next(0, 6)]
                    };
                    activities.Add(activity);
                }
                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }

        public static async Task SeedAttendees(DataContext context)
        {
            if (context.Activities.Where(a => a.Attendees.Count() <= 5).Count() > 0)
            {
                var activities = context.Activities.ToList();
                var users = context.Users.ToList();
                Random random = new Random();

                foreach (var activity in activities)
                {
                    activity.Attendees = activity.Attendees ?? new List<ActivityAttendee>();
                    if (activity.Attendees.Count() <= 7)
                    {
                        bool noHost = true;
                        for (int i = 0; i < random.Next(7, 34); i++)
                        {
                            int index = random.Next(0, users.Count());
                            if (activity.Attendees.Any(a => a.AppUser.Id == users[index].Id)) continue;
                            activity.Attendees.Add(new ActivityAttendee
                            {
                                AppUser = users[index],
                                IsHost = noHost
                            });
                            noHost = false;
                        }
                    }
                }
                await context.SaveChangesAsync();
            }
        }
    }
}
