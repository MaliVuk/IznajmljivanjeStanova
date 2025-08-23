
using BACKEND.Data;
using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using System.Drawing;
using AutoMapper;
using BACKEND.Models.DTO;

namespace EdunovaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StanController(EdunovaContext context, IMapper mapper) : ControllerBase
    {
        private readonly EdunovaContext _context = context;

        protected readonly IMapper _mapper = mapper;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var stanovi = await _context.Stanovi.Include(x=>x.Najmodavac).ToListAsync();
                return Ok(_mapper.Map<List<StanDTORead>>(stanovi));
            }
            catch (Exception e)
            {
                return StatusCode(500, new { poruka = "Greška pri dohvaćanju podataka.", detalji = e.Message });
            }
        }

    
    }


}


