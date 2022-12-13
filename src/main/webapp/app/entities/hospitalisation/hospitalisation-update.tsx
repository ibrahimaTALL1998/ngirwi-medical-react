
/* eslint-disable eqeqeq */
import { useAppDispatch, useAppSelector } from "app/config/store";
import Header from "app/shared/layout/header/header"
import React, { useEffect, useRef, useState } from "react"
import { IoIosArrowBack, IoIosRemoveCircle } from "react-icons/io";
import { isNumber, ValidatedField, ValidatedForm } from "react-jhipster";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { getPatient as getDossierPatient } from '../dossier-medical/dossier-medical.reducer';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import dayjs from "dayjs";
import { convertDateTimeFromServer, convertDateTimeFromServerToDate, convertDateTimeFromServerToHours, displayDefaultDate, displayDefaultDateTime } from "app/shared/util/date-utils";
import { FiArrowDownCircle, FiLock } from "react-icons/fi";
import { CgArrowDown } from "react-icons/cg";
import { BiArrowToBottom } from "react-icons/bi";
import { MdOutlineArrowCircleDown, MdOutlineArrowCircleUp } from "react-icons/md";
import { style } from "@mui/system";
import { RiUserAddLine } from "react-icons/ri";

// eslint-disable-next-line complexity
export const HospitalisationUpdate = () => {
    const dispatch = useAppDispatch();

    const [height, setHeight] = useState("180vh");
    const [ind, setInd] = useState(0);
    const [can, setCan] = useState(false);


    const [hideStyle, setHideStyle] = useState({
        transition: "",
        height: null,
        minHeight: '130vh',
        width: '80vw',
        boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
        borderRadius: '15px',
        marginBottom: '30px',
        fontFamily: 'Jost',
        overflow: null,
        cursor: "pointer",

    }
    );


    let show = (a) => {
        if (ind !== a) {
            setInd(a);
        }
        if (ind === a) {
            can === false ? setCan(true) : setCan(false)
            if (can === true) {
                setHideStyle({
                    transition: "height 1.5s ease",
                    height: null,
                    minHeight: '130vh',
                    width: '80vw',
                    boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                    borderRadius: '15px',
                    marginBottom: '30px',
                    fontFamily: 'Jost',
                    overflow: null,
                    cursor: "pointer",
                })
            } else {
                setHideStyle({
                    transition: "height 1.5s ease",
                    height: "10.5vh",
                    minHeight: null,
                    width: '80vw',
                    boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                    borderRadius: '15px',
                    marginBottom: '30px',
                    fontFamily: 'Jost',
                    overflow: "hidden",
                    cursor: "pointer",
                })
            }
        }
        console.log(can + "Jour " + a+1)
    }
    let hide = (a) => {
        if (ind !== a) {
            setInd(a);
        }
        if (a === ind) {
            can === false ? setCan(true) : setCan(false)
            if (can === false) {
                setHideStyle({
                    transition: "height 1.5s ease",
                    height: "10.5vh",
                    minHeight: null,
                    width: '80vw',
                    boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                    borderRadius: '15px',
                    marginBottom: '30px',
                    fontFamily: 'Jost',
                    overflow: "hidden",
                    cursor: "pointer",

                })
            }
        }
        console.log(can + "Jour " + a+1)
    }


    const { id } = useParams<'id'>();
    const { idPatient } = useParams<'idPatient'>();
    const { idEdit } = useParams<'idEdit'>();
    const isNew = id === undefined;
    const ref = useRef(null)
    const refCard = useRef(null)

    // eslint-disable-next-line prefer-const
    let hello = () => {
        alert("Hello");
    }
    const [iPatient, setIPatient] = useState(idPatient)
    const getPatientId = e => {
        setIPatient(e.target.value.toString());
    };
    const dossierMedicalEntity = useAppSelector(state => state.dossierMedical.entity);
    const patients = useAppSelector(state => state.patient.entities);
    const account = useAppSelector(state => state.authentication.account);
    // const updating = useAppSelector(state => state.hospitalisation.updating);


    useEffect(() => {
        if (isNew) {
            // dispatch(reset());
            dispatch(getDossierPatient(idPatient));
        } else {
            // dispatch(getEntity(id));
            // dispatch(getDossierPatient(idPatient ? idPatient : hospitalisation?.patient?.id));
        }

        dispatch(getPatients({}));
    }, []);
    const [formValues, setFormValues] = useState([{
        sheetDateTime: '',
        temperature: '',
        ta: '',
        tension: '',
        respiration: '',
        recoloration: '',
        glasgow: '',
        gravity: '',
        diurese: '',
        spO2: '',
        treatment: '',
        evolution: ''
    }]);
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    };

    let addFormFields = () => {

        setFormValues([...formValues,
        {
            sheetDateTime: '',
            temperature: '',
            ta: '',
            tension: '',
            respiration: '',
            recoloration: '',
            glasgow: '',
            gravity: '',
            diurese: '',
            spO2: '',
            treatment: '',
            evolution: ''
        }
        ]);
    };
    const today = dayjs();
    console.log(height)

    let removeFormFields = i => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };
    const defaultValues = () =>
        isNew
            ? {
                hours: dayjs().format('HH:mm:ss'),
                date: dayjs().format('DD/MM/YYYY'),
                dateTime: displayDefaultDate(),
                sheetDateTime: displayDefaultDate(),
                author: account.login,
                patient: idPatient,
            }
            : {
                // ...hospitalisationEntity,
                // ...hospitalisationSheetEntity,
                // dateTime: convertDateTimeFromServer(hospitalisationEntity.dateTime),
                // sheetDateTime: convertDateTimeFromServer(hospitalisationSheetEntity.dateTime),
                // hours: convertDateTimeFromServerToHours(hospitalisationEntity.dateTime),
                // date: convertDateTimeFromServerToDate(hospitalisationEntity.dateTime),
                // patient: hospitalisationEntity?.patient?.id,
                author: account.login,
                // ...hospitalisationEntity?.exams,
            };

    // console.log("index: "+ind+" can: "+can)


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
                    marginTop: '7.5vh',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: '10%',
                        gap: '6vw',
                    }}
                >
                    <Card
                        style={{
                            height: '6.28vh',
                            width: '35vw',
                            borderRadius: '15px',
                            backgroundColor: '#11485C',
                            textAlign: 'center',
                            color: 'white',
                            marginBottom: '5vh',
                            boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: '2vw',
                            paddingLeft: '1vw',
                            marginTop: '10vh',
                            marginLeft: "20vw",
                        }}

                    >
                        <Button onClick={() => window.history.back()} style={{ color: '#53BFD1', backgroundColor: '#11485C', borderColor: '#11485C' }}>
                            {React.createElement(IoIosArrowBack, { size: '20' })}
                        </Button>
                        <span>Enregistrement nouvelle hospitalisation</span>
                    </Card>

                </div>
                <Button
                    onClick={()=>addFormFields()}
                    style={{
                        display: 'flex',
                        textDecoration: 'none',
                        textAlign: 'center',
                        color: '#56B5C5',
                        width: '12vw',
                        height: '12vw',
                        borderRadius: '50%',
                        backgroundColor: '#CBDCF7',
                        fontSize: '18px',
                        paddingTop: "2%",
                        fontWeight:"900",
                        justifyContent: "center",
                        marginLeft:"65vw",
                        position:"absolute",
                        top:"15vh"
                        
                    }}
                >
                    <span style={{ display: 'block', width: "90%", wordBreak: "break-word" }}>
                        {React.createElement(RiUserAddLine, { size: '24' })}Ajouter fiche de surveillance
                    </span>
                </Button>

                {
                    // eslint-disable-next-line complexity
                    formValues.map((e, i, arr) => ( 
                        
                        <Card
                            style={ind === i  ? hideStyle: {
                                transition: "height 1.5s ease",
                                height: "10.5vh",
                                minHeight: null,
                                width: '80vw',
                                boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                                borderRadius: '15px',
                                marginBottom: '30px',
                                fontFamily: 'Jost',
                                overflow: "hidden",
                                cursor: "pointer",
                            }
                            }
                            
                            key={i}
                        >
                            <div style={{ marginTop: '2%', display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: "2vw", cursor: "pointer", }}>
                                <span style={{ transition: "all 1.5s ease", color:(ind === i && can === false) ? '#141414':'#B1BBCC', fontSize: '19px', width: "70vw" }}>{(ind === i && can === false) ?"Initialisation des paramètres du patient":"Cliquez pour défiler"}</span>
                                <span style={{ transition: "all 1.5s ease", color: "#11485C", textDecoration: "underline", fontWeight: "600", fontSize: "24px" }}>Jour {i + 1}</span>
                                {(ind === i && can === false) ? <span onClick={() => hide(i)} style={{ transition: "all 1.5s ease", color: "#11485C" }}> {React.createElement(MdOutlineArrowCircleUp, { size: "30" })}</span> : (ind === i && can === true) ? <span onClick={() => show(i)} style={{ transition: "all 1.5s ease", color: "#11485C", }}>{React.createElement(MdOutlineArrowCircleDown, { size: "30" })}</span> : <span onClick={() => show(i)} style={{ transition: "all 1.5s ease", color: "#11485C" }}>{React.createElement(MdOutlineArrowCircleDown, { size: "30" })}</span>}
                            </div>
                            
                            <ValidatedForm
                                defaultValues={defaultValues()}
                                onSubmit={hello}
                                style={{
                                    width: '94%',
                                    height: '80%',
                                    marginLeft: '3%',
                                    display: 'flex',
                                    marginTop: '1%',
                                    fontSize: '16px',
                                    fontWeight: '900',
                                    flexWrap: "wrap",
                                    backgroundImage: 'url(content/images/NgirwiLogo.png)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundAttachment: 'fixed',
                                    backgroundPosition: '65% 90%',
                                    gap: "3vw",justifyContent:"center"
                                }}
                            >
                                <ValidatedField
                                    disabled
                                    hidden={isNew && i === 0 ? false : true}
                                    label="Date d'admission au service"
                                    id="hospitalisation-dateTime"
                                    name="dateTime"
                                    data-cy="dateTime"
                                    type="datetime-local"
                                    placeholder="YYYY-MM-DD HH:mm"
                                    style={{
                                        borderRadius: '25px',
                                        borderColor: '#CBDCF7',
                                        backgroundColor: '#A9B7CD',
                                        color: '#F6FAFF', width: "70vw"
                                    }}

                                />


                                <ValidatedField
                                    disabled
                                    label="Paramètres surveillés le"
                                    id="hospitalisation-sheetDateTime"
                                    name="sheetDateTime"
                                    data-cy="sheetDateTime"
                                    type="datetime-local"
                                    placeholder="YYYY-MM-DD HH:mm"
                                    style={{
                                        borderRadius: '25px',
                                        borderColor: '#CBDCF7',
                                        backgroundColor: '#A9B7CD',
                                        color: '#F6FAFF', width: "33.5vw"
                                    }}
                                />
                               <ValidatedField
                                    disabled={idEdit === 'voir' || i === 0 ? true : false}
                                    label="Statut de l'hospitalisation"
                                    id="hospitalisation-status"
                                    name="status"
                                    data-cy="status"
                                    type="select"

                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' || i === 0 ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' || i === 0 ? '#F6FAFF' : 'black', width: "33.5vw"
                                    }}
                                >
                                    {i === 0 ? <option value={"new"}>Débute</option> : null}
                                    <option value={"On"}>En cours</option>
                                    <option value={"Off"}>Terminée</option>
                                </ValidatedField>
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Température(en °C)"
                                    id="hospitalisation-temperature"
                                    name="temperature"
                                    data-cy="temperature"
                                    type="number"
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                        validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "33.5vw",
                                    }}
                                />
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Tension artérielle(max/mn)"
                                    id="hospitalisation-ta"
                                    name="ta"
                                    data-cy="ta"
                                    type="number"
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                        validate: v => isNumber(v) || 'Ce champ doit être un nombre.',
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "33.5vw"
                                    }}
                                />
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Fréquence cardiaque(battements/mn)"
                                    id="hospitalisation-tension"
                                    name="tension"
                                    data-cy="tension"
                                    type="number"
                                    min={0}
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.33vw"
                                    }}
                                />
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Fréquence respiratoire(cycles/mn)"
                                    id="hospitalisation-respiration"
                                    name="respiration"
                                    data-cy="respiration"
                                    type="number"
                                    min={0}
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.33vw"
                                    }}
                                />
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Temps de Recoloration(secondes)"
                                    id="hospitalisation-recoloration"
                                    name="recoloration"
                                    data-cy="recoloration"
                                    min={0}
                                    type="number"
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.34vw"
                                    }}
                                />
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Glasgow(3 à 15)"
                                    id="hospitalisation-glasgow"
                                    name="glasgow"
                                    data-cy="glasgow"
                                    type="number"
                                    min={3}
                                    max={15}
                                    onChange={a => handleChange(i, a)}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.33vw"
                                    }}
                                />
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Classe de gravité(I/II/III)"
                                    id="hospitalisation-gravity"
                                    name="gravity"
                                    data-cy="gravity"
                                    type="select"
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.33vw"
                                    }}
                                >
                                    <option value={"I"}>I</option>
                                    <option value={"II"}>II</option>
                                    <option value={"III"}>III</option>
                                </ValidatedField>

                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Diurése horaire(ml/Kg/mn)"
                                    id="hospitalisation-diurese"
                                    name="diurese"
                                    data-cy="diurese"
                                    type="number"
                                    min={0}
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.34vw"
                                    }}
                                />
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Saturation en oxygène"
                                    id="hospitalisation-spO2"
                                    name="spO2"
                                    data-cy="spO2"
                                    type="text"
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.33vw"
                                    }}
                                />
                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Traitement administré"
                                    id="hospitalisation-treatment"
                                    name="treatment"
                                    data-cy="treatment"
                                    type="textarea"
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.33vw"
                                    }}
                                />

                                <ValidatedField
                                    disabled={idEdit === 'voir' ? true : false}
                                    label="Evolution en fonction du traitement"
                                    id="hospitalisation-evolution"
                                    name="evolution"
                                    data-cy="evolution"
                                    type="select"
                                    onChange={a => handleChange(i, a)}
                                    validate={{
                                        required: { value: true, message: 'Ce champ est obligatoire.' },
                                    }}
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: idEdit === 'voir' ? '#A9B7CD' : '#F7FAFF',
                                        borderColor: '#CBDCF7',
                                        color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "21.34vw"
                                    }}
                                >
                                    <option value={"S"}>Stationnaire</option>
                                    <option value={"F"}>Favorable</option>
                                    <option value={"DV"}>Détresse vitale</option>
                                    <option value={"D"}>Décès</option>
                                </ValidatedField>


                                <ValidatedField
                                    disabled
                                    hidden
                                    label="Date"
                                    id="hospitalisation-date"
                                    name="date"
                                    data-cy="date"
                                    type="datetime"
                                    placeholder="YYYY-MM-DD HH:mm"
                                    style={{
                                        borderRadius: '25px',
                                        borderColor: '#CBDCF7',
                                        backgroundColor: '#A9B7CD',
                                        color: '#F6FAFF',
                                    }}
                                />
                                <ValidatedField
                                    disabled
                                    hidden
                                    label="Heure"
                                    id="hospitalisation-hours"
                                    name="hours"
                                    data-cy="hours"
                                    type="datetime"
                                    placeholder="YYYY-MM-DD HH:mm"
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: '#A9B7CD',
                                        color: '#F6FAFF',
                                        borderColor: '#CBDCF7',
                                    }}
                                >
                                    <span
                                        style={{
                                            color: '#F6FAFF',
                                            textAlign: 'end',
                                        }}
                                    >
                                        {React.createElement(FiLock, { size: '20' })}
                                    </span>
                                </ValidatedField>

                                {arr.length - 1 === i ? (
                                    <Button
                                        hidden={idEdit === 'voir' ? true : false}
                                        id="save-entity"
                                        data-cy="entityCreateSaveButton"
                                        type="submit"
                                        // disabled={}
                                        style={{
                                            borderRadius: '25px',
                                            color: 'white',
                                            backgroundColor: '#56B5C5',
                                            borderColor: '#56B5C5',
                                            flex: "1 1 100%"
                                        }}
                                    >
                                        Enregistrer
                                    </Button>) : (null)}
                                {arr.length - 1 === i ? (
                                    <Button
                                        onClick={() => {
                                            confirm("Êtes-vous sur de vouloir quitter?") === true ? (window.history.back()) : (null)
                                        }}
                                        id="cancel-save"
                                        data-cy="entityCreateCancelButton"
                                        replace
                                        color="info"
                                        style={{
                                            borderRadius: '25px',
                                            color: 'white',
                                            backgroundColor: '#EC4747',
                                            borderColor: '#EC4747',
                                            textAlign: 'center',
                                            fontSize: idEdit === 'voir' ? '20px' : '',
                                            marginBottom: "2vh",
                                            flex: "1 1 100%"
                                        }}
                                    >
                                        <span className="d-none d-md-inline">{idEdit === 'voir' ? 'Retour' : 'Annuler'}</span>
                                    </Button>
                                ) : (null)}

                                <ValidatedField hidden label="Author" id="hospitalisation-author" name="author" data-cy="author" type="text" />
                                <ValidatedField
                                    hidden
                                    label="Date Created"
                                    id="patient-dateCreated"
                                    name="dateCreated"
                                    data-cy="dateCreated"
                                    type="datetime-local"
                                    placeholder="YYYY-MM-DD HH:mm"
                                />
                                <ValidatedField
                                    hidden
                                    label="Date Updated"
                                    id="patient-dateUpdated"
                                    name="dateUpdated"
                                    data-cy="dateUpdated"
                                    type="datetime-local"
                                    placeholder="YYYY-MM-DD HH:mm"
                                />
                                <ValidatedField hidden label="Author" id="patient-author" name="author" data-cy="author" type="text" />
                                {i ? (
                                    <span
                                        onClick={() => removeFormFields(i)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            cursor: 'pointer',
                                            borderColor: 'transparent',
                                            color: '#EC4747',
                                            fontWeight: '900',
                                            width: '0.1vw',
                                            display: 'inline',
                                        }}
                                    >
                                        {React.createElement(IoIosRemoveCircle, { size: '25' })}
                                    </span>
                                ) : null}



                            </ValidatedForm>


                        </Card>))
                }
            </div>
        </div>
    )
}