using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using DDDSample1.Infrastructure;
using DDDSample1.Domain.Shared;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Infrastructure.Introducoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Infrastructure.Jogadores;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Infrastructure.Ligacoes;
using DDDSample1.Domain.Missoes;
using DDDSample1.Infrastructure.Missoes;
using DDDSample1.Domain.Perfis;
using DDDSample1.Infrastructure.Perfis;
using DDDSample1.Domain.Posts;
using DDDSample1.Infrastructure.Posts;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Infrastructure.Relacoes;
namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.AddDbContext<DDDSample1DbContext>(opt =>
            //     opt.UseInMemoryDatabase("DDDSample1DB")
            //     .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            services.AddDbContext<DDDSample1DbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>()); 
                

            ConfigureMyServices(services);


             services.AddControllers().AddNewtonsoftJson();


           // services.AddDataBaseDeveloperPageExceptionFilter();
            //services.AddControllersWithViews();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            // services.AddTransient<ICategoryRepository, CategoryRepository>();
            // services.AddTransient<CategoryService>();

            // services.AddTransient<IProductRepository, ProductRepository>();
            // services.AddTransient<ProductService>();

            //services.AddTransient<IFamilyRepository, FamilyRepository>();
            //services.AddTransient<FamilyService>();

            services.AddTransient<IIntroducaoRepository, IntroducaoRepository>();
            services.AddTransient<IIntroducaoService, IntroducaoService>();
            services.AddTransient<IJogadorRepository, JogadorRepository>();
            services.AddTransient<IJogadorService, JogadorService>();
            services.AddTransient<ILigacaoRepository, LigacaoRepository>();
            services.AddTransient<ILigacaoService, LigacaoService>();
            services.AddTransient<IMissaoRepository, MissaoRepository>();
            services.AddTransient<IMissaoService, MissaoService>();
            services.AddTransient<IPerfilRepository, PerfilRepository>();
            services.AddTransient<IPerfilService,PerfilService>();
            services.AddTransient<IPostRepository, PostRepository>();
            services.AddTransient<IPostService, PostService>();
            services.AddTransient<IRelacaoRepository, RelacaoRepository>();
            services.AddTransient<IRelacaoService, RelacaoService>();
        }
    }
}
