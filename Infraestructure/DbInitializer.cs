using DDDSample1.Domain.Families;
using System;
using System.Linq;

namespace DDDSample1.Infrastructure
{
    public static class DbInitializer
    {
        public static void Initialize(DDDSample1DbContext context){
            context.Database.EnsureCreated();

            if(context.Families.Any()){
                return;
            }

            var families = new Family[]
            {
                new Family("cod123","Familia1"),
                new Family("cod124","Familia2")
            };
            foreach(Family f in families)
            {
                context.Families.Add(f);
            }
            context.SaveChanges();

        }
    }
}