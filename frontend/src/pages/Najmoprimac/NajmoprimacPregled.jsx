import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import NajmoprimacService from "../../services/NajmoprimacService";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function NajmoprimacPregled() {
    const [najmoprimci, setNajmoprimci] = useState([]);
    const navigate=useNavigate()

    async function dohvatiNajmoprimce() {
        const odgovor =  await NajmoprimacService.get();
        setNajmoprimci(odgovor);
    }

    useEffect(() => {
        dohvatiNajmoprimce();
    }, []);

    function obrisi(sifra) {
        if (!window.confirm("Sigurno obrisati?")) return;
        brisanje(sifra);
    }

    async function brisanje(sifra) {
        await NajmoprimacService.obrisi(sifra);
        dohvatiNajmoprimce();
    }

    return (
        <>
            <h3>Pregled najmoprimaca</h3>

            <Link className="btn btn-success mb-3" to={RouteNames.NAJMOPRIMAC_NOVI}>
                Dodaj novog najmoprimca
            </Link>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime ili naziv</th>
                        <th>Kontakt</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {najmoprimci.length === 0 ? (
                        <tr>
                            <td colSpan={3}>Nema najmoprimaca.</td>
                        </tr>
                    ) : (
                        najmoprimci.map((n, index) => (
                            <tr key={index}>
                                <td>{n.imeNaziv}</td>
                                <td>{n.kontakt}</td>
                                <td>
                                      <Button  onClick={() =>navigate(`/Najmoprimci/${n.sifra}`)}>
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


