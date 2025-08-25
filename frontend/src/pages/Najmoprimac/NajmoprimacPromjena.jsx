import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NajmoprimacService from "../../services/NajmoprimacService";
import { useEffect, useState } from "react";

export default function NajmoprimacPromjena() {
    const navigate = useNavigate();
    const params = useParams();
    
    const [najmoprimac, setNajmoprimac] = useState({
        ime_ili_naziv: "",
        Kontakt: ""
    });

    // učitaj podatke jednog najmoprimca
    async function ucitajNajmoprimac() {
        try {
            const odgovor = await NajmoprimacService.getBySifra(params.sifra);
            setNajmoprimac(odgovor);
        } catch (error) {
            console.error("Greška pri učitavanju:", error);
        }
    }

    useEffect(() => {
        ucitajNajmoprimac();
    }, []);

    // funkcija za promjenu putem PUT
    async function promjena(sifra, najmoprimac) {
        try {
            await NajmoprimacService.promjena(sifra, najmoprimac);
            navigate(RouteNames.NAJMOPRIMAC_PREGLED);
        } catch (error) {
            console.error("Greška pri promjeni:", error);
        }
    }

    function odradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target);

        promjena(params.sifra, {
            ime_ili_naziv: podaci.get('ime_ili_naziv'),
            Kontakt: podaci.get('kontakt')
        });
    }

    return (
        <>
            <h2>Promjena najmoprimca</h2>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime_ili_naziv">
                    <Form.Label>Ime ili naziv</Form.Label>
                    <Form.Control
                        type="text"
                        name="ime_ili_naziv"
                        required
                        defaultValue={najmoprimac.ime_ili_naziv}
                    />
                </Form.Group>

                <Form.Group controlId="kontakt">
                    <Form.Label>Kontakt</Form.Label>
                    <Form.Control
                        type="text"
                        name="kontakt"
                        required
                        defaultValue={najmoprimac.Kontakt}
                    />
                </Form.Group>

                <hr style={{ marginTop: '50px' }} />

                <Row>
                    <Col xs={6}>
                        <Link to={RouteNames.NAJMOPRIMAC_PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <Button variant="success" type="submit">
                            Promjeni najmoprimca
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}