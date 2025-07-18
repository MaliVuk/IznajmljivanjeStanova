import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import NajmodavacService from "../../services/NajmodavacService";

export default function NajmodavacPromjena() {
    const navigate = useNavigate();
    async funcion ucitajNajmodavac() {


        
    }

    async function promjena(sifra,najmodavac) {
        const odgovor = await NajmodavacService.dodaj(sifra,najmodavac);
        navigate(RouteNames.NAJMODAVAC_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();

        let podaci = new FormData(e.target);

        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime')
        });
    }

    return (
        <>
            <h2>Dodavanje najmodavca</h2>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>

                <hr style={{ marginTop: '50px' }} />

                <Row>
                    <Col xs={6}>
                        <Link to={RouteNames.NAJMODAVAC_PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <Button variant="success" type="submit">
                            Dodaj najmodavca
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}