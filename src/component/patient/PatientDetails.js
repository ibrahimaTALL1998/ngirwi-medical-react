import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Card } from "react-bootstrap";
import PatientService from "../../Services/PatientService";
import { useNavigate, Link, useParams } from "react-router-dom";
import AppNavBar from "../appNavBar/AppNavBar";
import { Button } from "reactstrap";

export default function PatientDetails() {

    const [dateAjout, setDateAjout] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [cni, setCni] = useState('')
    const [phone, setPhone] = useState('')
    const [job, setJob] = useState('')
    const [maritalStatus, SetMaritalStatus] = useState('')
    const [address, setAddress] = useState('')
    const history = useNavigate();
    const { idPatient } = useParams();

    //date 
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;


    useEffect(() => {

        PatientService.getPatientById(idPatient).then((response) => {
            setName(response.data.name)
            setSurname(response.data.surname)
            setBirthday(response.data.birthday)
            setGender(response.data.gender)
            setCni(response.data.cni)
            setPhone(response.data.phone)
            setJob(response.data.job)
            SetMaritalStatus(response.data.maritalStatus)
            setAddress(response.data.address)
            setDateAjout(response.data.dateAjout)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {
        return (
            <div className="text-center"><Button style={{ backgroundColor: "cadetblue", leftPadding: "10px", borderRadius: "12px", marginLeft:"40px" }}> <h2>Détails du patient {name + ' ' + surname} </h2></Button></div>)
    }

    const details = () => {
        return (
            <Card className="text-center" style={{ marginTop: "10px", borderRadius: "12px", padding:"3rem" }}>
                <Card.Body>
                    <Card.Text>
                        Nom: {name} <br></br>
                        Prénom: {surname} <br></br>
                        Date de naissance: {birthday} <br></br>
                        Genre: {gender} <br></br>
                        CNI: {cni} <br></br>
                        Téléphone: {phone} <br></br>
                        Profession: {job} <br></br>
                        Situation Matrimoniale: {maritalStatus} <br></br>
                        Adresse: {address}<br></br>
                    </Card.Text>
                </Card.Body>
            </Card>
            // </div>
        );
    }

    return (
        <Container fluid style={{padding:"7rem"}}>
            <AppNavBar />
            {title()}
            <Row>
                <Col>
                    <Card
                        //bg="info"
                        // key="primary"
                        text="white"
                        style={{ width: '18rem', display: "flex", backgroundColor: "cadetblue", marginTop: '10px', padding: "3rem", borderRadius: "12px" }}

                    >
                        {/* <Card.Header>Header</Card.Header> */}
                        <Card.Body>
                            {/* <Card.Title> Bienvenue docteur test </Card.Title> */}
                            <Card.Text>
                                <b>Enregistré le : </b>{dateAjout}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={7}>
                    {details()}
                </Col>
                <Col>
                    <Row>
                        <Link className="btn btn-primary" to={`/dossier-patient/${idPatient}`} style={{ marginTop: "10px", padding: "1rem", borderRadius: "12px" }}>Dossier Médical</Link>
                    </Row>
                    <Row>
                        <Link className="btn btn-primary" to={`/consultation-patient-add/${idPatient}`} style={{ marginTop: "50px", padding: "1rem", borderRadius: "12px" }}>Nouvelle Consultation</Link>
                    </Row>
                    <Row>
                        <Link className="btn btn-primary" to={`/consultations-patient/${idPatient}`} style={{ marginTop: "50px", padding: "1rem", borderRadius: "12px" }}>Consultations</Link>

                    </Row>
                </Col>
            </Row>

            <Link to="/patients" className="btn btn-danger" style={{ marginLeft: "600px", marginTop: "10px", leftPadding:"2rem" }} size="lg" block> Retour </Link>
        </Container>
    )
}