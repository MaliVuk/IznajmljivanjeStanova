
using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;

namespace EdunovaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NajmoprimacController(EdunovaContext context) : ControllerBase
    {
        private readonly EdunovaContext _context = context;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var najmodavci = await _context.Najmoprimci.ToListAsync();
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

            var najmoprimac = await _context.Najmodavci.FindAsync(sifra);
            if (najmoprimac == null)
                return NotFound(new { poruka = "Najmoprimac nije pronađen." });

            return Ok(najmoprimac);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Najmoprimac najmoprimac)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _context.Najmoprimci.AddAsync(najmoprimac);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetById), new { sifra = najmoprimac.Sifra }, najmoprimac);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { poruka = "Greška pri spremanju najmoprimca.", detalji = e.Message });
            }
        }

        [HttpPut("{sifra:int}")]
        public async Task<IActionResult> Put(int sifra, [FromBody] Najmodavac najmoprimac)
        {
           
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var postoji = await _context.Najmoprimci.AnyAsync(n => n.Sifra == sifra);
            if (!postoji)
                return NotFound(new { poruka = "Najmoprimac nije pronađen." });

            try
            {
                _context.Entry(najmoprimac).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return Ok(najmoprimac);
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

            var najmoprimac = await _context.Najmodavci.FindAsync(sifra);
            if (najmoprimac == null)
                return NotFound(new { poruka = "Najmoprimac nije pronađen." });

            try
            {
                _context.Najmodavci.Remove(najmoprimac);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new { poruka = "Greška pri brisanju najmoprimca.", detalji = e.Message });
            }
        }
    }


}


