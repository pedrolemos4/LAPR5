using DDDSample1.Domain.Perfis;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Relacoes;
using System.Collections.Generic;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Domain.Introducoes;

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
            List<string> listaTags3 = new List<string>() { "Atletismo", "Lisboa" };
            List<string> listaTags4 = new List<string>() { "Musica", "Arte" };
            Perfil p1 = new Perfil("Carlos", "carlos@gmail.com", 351936825014, listaTags, "2000-05-20", "Joyful", "carlos_Sport7", "en-PT", "Porto", "perfilFB", "perfilLink");
            Perfil p2 = new Perfil("Fiona", "fiona@gmail.com", 351936825014, listaTags2, "2003-10-07", "Disappointed", "super+Fifi48", "en-US", "Lisboa", "perfilFB2", "perfilLink2");
            Perfil p3 = new Perfil("Joaquim", "joaquim@gmail.com", 351936825014, listaTags3, "2004-11-08", "Disappointed", "joq_Joquim12", "en-PT", "Porto", "perfilFB3", "perfilLink3");
            Perfil p4 = new Perfil("Rui", "rui@gmail.com", 351935682105, listaTags4, "2001-06-02", "Disappointed", "Qwerty123+", "en-PT", "Porto", "perfilFB4", "perfilLink4");


            context.Perfis.Add(p1);
            context.Perfis.Add(p2);
            context.Perfis.Add(p3);
            context.Perfis.Add(p4);

            context.SaveChanges();

            var jogadores = new Jogador[] { new Jogador(p1.Id), new Jogador(p2.Id), new Jogador(p3.Id), new Jogador(p4.Id) };

            if (context.Jogadores.Any())
            {
                return;
            }
 
            foreach (Jogador j in jogadores)
            {
                context.Jogadores.Add(j);
            }

            context.SaveChanges();

            Relacao relacao = new Relacao(jogadores[0].Id,jogadores[1].Id,listaTags,10,80);
            Relacao relacao1 = new Relacao(jogadores[1].Id,jogadores[0].Id,listaTags,5,10);
            Relacao relacao2 = new Relacao(jogadores[1].Id,jogadores[2].Id,listaTags,10,20);
            Relacao relacao3 = new Relacao(jogadores[2].Id,jogadores[1].Id,listaTags,5,40);
            Ligacao ligacao = new Ligacao("texto","Pendente",jogadores[0].Id,jogadores[1].Id);
            Ligacao ligacao1 = new Ligacao("texto","Pendente",jogadores[1].Id,jogadores[2].Id);
            context.Relacoes.Add(relacao);
            context.Relacoes.Add(relacao1);
            context.Relacoes.Add(relacao2);
            context.Relacoes.Add(relacao3);
            context.Ligacoes.Add(ligacao);
            context.Ligacoes.Add(ligacao1);
            context.SaveChanges();

            Introducao intro = new Introducao(jogadores[2].Id,jogadores[1].Id,jogadores[0].Id,"Pendente","Introducao Exemplo");
            context.Introducoes.Add(intro);
            context.SaveChanges();
        }
    }
}