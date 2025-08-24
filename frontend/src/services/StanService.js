import { HttpService } from "./HttpService";

async function get() {
    const odgovor = await HttpService.get('/Stan');
    return odgovor.data;
}

async function getBySifra(sifra) {
    const odgovor = await HttpService.get(`/Stan/${sifra}`);
    return odgovor.data;
}

async function dodaj(stan) {
    const odgovor = await HttpService.post('/Stan', stan);
    return odgovor.data;
}

async function obrisi(sifra) {
    const odgovor = await HttpService.delete(`/Stan/${sifra}`);
    return odgovor.data;
}

async function promjena(sifra,stan) {
    const odgovor = await HttpService.put(`/Stan/${sifra}`,stan);
    return odgovor.data;
}

export default {
    get,
    getBySifra,
    dodaj,
    obrisi,
    promjena
};