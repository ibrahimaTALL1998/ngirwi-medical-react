import { useAppDispatch, useAppSelector } from "app/config/store";
import Header from "app/shared/layout/header/header";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Table } from "reactstrap";


export const ConsultationPatient = () =>{
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const { idPatient } = useParams<'idPatient'>();
    const patients = useAppSelector(state => state.patient.entities);
    const consultationList = useAppSelector(state => state.consultation.entities);


  return(  <div
    style={{
      paddingLeft:"16vw",
      paddingTop:"1%",
      fontFamily:"Mulish",
      fontWeight:"900",
      display:"flex",
      flexDirection:"column"
    }}    
>
     <Header pageName="Consultations" />


      <div
        style={{
          display:"flex",
          flexDirection:"column",
          position:"fixed",
          top:"15.5vh",
        }}          
      >
        

          

          <Card
            style={{
              height:"6.28vh",
              width:"33.38vw",
              borderRadius:"20px",
              backgroundColor:"#11485C",
              textAlign:"center",
              color:"white",
              marginBottom:"5vh",
              boxShadow:"0px 10px 50px rgba(138, 161, 203, 0.23)",
              }}
          >
          <span style={{marginTop:"1.5%"}}>Liste des consultations de {patients.map(patient => patient.id.toString() === idPatient?(<span>{patient.lastName.toUpperCase()+' '+patient.firstName}</span>):(null) )} </span>
          </Card>

      
      

        
        



        {/* <Card
          style={{
            width:"83vw",
            height:"70vh",
            backgroundColor:"white",
            position:"fixed",
            top:"32vh",
            marginRight:"1%",
            borderRadius:"15px 15px 0px 0px",
            boxShadow:"0px 2px 12px 4px rgba(138, 161, 203, 0.23)"
          }}
        >
          <span style={{marginTop:"1%", color:"#141414",fontSize:"15px", marginLeft:"3%", marginBottom:"1%"}}>Consultations enregistrées</span>
               {consultationList && consultationList.length > 0 ? (

            <Table responsive>
            <thead>
            <tr>
              <th
                style={{
                  fontSize:"14px",
                  position:"sticky",
                  top:"0",
                  backgroundColor:"white",
                }}                
              ></th>
              <th 
              style={{
                fontSize:"14px",
                position:"sticky",
                top:"0",
                backgroundColor:"white",
              }}
                className="hand" onClick={sort('id')}>
                ID 
              </th>
              <th
              style={{
                fontSize:"14px",
                position:"sticky",
                top:"0",
                backgroundColor:"white",
              }}
              className="hand" onClick={sort('firstName')}>
                Nom
              </th>
              <th 
              style={{
                fontSize:"14px",
                position:"sticky",
                top:"0",
                backgroundColor:"white",
              }}
              className="hand" onClick={sort('lastName')}>
                Prénom  
              </th>
              <th 
              style={{
                fontSize:"14px",
                position:"sticky",
                top:"0",
                backgroundColor:"white",
              }}
              className="hand" onClick={sort('birthday')}>
               Date
              </th>
              <th 
              style={{
                fontSize:"14px",
                position:"sticky",
                top:"0",
                backgroundColor:"white",
              }}
              className="hand" onClick={sort('birthplace')}>
                Heure 
              </th>
                  
              <th
              style={{
                fontSize:"14px",
                position:"sticky",
                top:"0",
                backgroundColor:"white",
              }}
              >Actions</th>
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor:"#F6FAFF",
              border:"1px solid #F6FAFF",
              borderRadius:"15px 15px 0px 15px",
              fontSize:"14px",
              borderBottom:"50px solid white",
            }}
          >
         {consultationList.map((consultation, i) => (
            <tr key={`entity-${i}`} data-cy="entityTable">               
                <td>
                  <Button
                    tag={Link}
                    to={`/consultation/${consultation.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}                        data-cy="entityDeleteButton"
                    style={{color:"red",backgroundColor:"#F6FAFF",borderColor:"#F6FAFF"}}
                  >
                    {React.createElement( BiTrash, {size: "15"})}
                  </Button>
                </td>
               
              {patientList.map( (patient,b) => (( consultation.patient.lastName === patient.lastName && consultation.patient.id === patient.id) ? (
               <>
               <td>
                <Button tag={Link} to={`/patient/${patient.id}`} color="link" size="sm">
                  {patient.id}
                </Button>
              </td>
              <td>{patient.lastName}</td>
              <td>{patient.firstName}</td>
              <td>
                 {consultation.dateTime ? <TextFormat type="date" value={consultation.dateTime} format="DD/MM/YYYY" /> : null}
               </td>
               <td>
                 {consultation.dateTime ? <TextFormat type="date" value={consultation.dateTime} format="HH:mm:ss"/> : null}
               </td>
               <td >
                  <div 
                    style={{
                      display:"flex",
                      flexDirection:"row",
                      gap:"3px",
                      fontSize:"9px"
                    }}
                  >
                     <Button
                      tag={Link}
                      to={`/consultation/${consultation.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="primary"
                      size="sm"
                      data-cy="entityEditButton"
                    >
                        <span className="d-none d-md-inline">Mettre à jour</span>
                    </Button>
                    <Button tag={Link} to="#" color="dark" size="sm" data-cy="entityDetailsButton">
                        <span className="d-none d-md-inline">Voir sa liste</span>
                    </Button>
                   

                  </div>
                </td>
               </>
               
              ):(null)))}
              

               
             </tr>
           ))}
 


          </tbody>
            </Table>) : (
       !loading && <div className="alert alert-warning">Aucun Consultation trouvé</div>
     )}
     </Card> */}
   </div>
   

        
      </div>


);
};
export default ConsultationPatient;