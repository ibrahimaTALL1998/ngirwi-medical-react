import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container, Button, Form, Row, Col, Table } from "react-bootstrap";
import PatientService from "../../Services/PatientService";
import DossierService from "../../Services/DossierService";
import ConsultationService from "../../Services/ConsultationService";
import AppNavBar from "../appNavBar/AppNavBar";

export default function ConsultationList() {

    const [consultations, setConsultations] = useState([])
    const history = useNavigate();
    const { idPatient } = useParams();

    useEffect(() => {

        getAllConsultations();
    }, [])

    const getAllConsultations = () => {
        ConsultationService.getConsultations().then((response) => {
            setConsultations(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <Container fluid>
            <header>
                <AppNavBar />
            </header>
            <h2 className="text-center"> Liste Consultations </h2>
            <Link to={`/consultation-patient-add/${idPatient}`} className="btn btn-primary mb-2" > Nouvelle Consultation </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th> Date</th>
                        <th> Heure </th>
                        <th> Actions </th>
                    </tr>

                </thead>
                <tbody>
                {
                            consultations.map(
                                consultation =>
                                    <tr key={consultation.id}>
                                        <td> {consultation.id} </td>
                                        <td> {consultation.date} </td>
                                        <td>{consultation.time}</td>
                                        <td>
                                            <Link className="btn btn-info" to={`/consultation-patient-update/${idPatient}/${consultation.id}`} >Update</Link>
                                            {/* <button className="btn btn-danger" onClick={() => deletePatient(patient.id)}
                                                style={{ marginLeft: "10px" }}> Delete</button> */}
                                            <Link className="btn btn-primary" to={`/consultation-patient-details/${idPatient}/${consultation.id}`} style={{ marginLeft: "10px" }}>Détails</Link>
                                        </td>
                                    </tr>
                            )
                        }
                </tbody>
            </Table>

        </Container>
    )
}