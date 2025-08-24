using BACKEND.Data;
using BACKEND.Models;
using BACKEND.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NajmoprimacController : ControllerBase
    {
        private readonly EdunovaContext _context;

        public NajmoprimacController(EdunovaContext context)
        {
            _context = context;
        }

        // GET api/v1/najmoprimac
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var najmoprimci = await _context.Najmoprimci
                .Select(n => new NajmoprimacDTORead
                {
                    Sifra = n.Sifra,
                    Ime_ili_Naziv = n.Ime_ili_Naziv, // koristi polje iz modela
                    Kontakt = n.Kontakt
                })
                .ToListAsync();

            return Ok(najmoprimci);
        }

        // POST api/v1/najmoprimac
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NajmoprimacDTOCreate dto)
        {
            var n = new Najmoprimac
            {
                Ime_ili_Naziv = dto.Ime_ili_Naziv,
                Kontakt = dto.Kontakt
            };

            _context.Najmoprimci.Add(n);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { sifra = n.Sifra }, n);
        }

        // DELETE api/v1/najmoprimac/5
        [HttpDelete("{sifra:int}")]
        public async Task<IActionResult> Delete(int sifra)
        {
            var n = await _context.Najmoprimci.FindAsync(sifra);
            if (n == null) return NotFound();

            _context.Najmoprimci.Remove(n);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}