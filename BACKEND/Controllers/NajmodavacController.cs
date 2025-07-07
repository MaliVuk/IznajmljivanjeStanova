using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EdunovaApp.Controllers
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
            try
            {
                var najmodavci = await _context.Najmodavci.ToListAsync();
                return Ok(najmodavci);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { poruka = "Greška pri dohvaćanju podataka.", detalji = e.Message });
            }
        }

        [HttpGet("{sifra:int}")]
        public async Task<IActionResult> GetById(int sifra)
        {
            if (sifra < 1)
                return BadRequest(new { poruka = "Šifra mora biti veća od 0." });

            var najmodavac = await _context.Najmodavci.FindAsync(sifra);
            if (najmodavac == null)
                return NotFound(new { poruka = "Najmodavac nije pronađen." });

            return Ok(najmodavac);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Najmodavac najmodavac)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _context.Najmodavci.AddAsync(najmodavac);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { sifra = najmodavac.Sifra }, najmodavac);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { poruka = "Greška pri spremanju najmodavca.", detalji = e.Message });
            }
        }

        [HttpPut("{sifra:int}")]
        public async Task<IActionResult> Put(int sifra, [FromBody] Najmodavac najmodavac)
        {
            if (sifra != najmodavac.Sifra)
                return BadRequest(new { poruka = "Šifra iz URL-a ne odgovara šifri iz tijela zahtjeva." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var postoji = await _context.Najmodavci.AnyAsync(n => n.Sifra == sifra);
            if (!postoji)
                return NotFound(new { poruka = "Najmodavac nije pronađen." });

            try
            {
                _context.Entry(najmodavac).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(najmodavac);
            }
            catch (DbUpdateConcurrencyException e)
            {
                return StatusCode(500, new { poruka = "Greška pri ažuriranju najmodavca.", detalji = e.Message });
            }
        }

        [HttpDelete("{sifra:int}")]
        public async Task<IActionResult> Delete(int sifra)
        {
            if (sifra < 1)
                return BadRequest(new { poruka = "Šifra mora biti veća od 0." });

            var najmodavac = await _context.Najmodavci.FindAsync(sifra);
            if (najmodavac == null)
                return NotFound(new { poruka = "Najmodavac nije pronađen." });

            try
            {
                _context.Najmodavci.Remove(najmodavac);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new { poruka = "Greška pri brisanju najmodavca.", detalji = e.Message });
            }
        }
    }
}