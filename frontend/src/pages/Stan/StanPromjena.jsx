import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import StanService from "../../services/StanService";

export default function StanPromjena() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [stan, setStan] = useState({
    adresa: "",
    datumUplateStanarine: "",
    najmodavac: ""
  });

  // učitaj stan po id-u
  useEffect(() => {
    async function dohvatiStan() {
      const podaci = await StanService.getById(id);
      setStan({
        ...podaci,
        // uzmi samo dio yyyy-MM-dd, odreži T00:00:00
        datumUplateStanarine: podaci.datumUplateStanarine
          ? podaci.datumUplateStanarine.split("T")[0]
          : ""
      });
    }
    dohvatiStan();
  }, [id]);

  async function promjena(stan) {
    await StanService.promjena(id, stan);
    navigate(RouteNames.STAN_PREGLED);
  }

  function odradiSubmit(e) {
    e.preventDefault();
    let podaci = new FormData(e.target);

    promjena({
      adresa: podaci.get("Adresa"),
      datumUplateStanarine: podaci.get("DatumUplateStanarine"), // yyyy-MM-dd
      najmodavac: podaci.get("Najmodavac"),
    });
  }

  return (
    <>
      <h2>Promjena stana</h2>
      <Form onSubmit={odradiSubmit}>
        <Form.Group controlId="Adresa">
          <Form.Label>Adresa</Form.Label>
          <Form.Control
            type="text"
            name="Adresa"
            value={stan.adresa}
            onChange={(e) => setStan({ ...stan, adresa: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="DatumUplateStanarine">
          <Form.Label>Datum uplate stanarine</Form.Label>
          <Form.Control
            type="date"
            name="DatumUplateStanarine"
            value={stan.datumUplateStanarine}
            onChange={(e) =>
              setStan({ ...stan, datumUplateStanarine: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group controlId="Najmodavac">
          <Form.Label>Najmodavac</Form.Label>
          <Form.Control
            type="text"
            name="Najmodavac"
            value={stan.najmodavac}
            onChange={(e) => setStan({ ...stan, najmodavac: e.target.value })}
            required
          />
        </Form.Group>

        <hr style={{ marginTop: "50px" }} />

        <Row>
          <Col xs={6}>
            <Link to={RouteNames.STAN_PREGLED} className="btn btn-danger">
              Odustani
            </Link>
          </Col>
          <Col xs={6}>
            <Button variant="success" type="submit">
              Spremi promjene
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
