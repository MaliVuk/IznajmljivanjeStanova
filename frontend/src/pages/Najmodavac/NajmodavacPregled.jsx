import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import NajmodavacService from "../../services/NajmodavacService";

export default function NajmodavacPregled() {

    const [najmodavci, setNajmodavci] = useState([]);

    async function dohvatiNajmodavce() {
        const odgovor = await NajmodavacService.get();
        setNajmodavci(odgovor);
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
                    {najmodavci && najmodavci.map((n, index) => (
                        <tr key={index}>
                            <td>{n.ime}</td>
                            <td>{n.prezime}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}