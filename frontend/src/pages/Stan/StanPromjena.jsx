import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import StanService from "../../services/StanService";
import { useEffect, useState } from "react";

export default function StanPromjena() {
    
    const navigate = useNavigate();
    const params = useParams();
    const [stan, setStan] = useState({});

    async function ucitajStan() {
        const odgovor = await StanService.getBySifra(params.sifra);
        setStan(odgovor);
    }

    useEffect(() => {
        ucitajStan();
    }, []);

    async function promjena(sifra, stan) {
        await StanService.promjena(sifra, stan);
        navigate(RouteNames.STAN_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();
        let podaci = new FormData(e.target);

        promjena(
            params.sifra,
            {
                sifra: params.sifra,
                adresa: podaci.get('adresa'),
                datumUplateStanarine: podaci.get('datumUplateStanarine'),
                najmodavac: podaci.get('najmodavac')
            }
        );
    }

    return (
        <>
            <h2>Promjena stana</h2>
            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="adresa" 
                        required 
                        defaultValue={stan.adresa} 
                    />
                </Form.Group>

                <Form.Group controlId="datumUplateStanarine">
                    <Form.Label>Datum uplate stanarine</Form.Label>
                    <Form.Control 
                        type="date" 
                        name="datumUplateStanarine" 
                        required 
                        defaultValue={stan.datumUplateStanarine} 
                    />
                </Form.Group>

                <Form.Group controlId="najmodavac">
                    <Form.Label>Najmodavac</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="najmodavac" 
                        required 
                        defaultValue={stan.najmodavac} 
                    />
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
                            Promijeni stan
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}
