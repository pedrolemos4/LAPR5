using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Infrastructure;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigacoesController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;

        private readonly ILigacaoService _service;

        public LigacoesController(DDDSample1DbContext context, ILigacaoService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/Ligacoes
        [HttpGet]
        public async Task<ActionResult<List<LigacaoDto>>> GetLigacoes()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Ligacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ligacao>> GetLigacao(LigacaoId id)
        {
            var ligacao = await _context.Ligacoes.FindAsync(id);

            if (ligacao == null)
            {
                return NotFound();
            }

            return ligacao;
        }

        public async Task<ActionResult<List<LigacaoDto>>> GetLigacaoPendente(JogadorId id)
        {
            return await _service.GetLigacaoPendente(id);
        }
        // PUT: api/Ligacoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLigacao([FromRoute]LigacaoId id, [FromBody]Ligacao ligacao)
        {
            if (id != ligacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(ligacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LigacaoExists(id))
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

        // PATCH: api/Ligacoes/5
        [HttpPut("{ligacao}")]
        public async Task<IActionResult> PatchLigacao(LigacaoId id, LigacaoDto dto)
        {
            if (id.AsString() != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var intro = await _service.PatchEstadoLigacao(dto);

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

        // POST: api/Ligacoes/6
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LigacaoDto>> PostLigacao(CreatingLigacaoDto ligacaoDto)
        {

            var ligacao = await _service.AddAsync(ligacaoDto);

            return CreatedAtAction("PostLigacao", new { id = ligacao.Id }, ligacao);
        }

        // DELETE: api/Ligacoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigacao(LigacaoId id)
        {
            var ligacao = await _context.Ligacoes.FindAsync(id);
            if (ligacao == null)
            {
                return NotFound();
            }

            _context.Ligacoes.Remove(ligacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LigacaoExists(LigacaoId id)
        {
            return _context.Ligacoes.Any(e => e.Id == id);
        }
    }
}
