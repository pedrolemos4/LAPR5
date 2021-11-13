using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Jogadores;
using System.Collections.Generic;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure
{
    public static class DbInitializer
    {
        public static void Initialize(DDDSample1DbContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            /* if (context.Families.Any())
             {
                 return;
             }

             var families = new Family[]
             {
                 new Family("cod123","Familia1"),
                 new Family("cod124","Familia2")
             };
             foreach (Family f in families)
             {
                 context.Families.Add(f);
             }
             context.SaveChanges();*/
            //----------------------------------------------------Registar Utilizador UC8---------------------------------------------------//
            if (context.Perfis.Any())
            {
                Console.WriteLine("\n=============================\n========================\nLINHA 33");
                return;
            }
            List<string> listaTags = new List<string>() { "Porto", "University", "Sports" };
            List<string> listaTags2 = new List<string>() { "Valongo", "Ballet" };
            Perfil p1 = new Perfil("codPerfil", "Carlos", "carlos@gmail.com", 351936825014, listaTags, "2000/05/20", "Joyful", "carlos_Sport7", "Andorra", "Porto", "perfilFB", "perfilLink");
            Perfil p2 = new Perfil("codPerfil2", "Fiona", "fiona@gmail.com", 351936825014, listaTags2, "2003/10/07", "Disappointed", "super+Fifi48", "Armenia", "Lisboa", "perfilFB2", "perfilLink2");

            var perfis = new Jogador[] { new Jogador(p1), new Jogador(p2) };

            context.Perfis.Add(p1);
            context.Perfis.Add(p2);

            context.SaveChanges();

            if (context.Jogadores.Any())
            {
                return;
            }

            foreach (Jogador j in perfis)
            {
                context.Jogadores.Add(j);
            }

            context.SaveChanges();
        }
    }
}