import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import Header from 'app/shared/layout/header/header';
import React, { useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';
import { RiUserAddLine } from 'react-icons/ri';
import { TextFormat, ValidatedField } from 'react-jhipster';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Table } from 'reactstrap';
import { getEntity } from '../patient/patient.reducer';
export const Hospitalisation = () => {
    const { idPatient } = useParams<'idPatient'>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getEntity(idPatient));
    }
        , []
    )

    const patientEntity = useAppSelector(state => state.patient.entity);
    return (
        <div
            style={{
                paddingLeft: '16vw',
                paddingTop: '1%',
                fontFamily: 'Mulish',
                fontWeight: '900',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header pageName="Gestion hospitalisation" />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'fixed',
                    top: '15.5vh',
                }}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 3fr)',
                        alignItems: 'center',
                        columnGap: '5%',
                        width: '75vw',
                        marginLeft: '5%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            textDecoration: 'none',
                            textAlign: 'center',
                            color: '#56B5C5',
                            minWidth: '15vw',
                            minHeight: '15vw',
                            borderRadius: '50%',
                            backgroundColor: '#CBDCF7',
                            fontSize: '18px',
                            paddingTop: "25%",
                            justifyContent: "center",
                            cursor: "pointer"
                        }}
                    >
                        <span style={{ display: 'block', width: "90%", wordBreak: "break-word" }}>
                            <FontAwesomeIcon icon="sync" /> Actualiser la liste
                        </span>
                    </div>
                    <Card
                        style={{
                            height: '6.28vh',
                            width: '33.38vw',
                            borderRadius: '20px',
                            backgroundColor: '#11485C',
                            textAlign: 'center',
                            color: 'white',
                            marginBottom: '4vw',
                            boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)'
                        }}
                    >
                        <span style={{ marginTop: '1.5%' }}>Liste des hospitalisations enregistrées</span>
                    </Card>
                    <Link
                        to={`/hospitalisation/new/${idPatient}`}
                        style={{
                            display: 'flex',
                            textDecoration: 'none',
                            textAlign: 'center',
                            color: '#56B5C5',
                            minWidth: '15vw',
                            minHeight: '15vw',
                            borderRadius: '50%',
                            backgroundColor: '#CBDCF7',
                            fontSize: '18px',
                            paddingTop: "20%",
                            justifyContent: "center"
                        }}
                    >
                        <span style={{ display: 'block', width: "90%", wordBreak: "break-word" }}>
                            {React.createElement(RiUserAddLine, { size: '24' })} Enregistrer nouvelle hospitalisation
                        </span>
                    </Link>
                </div>

                <Card
                    style={{
                        width: '83vw',
                        height: '70vh',
                        backgroundColor: 'white',
                        position: 'fixed',
                        top: '32vh',
                        marginRight: '1%',
                        borderRadius: '15px 15px 0px 0px',
                        boxShadow: '0px 2px 12px 4px rgba(138, 161, 203, 0.23)',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1%' }}>
                        <span style={{ color: '#141414', fontSize: '20px', marginLeft: '3%', marginBottom: '1%', width: '45vw' }}>
                            Hospitalisations enregistrées
                        </span>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginBottom: '3vh',
                                marginRight: '2vw',
                                gap: '1vw',
                            }}
                        >
                            <ValidatedField
                                style={{ borderRadius: '12px', width: '17vw' }}
                                id="criteria"
                                name="criteria"
                                type="select"
                            // onChange={e => setCriteria(e.target.value)}
                            >
                                {/* <select name="criteria" > */}
                                <option value=" ">Critère de recherche</option>
                                <option value="lastName">Date</option>
                                <option value="firstName">Statut</option>
                                {/* </select> */}
                            </ValidatedField>
                            <ValidatedField
                                style={{ borderRadius: '12px', width: '17vw' }}
                                placeholder="Barre de recherche"
                                id="search"
                                name="search"
                            // type={criteria === 'birthday' ? 'date' : 'text'}
                            // onChange={handleSearch}
                            />
                            {/* <input type="text" id="search" name="search" placeholder="Barre de recherche" onChange={handleSearch} />  */}
                        </div>
                    </div>
                    <div style={{ marginLeft: "3%", fontSize: "15px" }}>
                        <span>Patient:</span>
                        <span style={{ textTransform: "uppercase" }}>{" " + patientEntity.lastName + " "}</span>
                        <span style={{ textTransform: "capitalize" }}>{patientEntity.firstName}</span>
                        {" "}
                        {" "}
                        <div>
                            <span>Pièce d&apos;identité n°</span>
                            <span style={{ textTransform: "uppercase" }}>{" " + patientEntity.cni}</span>
                        </div>
                    </div>


                    <Table responsive style={{ borderCollapse: 'separate', borderSpacing: '0 15px' }}>
                        <thead
                            style={{
                                position: 'sticky',
                                top: '0',
                            }}
                        >
                            <tr>
                                <th
                                    style={{
                                        position: 'sticky',
                                        top: '0',
                                        width: '4%',
                                        backgroundColor: 'white',
                                    }}
                                ></th>
                                <th
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        position: 'sticky',
                                        top: '0',
                                        width: '16%',
                                        backgroundColor: 'white',
                                    }}
                                    className="hand"
                                // onClick={sort('id')}
                                >
                                    ID <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                                </th>
                                <th
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        position: 'sticky',
                                        top: '0',
                                        width: '16%',
                                        backgroundColor: 'white',
                                    }}
                                    className="hand"
                                // onClick={sort('firstName')}
                                >
                                    Date <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                                </th>
                                <th
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        position: 'sticky',
                                        top: '0',
                                        width: '16%',
                                        backgroundColor: 'white',
                                    }}
                                    className="hand"
                                // onClick={sort('lastName')}
                                >
                                    Durée <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                                </th>
                                <th
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        position: 'sticky',
                                        top: '0',
                                        width: '16%',
                                        backgroundColor: 'white',
                                    }}
                                    className="hand"
                                // onClick={sort('birthday')}
                                >
                                    Statut <FontAwesomeIcon style={{ marginLeft: '10px' }} icon="sort" />
                                </th>
                                <th
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '14px',
                                        position: 'sticky',
                                        top: '0',
                                        width: '16%',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            style={{
                                backgroundColor: '#F6FAFF',
                                border: '1px solid #F6FAFF',
                                borderRadius: '15px 15px 0px 15px',
                                fontSize: '15px',
                                textAlign: 'center',
                                borderBottom: '50px solid white',
                                backgroundImage: 'url(content/images/NgirwiLogo.png)',
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                backgroundPosition: '60% 165%',
                            }}
                        >

                        </tbody>
                    </Table>

                </Card>
            </div>
        </div>
    )
}