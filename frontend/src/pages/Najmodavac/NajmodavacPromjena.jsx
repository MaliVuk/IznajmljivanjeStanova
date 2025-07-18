import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NajmodavacService from "../../services/NajmodavacService";
import { useEffect, useState } from "react";

export default function NajmodavacPromjena() {
    
    const navigate = useNavigate();
    const params = useParams()
    const[najmodavac,setNajmodavac] = useState({})


    async function ucitajNajmodavac() {

        const odgovor = await NajmodavacService.getBySifra(params.sifra)
        setNajmodavac(odgovor)
    }

   useEffect(() => {
        ucitajNajmodavac();
    }, []);

    async function promjena(sifra,najmodavac) {
        const odgovor = await NajmodavacService.promjena(sifra,najmodavac);
        navigate(RouteNames.NAJMODAVAC_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();

        let podaci = new FormData(e.target);

        promjena(
            params.sifra,
            {
                sifra: params.sifra,
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
                    <Form.Control type="text" name="ime" required defaultValue={najmodavac.ime}/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required defaultValue={najmodavac.prezime}/>
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
                            Promjeni najmodavca
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}