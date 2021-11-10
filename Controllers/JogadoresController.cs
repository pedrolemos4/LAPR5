using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Perfis;
using DDDSample1.Infrastructure;

namespace DDDNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogadoresController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;
        private readonly JogadorService _serviceJog;

        private readonly PerfilService _servicePer;

        public JogadoresController(DDDSample1DbContext context)
        {
            _context = context;
        }

        // GET: api/Jogadores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jogador>>> GetJogadores()
        {
            return await _context.Jogadores.ToListAsync();
        }

        // GET: api/Jogadores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<JogadorDto>> GetJogador(JogadorId id)
        {
            //var jogador = await _context.Jogadores.FindAsync(id);
            var jogador = await _serviceJog.GetByIdAsync(id);

            if (jogador == null)
            {
                return NotFound();
            }

            return jogador;
        }

        // GET: api/Perfis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PerfilDto>> GetPerfilJogador(JogadorId id)
        {
            JogadorDto jogadorDto = await _serviceJog.GetByIdAsync(id);
            //Jogador jogador = await _context.Jogadores.FindAsync(id);

            if (jogadorDto == null)
            {
                return NotFound();
            }

            //    var perfil = await _context.Perfis.FindAsync(jogadorDto.perfilId);
            var perfil = await _servicePer.GetByIdAsync(jogadorDto.perfilId);
            //ou criar uma query no service
            return perfil;
        }

        // GET: api/Jogadores/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<JogadorDto>>> GetAmigosEmComum(JogadorId idJog, JogadorId idObj)
        {
            return await _serviceJog.GetAmigosEmComum(idJog, idObj);
        }

        // PUT: api/Jogadores/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJogador(JogadorId id, Jogador jogador)
        {
            if (id != jogador.Id)
            {
                return BadRequest();
            }

            _context.Entry(jogador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JogadorExists(id))
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

        // POST: api/Jogadores
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Jogador>> PostJogador(CreatingJogadorDto jogadorDto)
        {

            var jogador = await _serviceJog.AddAsync(jogadorDto);

            return CreatedAtAction("PostJogador", new { id = jogador.Id }, jogador);

            // _context.Jogadores.Add(jogador);
            // try
            // {
            //     await _context.SaveChangesAsync();
            // }
            // catch (DbUpdateException)
            // {
            //     if (JogadorExists(jogador.Id))
            //     {
            //         return Conflict();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }

            // return CreatedAtAction("GetJogador", new { id = jogador.Id }, jogador);
        }

        // DELETE: api/Jogadores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJogador(JogadorId id)
        {
            var jogador = await _context.Jogadores.FindAsync(id);
            if (jogador == null)
            {
                return NotFound();
            }

            _context.Jogadores.Remove(jogador);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool JogadorExists(JogadorId id)
        {
            return _context.Jogadores.Any(e => e.Id == id);
        }
    }
}
