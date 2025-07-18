import { HttpService } from "./HttpService";

async function get() {
    const odgovor = await HttpService.get('/Najmodavac');
    return odgovor.data;
}

async function getBySifra(sifra) {
    const odgovor = await HttpService.get(`/Najmodavac/${sifra}`);
    return odgovor.data;
}

async function dodaj(najmodavac) {
    const odgovor = await HttpService.post('/Najmodavac', najmodavac);
    return odgovor.data;
}

async function obrisi(sifra) {
    const odgovor = await HttpService.delete(`/Najmodavac/${sifra}`);
    return odgovor.data;
}

async function promjena(sifra,najmodavac) {
    const odgovor = await HttpService.put(`/Najmodavac/${sifra}`,najmodavac);
    return odgovor.data;
}

export default {
    get,
    getBySifra,
    dodaj,
    obrisi,
    promjena
};
  