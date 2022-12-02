
/* eslint-disable eqeqeq */
import { useAppDispatch, useAppSelector } from "app/config/store";
import Header from "app/shared/layout/header/header"
import React, { useEffect, useState } from "react"
import { IoIosArrowBack, IoIosRemoveCircle } from "react-icons/io";
import { isNumber, ValidatedField, ValidatedForm } from "react-jhipster";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "reactstrap";
import { getPatient as getDossierPatient } from '../dossier-medical/dossier-medical.reducer';
import { getEntities as getPatients } from 'app/entities/patient/patient.reducer';
import dayjs from "dayjs";
import { convertDateTimeFromServer, convertDateTimeFromServerToDate, convertDateTimeFromServerToHours, displayDefaultDate, displayDefaultDateTime } from "app/shared/util/date-utils";
import { FiLock } from "react-icons/fi";

// eslint-disable-next-line complexity
export const HospitalisationUpdate = () => {
    const dispatch = useAppDispatch();


    const { id } = useParams<'id'>();
    const { idPatient } = useParams<'idPatient'>();
    const { idEdit } = useParams<'idEdit'>();
    const isNew = id === undefined;

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
    if(today.isSame(dayjs())){
        console.log("Test")
    }
   
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
                            width: '30vw',
                            borderRadius: '20px',
                            backgroundColor: '#11485C',
                            textAlign: 'center',
                            color: 'white',
                            marginBottom: '5vh',
                            boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: isNew ? '2vw' : '4vw',
                            paddingLeft: isNew ? '1vw' : '2vw',
                            marginLeft: idPatient == undefined && isNew === true ? '25vw' : '',
                            marginTop: '10vh',
                        }}
                    >
                        <Button onClick={() => window.history.back()} style={{ color: '#53BFD1', backgroundColor: '#11485C', borderColor: '#11485C' }}>
                            {React.createElement(IoIosArrowBack, { size: '20' })}
                        </Button>
                        {isNew ? (
                            <span>Enregistrement nouvelle hospitalisation</span>
                        ) : (
                            <span>{idEdit === 'voir' ? 'Hospitalisation patient ' : 'Mise à jour hospitalisation patient '}</span>
                        )}
                    </Card>
                    {idPatient == undefined && isNew === true ? null : (
                        <Card
                            style={{
                                minHeight: '30vh',
                                width: '40vw',
                                boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                                borderRadius: '15px',
                                borderColor: '#0075FF',
                                backgroundColor: '#F6FAFF',
                            }}
                        >
                            <Card
                                style={{
                                    backgroundColor: '#0075FF',
                                    borderColor: '#0075FF',
                                    color: '#F6FAFF',
                                    fontSize: '15px',
                                    borderRadius: '13px',
                                    minHeight: '9vh',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '50%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: '2%',
                                }}
                            >
                                <span style={{ fontSize: '18px', fontWeight: '900' }}>Dossier médical</span>
                                <Link
                                    to={`/dossier-medical/${dossierMedicalEntity?.id}/edit/${'voir'}`}
                                    style={{
                                        fontSize: '13px',
                                        color: '#F6FAFF',
                                        textDecoration: 'none',
                                        border: '1px solid #72C9D8',
                                        backgroundColor: '#0075F5',
                                        padding: '10px',
                                        borderRadius: '25px',
                                        boxShadow: '2px 5px 11px rgba(0, 0, 0, 0.25)',
                                    }}
                                >
                                    Tout voir{' '}
                                </Link>
                            </Card>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    fontSize: '15px',
                                    color: '#A9B7CD',
                                    fontWeight: '700',
                                    marginTop: '15px',
                                    marginLeft: '5%',
                                    gap: '1vh',
                                }}
                            >
                                {dossierMedicalEntity ? (
                                    <>
                                        <div>Motif: {dossierMedicalEntity?.motifConsultation}</div>
                                        <div>Histoire de la maladie:{dossierMedicalEntity?.histoireMaladie}</div>
                                        <div>Antécédants chirigicaux:{dossierMedicalEntity?.antecedantsChirurgicaux}</div>
                                        <div>Antécédants familiaux:{dossierMedicalEntity?.antecedantsFamiliaux}</div>
                                        <div>Gynéco-Obstrétique:{dossierMedicalEntity?.gynecoObstretrique}</div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Card>
                    )}
                </div>

                <Card
                    style={{
                        minHeight: '110vh',
                        width: '80vw',
                        boxShadow: '0px 10px 50px rgba(138, 161, 203, 0.23)',
                        borderRadius: '15px',
                        marginBottom: '30px',
                        fontFamily: 'Jost',
                    }}
                >
                    {isNew ? (
                        <span style={{ marginTop: '1%', color: '#141414', fontSize: '19px', marginLeft: '3%' }}>Initialisation des paramètres du patient</span>
                    ) : (
                        <span style={{ marginTop: '1%', color: '#141414', fontSize: '19px', marginLeft: '3%' }}>
                            {' '}
                            {idEdit === 'voir' ? 'Hospitalisation patient' : 'Mise à jour des paramètres du patient'}{' '}
                        </span>
                    )}
                    <span
                        style={{
                            marginTop: '2%',
                            color: '#141414',
                            fontSize: '25px',
                            marginBottom: '3%',
                            textAlign: 'center',
                            fontWeight: '900',
                        }}
                    >
                    </span>

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
                            gap: "3vw"
                        }}
                    >
                        <ValidatedField
                            disabled
                            hidden={isNew ? false : true}
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
                        {
                            formValues.map((e, i) => (
                                <div
                                    style={{
                                        flex: '1 1 100%',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.7vw',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    key={i}
                                >
                                    <ValidatedField
                                        disabled
                                        label="Paramètres surveillés le"
                                        id="hospitalisation-sheetDateTime"
                                        name="sheetDateTime"
                                        data-cy="sheetDateTime"
                                        type="datetime"
                                        placeholder="YYYY-MM-DD HH:mm"
                                        style={{
                                            borderRadius: '25px',
                                            borderColor: '#CBDCF7',
                                            backgroundColor: '#A9B7CD',
                                            color: '#F6FAFF', width: "70vw"
                                        }}
                                    />
                                    <ValidatedField
                                        disabled={idEdit === 'voir' ? true : false}
                                        label="Temperature (en °C)"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw",
                                        }}
                                    />
                                    <ValidatedField
                                        disabled={idEdit === 'voir' ? true : false}
                                        label="TA (max/mn)"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw"
                                        }}
                                    />
                                    <ValidatedField
                                        disabled={idEdit === 'voir' ? true : false}
                                        label="Frequence cardiaque(battements/mn)"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw"
                                        }}
                                    />
                                    <ValidatedField
                                        disabled={idEdit === 'voir' ? true : false}
                                        label="Frequence respiratoire(cycles/mn)"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw"
                                        }}
                                    />
                                    <ValidatedField
                                        disabled={idEdit === 'voir' ? true : false}
                                        label="Temps de Recoloration (secondes)"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "7vw"
                                        }}
                                    >
                                        <option value={"I"}>I</option>
                                        <option value={"II"}>II</option>
                                        <option value={"III"}>III</option>
                                    </ValidatedField>

                                    <ValidatedField
                                        disabled={idEdit === 'voir' ? true : false}
                                        label="Diurése horaire(ml / Kg /mn)"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "15vw"
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
                                            color: idEdit === 'voir' ? '#F6FAFF' : 'black', width: "10vw"
                                        }}
                                    >
                                        <option value={"S"}>Stationnaire</option>
                                        <option value={"F"}>Favorable</option>
                                        <option value={"DV"}>Détresse vitale</option>
                                        <option value={"D"}>Décès</option>
                                    </ValidatedField>
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
                                </div>

                            ))

                        }
                        <Button onClick={() => addFormFields()} className="btn-primary">TestAjout</Button>

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
                        <ValidatedField
                            disabled={idEdit === 'voir' || isNew ? true : false}
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
                                backgroundColor: idEdit === 'voir' || isNew ? '#A9B7CD' : '#F7FAFF',
                                borderColor: '#CBDCF7',
                                color: idEdit === 'voir' || isNew ? '#F6FAFF' : 'black', width: "50vw"
                            }}
                        >
                            {isNew ? <option value={"new"}>Débute</option> : null}
                            <option value={"On"}>En cours</option>
                            <option value={"Off"}>Terminée</option>
                        </ValidatedField>


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
                        </Button>
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
                    </ValidatedForm>
                </Card>
            </div>
        </div>
    )
}