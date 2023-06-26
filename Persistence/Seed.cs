using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;
            
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
                },
                new Activity
                {
                    Title = "Past Event 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Event 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Activity
                {
                    Title = "Future Event 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Event 1 month in future",
                    Category = "culture",
                    City = "Athens",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Future Event 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Event 2 months in future",
                    Category = "music",
                    City = "City 17",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Future Event 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Event 3 months in future",
                    Category = "drinks",
                    City = "Griswall",
                    Venue = "Another pub",
                },
                new Activity
                {
                    Title = "Future Event 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Event 4 months in future",
                    Category = "drinks",
                    City = "Oured",
                    Venue = "Yet another pub",
                },
                new Activity
                {
                    Title = "Future Event 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Event 5 months in future",
                    Category = "drinks",
                    City = "Gracemeria",
                    Venue = "Just another pub",
                },
                new Activity
                {
                    Title = "Future Event 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Event 6 months in future",
                    Category = "music",
                    City = "Farbanti",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Future Event 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Event 2 months ago",
                    Category = "travel",
                    City = "Okchabursk",
                    Venue = "Somewhere on the Thames",
                },
                new Activity
                {
                    Title = "Future Event 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Event 8 months in future",
                    Category = "film",
                    City = "Luna Capital",
                    Venue = "Cinema",
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}