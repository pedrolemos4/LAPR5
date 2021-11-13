using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Infrastructure;
using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogadoresController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;
        private readonly IJogadorService _serviceJog;

        private readonly IPerfilService _servicePer;

        public JogadoresController(DDDSample1DbContext context, IJogadorService serviceJog, IPerfilService servicePer)
        {
            _context = context;
            _serviceJog = serviceJog;
            _servicePer = servicePer;
        }

        // GET: api/Jogadores
        [HttpGet]
        public async Task<ActionResult<List<JogadorDto>>> GetJogadores()
        {
            return await _serviceJog.GetAllAsync();
        }

        // GET: api/Jogadores/5
        [HttpGet("{id}")]
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

        // GET: api/Perfis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PerfilDto>> GetPerfilJogador(Guid id)
        {
            JogadorDto jogadorDto = await _serviceJog.GetByIdAsync(new JogadorId(id));

            if (jogadorDto == null)
            {
                return NotFound();
            }

            var perfil = await _servicePer.GetByIdAsync(jogadorDto.perfilId);

            return perfil;
        }

        // GET: api/Perfis/7
        [HttpGet("{perfil}")]
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
        [HttpGet("{id}")]
        public async Task<ActionResult<List<JogadorDto>>> GetAmigosEmComum([FromRoute]Guid idJog, [FromBody]Guid idObj)
        {
            return await _serviceJog.GetAmigosEmComum(new JogadorId(idJog), new JogadorId(idObj));
        }

        // GET: api/Jogadores/6
        [HttpGet("{id}")]
        public async Task<ActionResult<List<JogadorDto>>> GetAmigos(Guid idJog)
        {
            return await _serviceJog.GetAmigos(new JogadorId(idJog));
        }

        // PUT: api/Jogadores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJogador([FromRoute]Guid id,[FromBody] JogadorDto jogador)
        {
            if (id != jogador.Id) {
                return BadRequest();
            }

            try {
                var cat = await _serviceJog.UpdateAsync(jogador);
                
                if (cat == null)
                {
                    return NotFound();
                }
                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // POST: api/Jogadores
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
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }

        private bool JogadorExists(JogadorId id)
        {
            return _context.Jogadores.Any(e => e.Id == id);
        }


    }
}