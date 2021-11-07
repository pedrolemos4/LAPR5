using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Infrastructure;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelacoesController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;

        public RelacoesController(DDDSample1DbContext context)
        {
            _context = context;
        }

        // GET: api/Relacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Relacao>>> GetRelacoes()
        {
            return await _context.Relacoes.ToListAsync();
        }

        // GET: api/Relacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Relacao>> GetRelacao(RelacaoId id)
        {
            var relacao = await _context.Relacoes.FindAsync(id);

            if (relacao == null)
            {
                return NotFound();
            }

            return relacao;
        }

        // PUT: api/Relacoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRelacao(RelacaoId id, Relacao relacao)
        {
            if (id != relacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(relacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RelacaoExists(id))
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

        // POST: api/Relacoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Relacao>> PostRelacao(Relacao relacao)
        {
            _context.Relacoes.Add(relacao);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RelacaoExists(relacao.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRelacao", new { id = relacao.Id }, relacao);
        }

        // DELETE: api/Relacoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRelacao(RelacaoId id)
        {
            var relacao = await _context.Relacoes.FindAsync(id);
            if (relacao == null)
            {
                return NotFound();
            }

            _context.Relacoes.Remove(relacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RelacaoExists(RelacaoId id)
        {
            return _context.Relacoes.Any(e => e.Id == id);
        }
    }
}
