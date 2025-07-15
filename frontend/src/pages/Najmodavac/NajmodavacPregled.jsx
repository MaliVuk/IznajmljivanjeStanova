import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import NajmodavacService from "../../services/NajmodavacService";

export default function NajmodavacPregled() {
    const [najmodavci, setNajmodavci] = useState([]);

    async function dohvatiNajmodavce() {
        try {
            const odgovor = await NajmodavacService.get();
            console.log("Primljeni najmodavci:", odgovor);
            setNajmodavci(odgovor);
        } catch (e) {
            
        }
    }

    useEffect(() => {
        dohvatiNajmodavce();
    }, []);

    return (
        <>
            <h3>Tablični Pregled Najmodavaca</h3>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                    </tr>
                </thead>
                <tbody>
                    {najmodavci && najmodavci.length === 0 ? (
                        <tr>
                            <td colSpan={2}>Nema dostupnih najmodavaca.</td>
                        </tr>
                    ) : (
                        najmodavci.map((n, index) => (
                            <tr key={index}>
                                <td>{n.ime}</td>
                                <td>{n.prezime}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    );
}
