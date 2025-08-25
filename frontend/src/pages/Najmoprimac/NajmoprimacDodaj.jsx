import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import NajmoprimacService from "../../services/NajmoprimacService";

export default function NajmoprimacDodaj() {
    const navigate = useNavigate();

    async function dodaj(najmoprimac) {
        const odgovor = await NajmoprimacService.dodaj(najmoprimac);
        navigate(RouteNames.NAJMOPRIMAC_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();

        let podaci = new FormData(e.target);

        dodaj({
            ime_ili_naziv: podaci.get('ime_ili_naziv'),
            kontakt: podaci.get('kontakt')
        });
    }

    return (
        <>
            <h2>Dodavanje najmoprimac</h2>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="ime_ili_naziv">
                    <Form.Label>ime_ili_naziv</Form.Label>
                    <Form.Control type="text" name="ime_ili_naziv" required />
                </Form.Group>

                <Form.Group controlId="kontakt">
                    <Form.Label>Kontakt</Form.Label>
                    <Form.Control type="text" name="kontakt" required />
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
                            Dodaj najmoprimac
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}