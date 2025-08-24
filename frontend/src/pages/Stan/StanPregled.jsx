import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import StanService from "../../services/StanService";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function StanPregled() {
    const [stanovi, setStanovi] = useState([]);
    const navigate=useNavigate()

    async function dohvatiStanove() {
        const odgovor =  await StanService.get();
        setStanovi(odgovor);
    }

    useEffect(() => {
        dohvatiStanove();
    }, []);

    function obrisi(sifra) {
        if (!window.confirm("Sigurno obrisati?")) return;
        brisanje(sifra);
    }

    async function brisanje(sifra) {
        await StanService.obrisi(sifra);
        dohvatiStanove();
    }

    return (
        <>
            <h3>Pregled stanova</h3>

            <Link className="btn btn-success mb-3" to={RouteNames.STAN_NOVI}>
                Dodaj novog stana
            </Link>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Adresa</th>
                        <th>DatumUplateStanarine</th>
                        <th>Najmodavac</th>
                    </tr>
                </thead>
                <tbody>
                    {stanovi.length === 0 ? (
                        <tr>
                            <td colSpan={3}>Nema stanova.</td>
                        </tr>
                    ) : (
                        stanovi.map((n, index) => (
                            <tr key={index}>
                                <td>{n.adresa}</td>
                                <td>{n.datumuplatestanarine}</td>
                                <td>
                                      <Button  onClick={() =>navigate(`/Stanovi/${n.sifra}`)}>
                                        Promjena
                                    </Button>
                                    &nbsp;
                                    <Button variant="danger" onClick={() => obrisi(n.sifra)}>
                                        Obriši
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    );
}


