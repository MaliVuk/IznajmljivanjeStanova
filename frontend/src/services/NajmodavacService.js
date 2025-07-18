import { HttpService } from "./HttpService";

async function get() {
    const odgovor = await HttpService.get('/Najmodavac');
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

export default {
    get,
    dodaj,
    obrisi
};
  