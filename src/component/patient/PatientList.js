import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PatientService from "../../Services/PatientService";
import AppNavBar from "../appNavBar/AppNavBar";
import { Button, Label, Collapse } from "reactstrap";
import {
    Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell
} from '@table-library/react-table-library/table';
import { Input } from "reactstrap";



export default function PatientList() {

    const [patients, setPatients] = useState([])
    const [search, setSearch] = React.useState('');
    const [criteria, setCriteria] = React.useState('nom');
    const [added, setAdded] = useState(false)
    const { add } = useParams();

    const addedMessage = "Utilisateur ajouté"


    useEffect(() => {

        getAllPatients();
    }, [])

    const getAllPatients = () => {
        PatientService.getPatients().then((response) => {
            setPatients(response.data)
            //console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    let data = null

    if (criteria === "nom") {
        data = {
            nodes: patients.filter((item) =>
                item.name.toLowerCase().includes(search)
            )
        }
    } else if (criteria === "prenom") {
        data = {
            nodes: patients.filter((item) =>
                item.surname.toLowerCase().includes(search)
            )
        }
    } else if (criteria === "birthday") {
        data = {
            nodes: patients.filter((item) =>
                item.birthday.includes(search)
            )
        }
    } else if (criteria === "phoneNumber") {
        data = {
            nodes: patients.filter((item) =>
                item.phone.includes(search)
            )
        }
    } else if (criteria === "cni") {
        data = {
            nodes: patients.filter((item) =>
                item.cni.includes(search)
            )
        }
    } else if (criteria === "matrim") {
        data = {
            nodes: patients.filter((item) =>
                item.maritalStatus.toLowerCase().includes(search)
            )
        }
    }

    const renderSucces = () => {
        setAdded(add)
        console.log(add)
        if (added) {
            <div className="succes">{addedMessage}</div>
        }
    }

    const deletePatient = (patientId) => {
        PatientService.deletePatient(patientId).then((response) => {
            getAllPatients();

        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <>
            <header>
                <AppNavBar />
            </header>
            <Container fluid>
                <h2 className="text-center"> Liste Patients </h2>
                <Collapse in={add} dimension="width">
                    <div className="succes">{added}</div>
                </Collapse>
                <Link to="/add-patient" className="btn btn-primary mb-2" style={{ backgroundColor: "cadetblue", leftPadding: "10px", borderRadius: "12px" }}> Enregistrer un Patient </Link><br></br>
                <Label>Critere de recherche: </Label>
                <select name="criteria" onChange={(e) => setCriteria(e.target.value)}>
                    <option value="nom">
                        Nom
                    </option>
                    <option value="prenom">
                        Prenom
                    </option>
                    <option value="birthday">
                        Date de naissance
                    </option>
                    <option value="phoneNumber">
                        Numéro de telephone
                    </option>
                    <option value="cni">
                        Numéro de carte d'identité
                    </option>
                    <option value="matrim">
                        Status matrimonial
                    </option>
                </select><br></br>

                <Label>Barre de recherche:</Label>
                <input type="text" id="search" name="search" placeholder="Barre de recherche" onChange={handleSearch} /><br></br>

                <Table data={data}>
                    {(tableList) => (
                        <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCell> Nom</HeaderCell>
                                    <HeaderCell> Prénom </HeaderCell>
                                    <HeaderCell> Date de naissance </HeaderCell>
                                    <HeaderCell> Genre</HeaderCell>
                                    <HeaderCell> Numéro de carte d'identité</HeaderCell>
                                    <HeaderCell> Téléphone</HeaderCell>
                                    <HeaderCell> Profession</HeaderCell>
                                    <HeaderCell> Status Matrimonial</HeaderCell>
                                    <HeaderCell> adresse</HeaderCell>
                                    <HeaderCell> Actions </HeaderCell>
                                </HeaderRow>
                            </Header>
                            <Body>
                                {tableList.map((item) => (
                                    <Row key={item.id} item={item}>
                                        <Cell> {item.name} </Cell>
                                        <Cell>{item.surname}</Cell>
                                        <Cell> {item.birthday} </Cell>
                                        <Cell> {item.gender} </Cell>
                                        <Cell>{item.cni}</Cell>
                                        <Cell> {item.phone} </Cell>
                                        <Cell> {item.job} </Cell>
                                        <Cell> {item.maritalStatus} </Cell>
                                        <Cell> {item.address} </Cell>
                                        <Cell>
                                            <Link className="btn btn-info" to={`/edit-patient/${item.id}`} style={{ marginLeft: "10px", borderRadius: "12px" }} >Mettre à jour</Link>
                                            {/* <Button className="btn btn-danger" onClick={() => deletePatient(item.id)}
                                                style={{ marginLeft: "10px" }}> Delete</Button> */}
                                            <Link className="btn btn-primary" to={`/details-patient/${item.id}`} style={{ marginLeft: "10px", borderRadius: "12px", marginTop: "12px" }}>Consulter détails</Link>
                                        </Cell>

                                    </Row>
                                ))}
                            </Body>
                        </>
                    )}
                </Table>

                {/* <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th> Id </th>
                            <th> Nom</th>
                            <th> Prénom </th>
                            <th> Date de naissance </th>
                            <th> Genre</th>
                            <th> Email</th>
                            <th> Téléphone</th>
                            <th> Profession</th>
                            <th> Status Matrimonial</th>
                            <th> adresse</th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            patients.map(
                                patient =>
                                    <tr key={patient.id}>
                                        <td> {patient.id} </td>
                                        <td> {patient.name} </td>
                                        <td>{patient.surname}</td>
                                        <td> {patient.birthday} </td>
                                        <td> {patient.gender} </td>
                                        <td>{patient.email}</td>
                                        <td> {patient.phone} </td>
                                        <td> {patient.job} </td>
                                        <td> {patient.maritalStatus} </td>
                                        <td> {patient.address} </td>
                                        <td>
                                            <Link className="btn btn-info" to={`/edit-patient/${patient.id}`} >Update</Link>
                                            <button className="btn btn-danger" onClick={() => deletePatient(patient.id)}
                                                style={{ marginLeft: "10px" }}> Delete</button>
                                            <Link className="btn btn-primary" to={`/details-patient/${patient.id}`} style={{ marginLeft: "10px" }}>Détails</Link>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </Table> */}
            </Container>
        </>
    )
}