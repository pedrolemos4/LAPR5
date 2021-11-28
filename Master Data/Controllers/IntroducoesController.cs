using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DDDSample1.Domain.Introducoes;
using DDDSample1.Domain.Jogadores;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntroducoesController : ControllerBase
    {
        private readonly IIntroducaoService _serviceIntro;

        public IntroducoesController(IIntroducaoService serviceIntro)
        {
            _serviceIntro = serviceIntro;
        }

        // GET: api/Introducoes
        [HttpGet]
        public async Task<ActionResult<List<IntroducaoDto>>> GetIntroducoes()
        {
            return await _serviceIntro.GetAllAsync();
        }

        // GET: api/Introducoes/5
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<IntroducaoDto>> GetIntroducao(Guid id)
        {
            var introducao = await _serviceIntro.GetByIdAsync(new IntroducaoId(id));

            if (introducao == null)
            {
                return NotFound();
            }

            return introducao;
        }

        // GET: api/Introducoes/2
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<List<IntroducaoDto>>> GetIntroducoesPorAprovar(Guid id)
        {
            return await _serviceIntro.GetIntroducoesPorAprovar(new JogadorId(id));
        }

        // GET: api/Introducoes/2
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<ActionResult<List<IntroducaoDto>>> GetIntroducoesAprovarRejeitar(Guid id)
        {
            return await _serviceIntro.GetIntroducoesAprovarRejeitar(new JogadorId(id));
        }

        // PUT: api/Introducoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<IntroducaoDto>> PutIntroducao([FromBody] Guid id, [FromRoute] IntroducaoDto introducao)
        {
            if (id != introducao.Id)
            {
                return BadRequest();
            }

            try
            {
                var cat = await _serviceIntro.UpdateAsync(introducao);
                
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

        // PATCH: api/Introducoes/5
        [HttpPatch("{introducao}")]
        public async Task<ActionResult<IntroducaoDto>> PatchIntroducao([FromRoute] Guid id, [FromBody] IntroducaoDto dto) {
            if (id != dto.Id)  {
                return BadRequest();
            }

            try {
                var intro = await _serviceIntro.PatchEstadoIntroducao(dto);

                if (intro == null) {
                    return NotFound();
                }
                return Ok(intro);
            }
            catch (BusinessRuleValidationException ex)  {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // POST: api/Introducoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IntroducaoDto>> PostIntroducao(CreatingIntroducaoDto introducao) {
            try {
                var intro = await _serviceIntro.AddAsync(introducao);

                return CreatedAtAction(nameof(GetIntroducao), new { id = intro.Id }, intro);
            }
            catch(BusinessRuleValidationException ex) {
                return BadRequest(new {Message = ex.Message});
            }
        }


        // DELETE: api/Introducoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IntroducaoDto>> DeleteIntroducao(Guid id)
        {
            try
            {
                var intro = await _serviceIntro.DeleteAsync(new IntroducaoId(id));

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

    }
}
