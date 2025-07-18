import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import NajmodavacService from "../../services/NajmodavacService";
import { Link } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function NajmodavacPregled() {
    const [najmodavci, setNajmodavci] = useState([]);

    async function dohvatiNajmodavce() {
        const odgovor =  NajmodavacService.get();
        setNajmodavci(odgovor);
    }

    useEffect(() => {
        dohvatiNajmodavce();
    }, []);

    function obrisi(sifra) {
        if (!window.confirm("Sigurno obrisati?")) return;
        brisanje(sifra);
    }

    async function brisanje(sifra) {
        await NajmodavacService.obrisi(sifra);
        dohvatiNajmodavce();
    }

    return (
        <>
            <h3>Pregled najmodavaca</h3>

            <Link className="btn btn-success mb-3" to={RouteNames.NAJMODAVAC_NOVI}>
                Dodaj novog najmodavca
            </Link>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {najmodavci.length === 0 ? (
                        <tr>
                            <td colSpan={3}>Nema najmodavaca.</td>
                        </tr>
                    ) : (
                        najmodavci.map((n, index) => (
                            <tr key={index}>
                                <td>{n.ime}</td>
                                <td>{n.prezime}</td>
                                <td>
                                      <Button variant="danger" onClick={() => obrisi(n.sifra)}>
                                        Obriši
                                    </Button>
                                    &nbsp
                                    <Button promjena="danger" onClick={() => obrisi(n.sifra)}>
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


