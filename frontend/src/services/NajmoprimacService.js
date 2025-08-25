import { HttpService } from "./HttpService";

const NajmoprimacService = {
    get: async () => {
        const odgovor = await HttpService.get('/Najmoprimac');
        return odgovor.data;
    },

    getBySifra: async (sifra) => {
        const odgovor = await HttpService.get(`/Najmoprimac/${sifra}`);
        return odgovor.data;
    },

    dodaj: async (najmoprimac) => {
        const odgovor = await HttpService.post('/Najmoprimac', najmoprimac);
        return odgovor.data;
    },

    obrisi: async (sifra) => {
        const odgovor = await HttpService.delete(`/Najmoprimac/${sifra}`);
        return odgovor.data;
    },

    promjena: async (sifra, najmoprimac) => {
        const odgovor = await HttpService.put(`/Najmoprimac/${sifra}`, najmoprimac);
        return odgovor.data;
    }
};

export default NajmoprimacService;