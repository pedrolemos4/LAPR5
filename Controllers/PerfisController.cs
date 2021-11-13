using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Perfis;
using DDDSample1.Infrastructure;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfisController : ControllerBase
    {
        private readonly DDDSample1DbContext _context;
        private readonly IPerfilService _servicePerfil;

        public PerfisController(DDDSample1DbContext context, IPerfilService service)
        {
            _context = context;
            _servicePerfil = service;
        }

        // GET: api/Perfis
        [HttpGet]
        public async Task<ActionResult<List<PerfilDto>>> GetPerfis()
        {
            return await _servicePerfil.GetAllAsync();
        }

        // GET: api/Perfis/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PerfilDto>> GetPerfil(Guid id)
        {
            var perfil = await _servicePerfil.GetByIdAsync(new PerfilId(id));

            if (perfil == null)
            {
                return NotFound();
            }

            return perfil;
        }

        // GET: api/Perfis/6
        [HttpGet("{nome}")]
        public async Task<ActionResult<PerfilDto>> GetPerfilByNome(string nome)
        {
            var perfil = await _servicePerfil.getPerfilByNome(nome);

            if (perfil == null)
            {
                return NotFound();
            }

            return perfil;
        }

        // GET: api/Perfis/7
        [HttpGet("{email}")]
        public async Task<ActionResult<PerfilDto>> GetPerfilByEmail(string email)
        {
            var perfil = await _servicePerfil.GetPerfilByEmail(email);

            if (perfil == null)
            {
                return NotFound();
            }

            return perfil;
        }

        // GET: api/Perfis/8
        [HttpGet("{pais}")]
        public async Task<ActionResult<List<PerfilDto>>> GetPerfilByPais(string pais)
        {
            List<PerfilDto> listaPerfil = await _servicePerfil.GetPerfilByPais(pais);

            if (listaPerfil == null)
            {
                return NotFound();
            }

            return listaPerfil;
        }

        // PUT: api/Perfis/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerfil([FromRoute] Guid id, [FromBody] PerfilDto perfil)
        {
            if (id != perfil.Id)
            {
                return BadRequest();
            }

            try
            {
                var per = await _servicePerfil.UpdateAsync(perfil);
                if (per == null)
                {
                    return NotFound();
                }
                return Ok(per);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // PATCH: api/Perfis/5
        [HttpPut("{perfil}")]
        public async Task<IActionResult> PatchPerfil([FromRoute] Guid id, [FromBody] PerfilDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            try
            {
                var intro = await _servicePerfil.PatchEstadoHumor(dto);

                if (intro == null)
                {
                    return NotFound();
                }
                return Ok(intro);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        // POST: api/Perfis/8
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Perfil>> PostPerfil(CreatingPerfilDto perfilDto)
        {
            var perfil = await _servicePerfil.AddAsync(perfilDto);

            return CreatedAtAction("PostPerfil", new { id = perfil.Id }, perfil);
            // _context.Perfis.Add(perfil);
            // try
            // {
            //     await _context.SaveChangesAsync();
            // }
            // catch (DbUpdateException)
            // {
            //     if (PerfilExists(perfil.Id))
            //     {
            //         return Conflict();
            //     }
            //     else
            //     {
            //         throw;
            //     }
            // }

            // return CreatedAtAction("GetPerfil", new { id = perfil.Id }, perfil);
        }

        // DELETE: api/Perfis/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PerfilDto>> DeletePerfil(Guid id)
        {
            try
            {
                var perfil = await _servicePerfil.DeleteAsync(new PerfilId(id));
                if (perfil == null)
                {
                    return NotFound();
                }
                return Ok(perfil);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        private bool PerfilExists(PerfilId id)
        {
            return _context.Perfis.Any(e => e.Id == id);
        }
    }
}
