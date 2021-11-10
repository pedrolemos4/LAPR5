using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Missoes;
using DDDSample1.Infrastructure;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissoesController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;

        private readonly IMissaoService _service;

        public MissoesController(DDDSample1DbContext context, IMissaoService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/Missoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Missao>>> GetMissoes()
        {
            return await _context.Missoes.ToListAsync();
        }

        // GET: api/Missoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Missao>> GetMissao(MissaoId id)
        {
            var missao = await _context.Missoes.FindAsync(id);

            if (missao == null)
            {
                return NotFound();
            }

            return missao;
        }

        // PUT: api/Missoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMissao(MissaoId id, Missao missao)
        {
            if (id != missao.Id)
            {
                return BadRequest();
            }

            _context.Entry(missao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MissaoExists(id))
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

        // POST: api/Missoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Missao>> PostMissao(Missao missao)
        {
            _context.Missoes.Add(missao);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MissaoExists(missao.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMissao", new { id = missao.Id }, missao);
        }

        // DELETE: api/Missoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMissao(MissaoId id)
        {
            var missao = await _context.Missoes.FindAsync(id);
            if (missao == null)
            {
                return NotFound();
            }

            _context.Missoes.Remove(missao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MissaoExists(MissaoId id)
        {
            return _context.Missoes.Any(e => e.Id == id);
        }
    }
}
