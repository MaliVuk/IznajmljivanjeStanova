using AutoMapper;
using BACKEND.Models;
using BACKEND.Models.DTO;
using System.Text.RegularExpressions;

namespace BACKEND.Mapping
{
    public class EdunovaMapping : Profile
    {
        public EdunovaMapping()
        {

            CreateMap<Stan, StanDTORead>()
               .ForCtorParam(
                   "NajmodavacImePrezime",
                   opt => opt.MapFrom(src => src.Najmodavac.Ime + " " + src.Najmodavac.Prezime)
               );

        }
    }
}
