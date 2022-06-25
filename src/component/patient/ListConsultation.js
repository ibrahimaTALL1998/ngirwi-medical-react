import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PatientService from "../../Services/PatientService";
import DossierService from "../../Services/DossierService";
import ConsultationService from "../../Services/ConsultationService";
import AppNavBar from "../appNavBar/AppNavBar";
import { Label } from "reactstrap";
import {
    Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell
} from '@table-library/react-table-library/table';

export default function ConsultationList() {

    const [consultations, setConsultations] = useState([])
    const [search, setSearch] = React.useState('');
    const history = useNavigate();
    const { idPatient } = useParams();

    useEffect(() => {

        getAllConsultations();
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const data = {
        nodes: consultations.filter((item) =>
            item.date.includes(search) || item.time.includes(search)
        )
    }

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
            <Link to={`/consultation-patient-add/${idPatient}`} className="btn btn-primary mb-2" style={{ borderRadius: "12px" }}> Nouvelle Consultation </Link><br></br>

            <Label>Barre de recherche:</Label>
            <input type="text" id="search" name="search" placeholder="Date ou Heure" onChange={handleSearch} style={{ borderRadius: "5px" }} /><br></br>

            <Table data={data}>
                {(tableList) => (
                    <>
                        <Header>
                            <HeaderRow>
                                <HeaderCell> Id</HeaderCell>
                                <HeaderCell> Date </HeaderCell>
                                <HeaderCell> Heure</HeaderCell>
                                <HeaderCell> Action</HeaderCell>
                            </HeaderRow>
                        </Header>
                        <Body>
                            {tableList.map((item) => (
                                <Row key={item.id} item={item}>
                                    <Cell> {item.id} </Cell>
                                    <Cell>{item.date}</Cell>
                                    <Cell> {item.time} </Cell>
                                    <Cell>
                                        <Link className="btn btn-primary" to={`/consultation-patient-details/${idPatient}/${item.id}`} style={{ marginLeft: "10px" }}>Détails</Link> </Cell>

                                </Row>
                            ))}
                        </Body>
                    </>
                )}
            </Table>
            <Link to={`/details-patient/${idPatient}`} className="btn btn-danger" style={{ marginLeft: "400px", paddingLeft: "200px", paddingRight: "200px", borderRadius: "12px", marginTop: "10px" }}> Retour </Link>

        </Container>
    )
}