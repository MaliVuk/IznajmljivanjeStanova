using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NajmodavacController : ControllerBase
    {
        private readonly EdunovaContext _context;

        public NajmodavacController(EdunovaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var najmodavci = await _context.Najmodavci.ToListAsync();
            return Ok(najmodavci);
        }

        [HttpGet("{sifra:int}")]
        public async Task<IActionResult> GetById(int sifra)
        {
            var najmodavac = await _context.Najmodavci.FindAsync(sifra);
            if (najmodavac == null)
                return NotFound(new { poruka = "Najmodavac nije pronađen." });

            return Ok(najmodavac);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Najmodavac najmodavac)
        {
            await _context.Najmodavci.AddAsync(najmodavac);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { sifra = najmodavac.Sifra }, najmodavac);
        }

        [HttpPut("{sifra:int}")]
        public async Task<IActionResult> Put(int sifra, [FromBody] Najmodavac najmodavac)
        {
            if (sifra != najmodavac.Sifra)
                return BadRequest(new { poruka = "Šifre se ne podudaraju." });

            _context.Entry(najmodavac).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(najmodavac);
        }

        [HttpDelete("{sifra:int}")]
        public async Task<IActionResult> Delete(int sifra)
        {
            var najmodavac = await _context.Najmodavci.FindAsync(sifra);
            if (najmodavac == null)
                return NotFound(new { poruka = "Najmodavac nije pronađen." });

            _context.Najmodavci.Remove(najmodavac);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}