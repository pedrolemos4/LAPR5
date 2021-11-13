using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Relacoes;
using DDDSample1.Infrastructure;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelacoesController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;

        private readonly IRelacaoService _service;

        public RelacoesController(DDDSample1DbContext context, IRelacaoService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/Relacoes
        [HttpGet]
        public async Task<ActionResult<List<RelacaoDto>>> GetRelacoes()
        {
            return await _service.ToListAsync();
        }

        // GET: api/Relacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RelacaoDto>> GetRelacao(Guid id)
        {
            var relacao = await _service.GetByIdAsync(new RelacaoId(id));

            if (relacao == null)
            {
                return NotFound();
            }

            return relacao;
        }

        public async Task<ActionResult<List<RelacaoDto>>> GetRelacoesDoJogador(Guid jog)
        {
            var relacao = await this._service.GetRelacoesDoJogador(new JogadorId(jog));

            if (relacao == null)
            {
                return NotFound();
            }

            return relacao;
        }

        // PUT: api/Relacoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<RelacaoDto>> PutRelacao([FromRoute] Guid id, [FromBody] RelacaoDto relacao)
        {
            if (id != relacao.Id)
            {
                return BadRequest();
            }

            try
            {
                var rel = await _service.UpdateAsync(relacao);
                if (rel == null)
                {
                    return NotFound();
                }
                return Ok(rel);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PATCH: api/Relacoes/6
        [HttpPut("{relacao}")]
        public async Task<ActionResult<RelacaoDto>> PatchRelacao([FromRoute] Guid id, [FromBody] RelacaoDto dto)
        {

            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var rel = await _service.PatchRelacaoTagsForca(dto);

                if (rel == null)
                {
                    return NotFound();
                }
                return Ok(rel);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST: api/Relacoes/6
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RelacaoDto>> PostRelacao(CreatingRelacaoDto relacaoDto)
        {
            try
            {
                var relacao = await _service.AddAsync(relacaoDto);

                return CreatedAtAction(nameof(GetRelacao), new { id = relacao.Id }, relacao);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // DELETE: api/Relacoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RelacaoDto>> DeleteRelacao(Guid id)
        {
            try
            {
                var relacao = await _service.DeleteAsync(new RelacaoId(id));

                if (relacao == null)
                {
                    return NotFound();
                }
                return Ok(relacao);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        // GET: api/Jogadores/5
        [HttpGet("{id}")]
        public async Task<List<RelacaoDto>> GetRedeJogador(Guid id, int n)
        {
            return await _service.GetRedeJogador(new JogadorId(id), n);
        }

        /*private bool RelacaoExists(RelacaoId id)
        {
            return _context.Relacoes.Any(e => e.Id == id);
        }*/
    }
}
