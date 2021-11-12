using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Infrastructure;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntroducoesController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;

        private readonly IRelacaoService _serviceRel;

        private readonly IIntroducaoService _serviceIntro;

        public IntroducoesController(DDDSample1DbContext context, IRelacaoService serviceRel, IIntroducaoService serviceIntro)
        {
            _context = context;
            _serviceRel = serviceRel;
            _serviceIntro = serviceIntro;
        }

        // GET: api/Introducoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Introducao>>> GetIntroducoes()
        {
            return await _context.Introducoes.ToListAsync();
        }

        // GET: api/Introducoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Introducao>> GetIntroducao(IntroducaoId id)
        {
            var introducao = await _context.Introducoes.FindAsync(id);

            if (introducao == null)
            {
                return NotFound();
            }

            return introducao;
        }

        // GET: api/Introducoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<IntroducaoDto>>> GetIntroducoesPorAprovar(JogadorId id)
        {
            return await _serviceIntro.GetIntroducoesPorAprovar(id);
        }
        // PUT: api/Introducoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] IntroducaoId id, [FromRoute] IntroducaoDto introducao)
        {
            if (id.AsString() != introducao.Id)
            {
                return BadRequest();
            }

            _context.Entry(introducao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IntroducaoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // PATCH: api/Introducoes/5
        [HttpPut("{introducao}")]
        public async Task<IActionResult> PatchIntroducao([FromBody]IntroducaoId id, [FromRoute]IntroducaoDto dto)
        {
            if (id.AsString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var intro = await _serviceIntro.PatchEstadoIntroducao(dto);

                if (intro == null) {
                    return NotFound();
                }
                return Ok(intro);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // POST: api/Introducoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Introducao>> PostIntroducao(IntroducaoDto introducao)
        {
            //_context.Introducoes.Add(introducao);
            var intro = new Introducao(introducao.Id,introducao.JogadorInicial,introducao.JogadorIntrodutor,
            introducao.JogadorObjetivo,"Pendente"); //corrigir
          /*  {
                JogadorInicial = introducao.JogadorInicial,
                JogadorIntrodutor = introducao.JogadorIntrodutor,
                JogadorObjetivo = introducao.JogadorObjetivo,
                EstadoIntroducao = introducao.Estado
            };*/
            await _serviceIntro.AddAsync(intro);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (IntroducaoExists(intro.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetIntroducao", new { id = introducao.Id }, introducao);
        }

        // DELETE: api/Introducoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIntroducao(IntroducaoId id)
        {
            var introducao = await _context.Introducoes.FindAsync(id);
            if (introducao == null)
            {
                return NotFound();
            }

            _context.Introducoes.Remove(introducao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IntroducaoExists(IntroducaoId id)
        {
            return _context.Introducoes.Any(e => e.Id == id);
        }
    }
}
