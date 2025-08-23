import { HttpService } from "./HttpService";

async function get() {
    const odgovor = await HttpService.get('/Najmoprimac');
    return odgovor.data;
}

async function getBySifra(sifra) {
    const odgovor = await HttpService.get(`/Najmoprimac/${sifra}`);
    return odgovor.data;
}

async function dodaj(najmoprimac) {
    const odgovor = await HttpService.post('/Najmoprimac', najmoprimac);
    return odgovor.data;
}

async function obrisi(sifra) {
    const odgovor = await HttpService.delete(`/Najmoprimac/${sifra}`);
    return odgovor.data;
}

async function promjena(sifra,najmoprimac) {
    const odgovor = await HttpService.put(`/Najmoprimac/${sifra}`,najmoprimac);
    return odgovor.data;
}

export default {
    get,
    getBySifra,
    dodaj,
    obrisi,
    promjena
};
  