using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SharedValueObjects;
using System;

namespace DDDSample1.Domain.Perfis
{
    public class PerfilService : IPerfilService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IPerfilRepository _repo;

        public PerfilService(IUnitOfWork unitOfWork, IPerfilRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<PerfilDto> GetPerfilByEmailPassword(string email, string password)
        {
            var per = await this._repo.GetPerfilByEmailPassword(email, password);

            if (per == null)
                return null;

            return new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone };

        }

        public async Task<List<PerfilDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<PerfilDto> listDto = list.ConvertAll<PerfilDto>(per => new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, dataN = per.dataNascimento.DataNasc, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone });

            return listDto;
        }

        public async Task<List<string>> GetAllEmails()
        {
            var list = await this._repo.GetAllAsync();

            List<string> listEmails = GetAllEmailsDosPerfis(list);

            return listEmails;
        }

        private static List<string> GetAllEmailsDosPerfis(List<Perfil> listPerfis)
        {
            List<string> listEmails = new List<string>();
            foreach (Perfil p in listPerfis)
            {
                listEmails.Add(p.email.EnderecoEmail);
            }
            return listEmails;
        }

        public async Task<PerfilDto> GetByIdAsync(PerfilId id)
        {
            var per = await this._repo.GetByIdAsync(id);

            if (per == null)
                return null;

            return new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone };
        }

        public async Task<PerfilDto> AddAsync(CreatingPerfilDto perfilC)
        {

            var per = new Perfil(perfilC.avatar, perfilC.nome, perfilC.email, perfilC.telefone,
            /*converteParaListaString(*/perfilC.tags, perfilC.dataNascimento, perfilC.estadoHumor, perfilC.password, perfilC.pais, perfilC.cidade, perfilC.perfilFacebook, perfilC.perfilLinkedin);
            var list = await this._repo.GetAllAsync();
            var listEmails = GetAllEmailsDosPerfis(list);
            if (listEmails.Contains(perfilC.email))
            {
                return null;
            }
            await this._repo.AddAsync(per);

            await this._unitOfWork.CommitAsync();

            return new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone };
        }

        public static List<string> converteParaListaString(List<Tag> lista)
        {
            List<string> ls = new List<string>();
            foreach (Tag tag in lista)
            {
                ls.Add(tag.Descricao);
            }
            return ls;
        }

        public static Dictionary<string,decimal> converteParaDictionary(List<string> lista)
        {
            List<EstadoHumor> ls = new List<EstadoHumor>();
            Dictionary<string,decimal> mapa = new Dictionary<string, decimal>();
            foreach (string estado in lista) {
                string[] array = estado.Split(" ");
                ls.Add(new EstadoHumor(array[0], decimal.Parse(array[1])));
                mapa.Add(array[0], decimal.Parse(array[1]));
            }
            return mapa;
        }

        public static List<string> converteParaLista(List<EstadoHumor> lista)
        {
            List<string> ls = new List<string>();
            Dictionary<string,decimal> mapa = new Dictionary<string, decimal>();
            foreach (EstadoHumor estado in lista) {
                string e = String.Concat(estado.Estado, " " + estado.Valor);
                ls.Add(e);
            }
            return ls;
        }

        public static Dictionary<string,decimal> converteEstadoParaListaString(List<EstadoHumor> lista)
        {
            Dictionary<string,decimal> mapa = new Dictionary<string, decimal>();
            foreach (EstadoHumor estado in lista)
            {
                mapa.Add(estado.Estado,estado.Valor);
                // string e = String.Concat(estado.Estado, " " + estado.Valor);
                // ls.Add(e);
            }
            return mapa;
        }

        public async Task<PerfilDto> getPerfilByNome(string nome)
        {
            var per = await this._repo.getPerfilByNome(nome);

            if (per == null)
                return null;

            return new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone };
        }

        public async Task<PerfilDto> GetPerfilByEmail(string email)
        {
            var per = await this._repo.GetPerfilByEmail(email);

            if (per == null)
                return null;

            return new PerfilDto { avatar = per.avatar.avatar, Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, telefone = per.telefone.NumTelefone };
        }

        public async Task<List<PerfilDto>> GetPerfilByPais(string pais)
        {

            var per = await this._repo.GetPerfilByPais(pais);

            if (per == null)
                return null;

            List<PerfilDto> listDto = per.ConvertAll<PerfilDto>(per => new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone });

            return listDto;
        }

        public async Task<PerfilDto> PatchEstadoHumor(PerfilDto dto)
        {
            var per = await this._repo.GetByIdAsync(new PerfilId(dto.Id));

            if (per == null)
                return null;

            // change all field
            per.ChangeestadoHumor(dto.EstadoHumor);
            per.ChangeTags(dto.Tags);

            await this._unitOfWork.CommitAsync();

            return new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone };
        }

        public async Task<PerfilDto> UpdateAsync(PerfilDto dto)
        {
            var per = await this._repo.GetByIdAsync(new PerfilId(dto.Id));

            if (per == null)
                return null;

            // change all field
            if(!dto.Nome.Equals(per.nome.Name)){
                per.Changenome(dto.Nome);
            }
            if(!dto.Pais.Equals(per.pais.Country)){
                per.Changenome(dto.Pais);
            }

            await this._unitOfWork.CommitAsync();

            return new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone };
        }

        public async Task<PerfilDto> DeleteAsync(PerfilId id)
        {
            var per = await this._repo.GetByIdAsync(id);

            if (per == null)
                return null;

            // if (per.Active)
            //     throw new BusinessRuleValidationException("It is not possible to delete an active perfil.");

            this._repo.Remove(per);
            await this._unitOfWork.CommitAsync();

            return new PerfilDto { Id = per.Id.AsGuid(), Nome = per.nome.Name, Email = per.email.EnderecoEmail, Tags = converteParaListaString(per.tags), EstadoHumor = converteEstadoParaListaString(per.estadoHumor), Pais = per.pais.Country, cidade = per.cidade.City, perfilFacebook = per.perfilFacebook.PerfilFace, perfilLinkedin = per.perfilLinkedin.Linkedin, avatar = per.avatar.avatar, telefone = per.telefone.NumTelefone };
        }
    }
}