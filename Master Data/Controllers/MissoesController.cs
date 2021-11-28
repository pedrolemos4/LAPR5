using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Missoes;
using DDDSample1.Infrastructure;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissoesController : ControllerBase
    {

        private readonly IMissaoService _service;

        public MissoesController(IMissaoService service)
        {
            _service = service;
        }

        // GET: api/Missoes
        [HttpGet]
        public async Task<ActionResult<List<MissaoDto>>> GetMissoes()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Missoes/5
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<MissaoDto>> GetMissao(Guid id)
        {
            var missao = await _service.GetByIdAsync(new MissaoId(id));

            if (missao == null)
            {
                return NotFound();
            }

            return missao;
        }


        // POST: api/Missoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MissaoDto>> PostMissao(CreatingMissaoDto missao)
        {
            try {

            var m = await _service.AddAsync(missao);

            return CreatedAtAction(nameof(GetMissao), new { id = m.Id }, m);
            }
            catch(BusinessRuleValidationException ex) {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // DELETE: api/Missoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MissaoDto>> DeleteMissao(Guid id) {
            try{
                var lig = await _service.DeleteAsync(new MissaoId(id));

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
