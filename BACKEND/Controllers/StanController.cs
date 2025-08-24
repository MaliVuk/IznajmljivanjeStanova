using BACKEND.Data;
using BACKEND.Models;
using BACKEND.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StanController : ControllerBase
    {
        private readonly EdunovaContext _context;
        private readonly IMapper _mapper;

        public StanController(EdunovaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/v1/Stan
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var stanovi = await _context.Stanovi
                .Include(s => s.NajmodavacNavigation)
                .ToListAsync();

            var stanoviRead = stanovi.Select(s => new StanDTORead
            {
                Sifra = s.Sifra,
                Adresa = s.Adresa,
                DatumUplateStanarine = s.DatumUplateStanarine,
                Najmodavac = s.Najmodavac,
                NajmodavacIme = $"{s.NajmodavacNavigation.Ime} {s.NajmodavacNavigation.Prezime}"
            }).ToList();

            return Ok(stanoviRead);
        }

        // GET: api/v1/Stan/{sifra}
        [HttpGet("{sifra:int}")]
        public async Task<IActionResult> GetById(int sifra)
        {
            var stan = await _context.Stanovi
                .Include(s => s.NajmodavacNavigation)
                .FirstOrDefaultAsync(s => s.Sifra == sifra);

            if (stan == null)
                return NotFound(new { poruka = "Stan nije pronađen." });

            var stanRead = new StanDTORead
            {
                Sifra = stan.Sifra,
                Adresa = stan.Adresa,
                DatumUplateStanarine = stan.DatumUplateStanarine,
                Najmodavac = stan.Najmodavac,
                NajmodavacIme = $"{stan.NajmodavacNavigation.Ime} {stan.NajmodavacNavigation.Prezime}"
            };

            return Ok(stanRead);
        }

        // POST: api/v1/Stan
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StanDTOCreate stanDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var stan = new Stan
                {
                    Adresa = stanDto.Adresa,
                    DatumUplateStanarine = stanDto.DatumUplateStanarine,
                    Najmodavac = stanDto.Najmodavac
                };

                await _context.Stanovi.AddAsync(stan);
                await _context.SaveChangesAsync();

                var stanRead = new StanDTORead
                {
                    Sifra = stan.Sifra,
                    Adresa = stan.Adresa,
                    DatumUplateStanarine = stan.DatumUplateStanarine,
                    Najmodavac = stan.Najmodavac,
                    NajmodavacIme = ""
                };

                return CreatedAtAction(nameof(GetById), new { sifra = stan.Sifra }, stanRead);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { poruka = "Greška pri spremanju stana.", detalji = e.Message });
            }
        }

        // PUT: api/v1/Stan/{sifra}
        [HttpPut("{sifra:int}")]
        public async Task<IActionResult> Put(int sifra, [FromBody] StanDTOCreate stanDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var stan = await _context.Stanovi.FindAsync(sifra);
            if (stan == null)
                return NotFound(new { poruka = "Stan nije pronađen." });

            try
            {
                stan.Adresa = stanDto.Adresa;
                stan.DatumUplateStanarine = stanDto.DatumUplateStanarine;
                stan.Najmodavac = stanDto.Najmodavac;

                _context.Entry(stan).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { poruka = "Stan ažuriran.", stan.Sifra });
            }
            catch (DbUpdateConcurrencyException e)
            {
                return StatusCode(500, new { poruka = "Greška pri ažuriranju stana.", detalji = e.Message });
            }
        }

        // DELETE: api/v1/Stan/{sifra}
        [HttpDelete("{sifra:int}")]
        public async Task<IActionResult> Delete(int sifra)
        {
            if (sifra < 1)
                return BadRequest(new { poruka = "Šifra mora biti veća od 0." });

            var stan = await _context.Stanovi.FindAsync(sifra);
            if (stan == null)
                return NotFound(new { poruka = "Stan nije pronađen." });

            try
            {
                _context.Stanovi.Remove(stan);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, new { poruka = "Greška pri brisanju stana.", detalji = e.Message });
            }
        }
    }
}