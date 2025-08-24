import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import StanService from "../../services/StanService";

export default function StanDodaj() {
    const navigate = useNavigate();

    async function dodaj(stan) {
        const odgovor = await StanService.dodaj(stan);
        navigate(RouteNames.STAN_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();
console.log
        let podaci = new FormData(e.target);

        dodaj({
            Adresa: podaci.get('Adresa'),
            DatumUplateStanarine: podaci.get('DatumUplateStanarine'),
            Najmodavac: podaci.get('Najmodavac')
            
        });
        console.log
    }

    return (
        <>
            <h2>Dodavanje stanova</h2>
            <Form onSubmit={odradiSubmit}>

                    <Form.Group controlId="Adresa">
                    <Form.Label>adresa</Form.Label>
                    <Form.Control type="text" name="Adresa" required />
                </Form.Group>

                <Form.Group controlId="DatumUplateStanarine">
                    <Form.Label>DatumUplateStanarine</Form.Label>
                    <Form.Control type="date" name="DatumUplateStanarine" required/>
                </Form.Group>

                <Form.Group controlId="Najmodavac">
                    <Form.Label>Najmodavac</Form.Label>
                    <Form.Control type="text" name="Najmodavac" required/>
                </Form.Group>

                <hr style={{ marginTop: '50px' }} />

                <Row>
                    <Col xs={6}>
                        <Link to={RouteNames.STAN_PREGLED} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6}>
                        <Button variant="success" type="submit">
                            Dodaj stan
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}