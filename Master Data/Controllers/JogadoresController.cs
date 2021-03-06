using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.LoginUser;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogadoresController : ControllerBase
    {
        private readonly IJogadorService _serviceJog;

        private readonly IPerfilService _servicePer;

        public JogadoresController(IJogadorService serviceJog, IPerfilService servicePer)
        {
            _serviceJog = serviceJog;
            _servicePer = servicePer;
        }

        // // GET: api/Jogadores/{email/password}
        // [HttpGet("{email}/{password}")]
        // public async Task<ActionResult<JogadorDto>> GetJogadorByEmailPassword(string email,string password)
        // {
        //     var perfil = await _servicePer.GetPerfilByEmailPassword(email,password);
            
        //     if (perfil == null) {
        //         return NotFound();
        //     }

        //     var jogador = await _serviceJog.GetJogadorByPerfil(new PerfilId(perfil.Id));
            

        //     return jogador;
        // }

        [HttpPost("[action]")]
        public async Task<ActionResult> Login(LoginUser user)
        {
            var succeeded = true;
            var perfil = await _servicePer.GetPerfilByEmailPassword(user.email,user.password);
            
            if (perfil == null) {
                return BadRequest(new { message = "Email ou Password incorretos." });
            }

            return Ok(new { succeeded });
        }

        // GET: api/Jogadores
        [HttpGet]
        public async Task<ActionResult<List<JogadorDto>>>  GetJogadores() => await _serviceJog.GetAllAsync();

        // GET: api/Jogadores/5
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<JogadorDto>> GetJogador(Guid id)
        {
            //var jogador = await _context.Jogadores.FindAsync(id);
            var jogador = await _serviceJog.GetByIdAsync(new JogadorId(id));

            if (jogador == null)
            {
                return NotFound();
            }

            return jogador;
        }

        // GET: api/Jogadores/5
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<PerfilDto>> GetPerfilJogador(Guid id)
        {
            JogadorDto jogadorDto = await _serviceJog.GetByIdAsync(new JogadorId(id));

            if (jogadorDto == null)
            {
                return NotFound();
            }

            var perfil = await _servicePer.GetByIdAsync(new PerfilId(jogadorDto.PerfilId));

            return perfil;
        }

        // GET: api/Jogadores/7
        [HttpGet]
        [Route("[action]/{perfilId}")]
        public async Task<ActionResult<JogadorDto>> GetJogadorByPerfil(Guid perfilId)
        {
            var jogador = await _serviceJog.GetJogadorByPerfil(new PerfilId(perfilId));

            if (jogador == null)
            {
                return NotFound();
            }

            return jogador;
        }

        // GET: api/Jogadores/5
        [HttpGet]
        [Route("[action]/{idJog}/{idObj}")]
        public async Task<ActionResult<List<JogadorDto>>> GetAmigosEmComum(Guid idJog, Guid idObj)
        {
            Console.WriteLine("\n\nId Jog: " + idJog);
            Console.WriteLine("\n\nId Obj: " + idObj);
            return await _serviceJog.GetAmigosEmComum(new JogadorId(idJog), new JogadorId(idObj));
        }

        // GET: api/Jogadores/6
        [HttpGet]
        [Route("[action]/{idJog}")]
        public async Task<ActionResult<List<JogadorDto>>> GetAmigos(Guid idJog)
        {
            return await _serviceJog.GetAmigos(new JogadorId(idJog));
        }

        [HttpGet]
        [Route("[action]/{idJog}")]
        public async Task<ActionResult<List<JogadorDto>>> GetPossiveisAmigos(Guid idJog)
        {
            return await _serviceJog.GetPossiveisAmigos(new JogadorId(idJog));
        }
        
        // PUT: api/Jogadores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult> PutJogador([FromRoute] Guid id, [FromBody] JogadorDto jogador)
        {
            if (id != jogador.Id)
            {
                return BadRequest();
            }

            try
            {
                var cat = await _serviceJog.UpdateAsync(jogador);

                if (cat == null)
                {
                    return NotFound();
                }
                return Ok(cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

         // POST: api/Jogadores/10
         // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
         [HttpPost]
         public async Task<ActionResult<JogadorDto>> PostJogador(CreatingJogadorDto jogadorDto)
         {

             try {
                 var jog = await _serviceJog.AddAsync(jogadorDto);

                 return CreatedAtAction(nameof(GetJogador), new { id = jog.Id }, jog);
             }
             catch(BusinessRuleValidationException ex) {
                 return BadRequest(new {Message = ex.Message});
             }
         }

        // DELETE: api/Jogadores/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<JogadorDto>> DeleteJogador(Guid id)
        {
            try
            {
                var intro = await _serviceJog.DeleteAsync(new JogadorId(id));

                if (intro == null)
                {
                    return NotFound();
                }

                return Ok(intro);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


    }
}
