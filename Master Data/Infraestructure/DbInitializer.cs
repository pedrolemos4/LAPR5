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
            List<string> listaTags = new List<string>() { "Porto", "Valongo", "Sports" };
            List<string> listaTags2 = new List<string>() { "Valongo", "Ballet" };
            List<string> listaTags3 = new List<string>() { "Atletismo", "Lisboa" };
            List<string> listaTags4 = new List<string>() { "Musica", "Arte" };
            List<string> listaTags5 = new List<string>() { "Musica", "Valongo" };
            List<string> listaEstados = new List<string>() { "Joyful 0,5", "Distressed 0,5", "Hopeful 0,5", "Fearful 0,5", "Relieve 0,5", "Disappointed 0,5", "Proud 0,5", "Remorseful 0,5",
            "Grateful 0,5", "Angry 0,5" };
            Perfil p1 = new Perfil("", "Carlos", "carlos@gmail.com", 351936825014, listaTags, "2000-05-20", listaEstados, "carlos_Sport7", "en-PT", "Porto", "perfilFB", "perfilLink");
            Perfil p2 = new Perfil("", "Fiona", "fiona@gmail.com", 351936825014, listaTags2, "2003-10-07", listaEstados, "super+Fifi48", "en-US", "Lisboa", "perfilFB2", "perfilLink2");
            Perfil p3 = new Perfil("", "Joaquim", "joaquim@gmail.com", 351936825014, listaTags3, "2004-11-08", listaEstados, "joq_Joquim12", "en-PT", "Porto", "perfilFB3", "perfilLink3");
            Perfil p4 = new Perfil("", "Rui", "rui@gmail.com", 351935682105, listaTags4, "2001-06-02", listaEstados, "Qwerty123+", "en-PT", "Porto", "perfilFB4", "perfilLink4");
            Perfil p5 = new Perfil("", "Joana", "joana@gmail.com", 351935644105, listaTags5, "2002-02-12", listaEstados, "Qwerty122223+", "en-PT", "Lisboa", "perfilFB5", "perfilLink5");

            context.Perfis.Add(p1);
            context.Perfis.Add(p2);
            context.Perfis.Add(p3);
            context.Perfis.Add(p4);
            context.Perfis.Add(p5);

            context.SaveChanges();

            var jogadores = new Jogador[] { new Jogador(p1.Id), new Jogador(p2.Id), new Jogador(p3.Id), new Jogador(p4.Id), new Jogador(p5.Id) };

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
            Relacao relacao2 = new Relacao(jogadores[1].Id,jogadores[2].Id,listaTags2,10,20);
            Relacao relacao3 = new Relacao(jogadores[2].Id,jogadores[1].Id,listaTags2,5,40);
            Relacao relacao4 = new Relacao(jogadores[1].Id,jogadores[3].Id,listaTags5,5,40);
            Relacao relacao5 = new Relacao(jogadores[3].Id,jogadores[1].Id,listaTags5,5,40);
            Relacao relacao6 = new Relacao(jogadores[3].Id,jogadores[4].Id,listaTags,5,40);
            Relacao relacao7 = new Relacao(jogadores[4].Id,jogadores[3].Id,listaTags,5,40);
            Relacao relacao8 = new Relacao(jogadores[1].Id,jogadores[4].Id,listaTags,5,10);
            Relacao relacao9 = new Relacao(jogadores[4].Id,jogadores[1].Id,listaTags,10,5);
            Ligacao ligacao = new Ligacao("texto","Pendente",jogadores[0].Id,jogadores[2].Id);
            Ligacao ligacao1 = new Ligacao("texto","Pendente",jogadores[1].Id,jogadores[0].Id);
            context.Relacoes.Add(relacao);
            context.Relacoes.Add(relacao1);
            context.Relacoes.Add(relacao2);
            context.Relacoes.Add(relacao3);
            context.Relacoes.Add(relacao4);
            context.Relacoes.Add(relacao5);
            context.Relacoes.Add(relacao6);
            context.Relacoes.Add(relacao7);
            context.Relacoes.Add(relacao8);
            context.Relacoes.Add(relacao9);
            context.Ligacoes.Add(ligacao);
            context.Ligacoes.Add(ligacao1);
            context.SaveChanges();

            Introducao intro = new Introducao(jogadores[2].Id,jogadores[1].Id,jogadores[0].Id,"Pendente","Introducao Exemplo");
            context.Introducoes.Add(intro);
            context.SaveChanges();
        }
    }
}