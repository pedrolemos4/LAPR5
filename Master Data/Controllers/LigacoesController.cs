using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Ligacoes;
using DDDSample1.Infrastructure;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigacoesController : ControllerBase
    {
        private readonly ILigacaoService _service;

        public LigacoesController(ILigacaoService service)
        {
            _service = service;
        }

        // GET: api/Ligacoes
        [HttpGet]
        public async Task<ActionResult<List<LigacaoDto>>> GetLigacoes()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Ligacoes/5
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<LigacaoDto>> GetLigacao(Guid id)
        {
            var ligacao = await _service.GetByIdAsync(new LigacaoId(id));

            if (ligacao == null) {
                return NotFound();
            }

            return ligacao;
        }
        
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<List<LigacaoDto>>> GetLigacaoPendente(Guid id)
        {
            return await _service.GetLigacaoPendente(new JogadorId(id));
        }

        // PUT: api/Ligacoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<LigacaoDto>> PutLigacao([FromRoute] Guid id, [FromBody] LigacaoDto ligacao)
        {
            if (id != ligacao.Id) {
                return BadRequest();
            }

            try {
                var cat = await _service.UpdateAsync(ligacao);
                
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

        // PATCH: api/Ligacoes/5
        [HttpPut("{ligacao}")]
        public async Task<ActionResult<LigacaoDto>> PatchLigacao(Guid id, LigacaoDto dto)
        {
            if (id != dto.Id)
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
            try {

            var ligacao = await _service.AddAsync(ligacaoDto);

            return CreatedAtAction(nameof(GetLigacao), new { id = ligacao.Id }, ligacao);
            }
            catch(BusinessRuleValidationException ex) {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // DELETE: api/Ligacoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<LigacaoDto>> DeleteLigacao(Guid id)
        {
            try
            {
                var lig = await _service.DeleteAsync(new LigacaoId(id));

                if (lig == null)
                {
                    return NotFound();
                }

                return Ok(lig);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}
