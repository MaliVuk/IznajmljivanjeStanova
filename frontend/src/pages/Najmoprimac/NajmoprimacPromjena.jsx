import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import NajmoprimacService from "../../services/NajmoprimacService";
import { useEffect, useState } from "react";

export default function NajmoprimacPromjena() {
    
    const navigate = useNavigate();
    const params = useParams()
    const[najmoprimac,setNajmoprimac] = useState({})


    async function ucitajNajmoprimac() {

        const odgovor = await NajmoprimacService.getBySifra(params.sifra)
        setNajmoprimac(odgovor)
    }

   useEffect(() => {
        ucitajNajmoprimac();
    }, []);

    async function promjena(sifra,najmoprimac) {
        const odgovor = await NajmoprimacService.promjena(sifra,najmoprimac);
        navigate(RouteNames.NAJMOPRIMAC_PREGLED);
    }

    function odradiSubmit(e) {
        e.preventDefault();

        let podaci = new FormData(e.target);

        promjena(
            params.sifra,
            {
                sifra: params.sifra,
           imeNaziv: podaci.get('imeNaziv'),
            kontakt: podaci.get('kontakt')
        });
    }

    return (
        <>
            <h2>Dodavanje najmoprimaca</h2>
            <Form onSubmit={odradiSubmit}>


                  <Form.Group controlId="imeNaziv">
                    <Form.Label>Ime ili naziv</Form.Label>
                    <Form.Control type="text" name="imeNaziv" required defaultValue={najmoprimac.imeNaziv}/>
                </Form.Group>

                <Form.Group controlId="kontakt">
                    <Form.Label>Kontakt</Form.Label>
                    <Form.Control type="text" name="kontakt" required defaultValue={najmoprimac.kontakt}/>
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