import React, { useState } from "react";
import { Card, Button, Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import NavBar from "../appNavBar/AppNavBar";
import Ngirwi_Logo from './Ngirwi_Transparent.png';

export default function Home() {
    // const isLoading = useState(true);
    // const isAuthenticated = useState(false);
    // const user = useState(undefined);
    const { added } = useParams();

    console.log(added);

    const tiles = (

        <>
            <Container fluid>
                
                <Row>
                    <Col style={{ padding: "10rem" }}>
                        <Card
                            //bg="info"
                            // key="primary"
                            text="white"
                            style={{ width: '25rem', display: "flex", backgroundColor: "cadetblue", rightPadding: "100px", padding: "1rem", borderRadius: "12px" }}
                            className="text-left"
                        >
                            {/* <Card.Header>Header</Card.Header> */}
                            <Card.Body>
                                <Card.Title> Bienvenue docteur test </Card.Title>
                                <Card.Text>
                                    Ngirwi Médical est une application pour la numérisation des dossiers médicaux, développé par la société NGIRWI S.A.R.L
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col style={{ marginTop: "160px" }}>
                        <Card
                            bg="white"
                            // key="primary"
                            text="black"
                            style={{ width: '25rem', display: "flex", marginTop: "170px", borderRadius: "10%" }}
                            className="text-center"
                        >
                            <Card.Header style={{ color: "white", backgroundColor: "cadetblue", borderRadius: "12px", padding: "1rem" }}>Géstion des patients</Card.Header>
                            <Card.Body>
                                {/* <Card.Title style={{color:"cadetblue"}}>Gestion des patients</Card.Title> */}
                                <Card.Text style={{ backgroundColor: "white" }}>
                                    <Button variant="primary" href="add-patient" style={{ backgroundColor: "cadetblue", leftPadding: "10px", borderRadius: "12px" }}>Enregistrer patient</Button><br></br><br></br>
                                    <Button variant="primary" href="patients" style={{ leftPadding: "10px", rightPadding: "20px", backgroundColor: "cadetblue", borderRadius: "12px" }}>Voir liste des patients</Button><br></br><br></br>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '25rem', display: "flex", backgroundColor: "aliceblue", border: "none" }}>
                            <Card.Img variant="bottom" src={Ngirwi_Logo} style={{ maxWidth: "90%", backgroundColor: "aliceblue" }} />
                        </Card>
                    </Col>
                    {/* <Col>
                        <Card
                            bg="white"
                            // key="primary"
                            text="black"
                            style={{ width: '18rem', display: "flex", marginTop: "400px", leftPadding: "100px", borderRadius:"10%" }}
                            className="text-center"
                        >
                            <Card.Header style={{ color: "white", backgroundColor:"cadetblue", borderRadius: "12px", padding:"1rem"}}>Consultations</Card.Header>
                            <Card.Body>
                                <Card.Text style={{ backgroundColor: "white" }}>
                                    <Button variant="primary" href='cons' style={{ backgroundColor: "cadetblue", leftPadding: "10px", borderRadius: "12px" }}>Consultation</Button><br></br><br></br>
                                    <Button variant="primary" style={{ backgroundColor: "cadetblue", leftPadding: "100px", borderRadius: "12px" }}>Liste Consultation</Button><br></br><br></br>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col> */}
                </Row>


            </Container>

            {/* <Container>
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <Card
                            bg="info"
                            // key="primary"
                            text="white"
                            style={{ width: '18rem', display: "flex", rightPadding: "100px" }}
                            className="mb-2"
                        >
                            <Card.Body>
                                <Card.Title> Bienvenue docteur test </Card.Title>
                                <Card.Text>
                                    Ngirwi Médical est une application pour la numérisation des dossiers médicaux, développé par la société NGIRWI S.A.R.L
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </Container>
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="card">
                            <Card className="text-center">
                                <Card.Header> <b>Patients</b> </Card.Header>
                                <Card.Body>
                                    <Card.Title>Gestion des patients</Card.Title>
                                    <Card.Text>
                                        Toutes les operations relatives aux informations patients.
                                    </Card.Text>
                                    <Button variant="primary" href="add-patient">Enregistrer patient</Button><br></br><br></br>
                                    <Button variant="primary" href="patients" style={{ leftPadding: "10px", rightPadding: "20px" }}>Liste patients</Button><br></br><br></br>
                                    <Button variant="primary">Action 3</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-4">
                        <div class="card">
                            <Card className="text-center">
                                <Card.Header> <b>Consultation</b> </Card.Header>
                                <Card.Body>
                                    <Card.Title>Quick access</Card.Title>
                                    <Card.Text>
                                        Des raccourcis pour faciliter la tache.
                                        Add routes later...
                                        <br></br>
                                    </Card.Text>
                                    <Button variant="primary" href='cons'>Consultation</Button><br></br><br></br>
                                    <Button variant="primary">Liste Consultation</Button><br></br><br></br>
                                    <Button variant="primary" href="demands">Action 3</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );

    return (
        <Container fluid className="all">
            <NavBar /><br></br>
            {tiles}
        </Container>
    );

}