import { HttpService } from "./HttpService";

async function get() {
    try {
        const odgovor = await HttpService.get('/Najmodavac');
        return odgovor.data;
    } catch (e) {
        console.error("Greška pri dohvaćanju najmodavaca:", e);
        throw e; // ili: return []; ako želiš samo prazan niz
    }
}

export default {
    get
};