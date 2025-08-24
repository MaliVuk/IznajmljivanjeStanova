using AutoMapper;
using BACKEND.Models;
using BACKEND.Models.DTO;

namespace BACKEND.Mapping
{
    public class EdunovaMapping : Profile
    {
        public EdunovaMapping()
        {
            CreateMap<Stan, StanDTORead>()
                .ForMember(dest => dest.NajmodavacIme, opt => opt.MapFrom(src => src.NajmodavacNavigation.Ime))
                .ForMember(dest => dest.NajmodavacPrezime, opt => opt.MapFrom(src => src.NajmodavacNavigation.Prezime));

            // Ako koristiš DTO za Create
            CreateMap<StanDTOCreate, Stan>();
        }
    }
}
