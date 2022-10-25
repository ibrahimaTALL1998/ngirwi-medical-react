import './header.scss';

import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { ValidatedField } from 'react-jhipster';
import { useAppSelector } from 'app/config/store';
import { AiOutlineSearch } from 'react-icons/ai';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isOpenAPIEnabled: boolean;
}

const Header = (props) => {



  const patientLists = useAppSelector(state => state.patient.entities);
  const [query, setQuery] = useState("")

  

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div style={{display:"flex", flexDirection:"row",gap:"50vw", fontFamily:"Jost", fontSize:"20px" , zIndex:"1", position:"absolute", top:"0"}}>
    <span>{props.pageName}</span>  
    <div style={{display:"flex", flexDirection:"row", alignItems:"flex-start", gap:"2vw"}}> 
  <div style={{display:"flex", flexDirection:"column"}}>
  
  <span style={{position:"absolute", top:"2%",marginLeft:"1%"}}>{React.createElement(AiOutlineSearch, {size : '13'} )}</span> 
   <ValidatedField name='search'  placeholder="   Rechercher..." onChange={event =>setQuery(event.target.value)} style={{backgroundColor:"#F9F9FB", fontFamily:"Mulish", fontWeight:"900",borderRadius:"15px",height:"5vh",borderColor:"#F9F9FB",fontSize:"10px",paddingLeft:"30px"}} />
      {  
      patientLists.filter(post => {
      if (query === "") {
      
        post = "Recherche de patients..."
        return post;
      } else if (post.lastName.toLowerCase().includes(query.toLowerCase())) {
       
        return post;
      }else if (post.firstName.toLowerCase().includes(query.toLowerCase())) {
       
        return post;
      }
    }).map((patient, i)=>

      <Link hidden={query===""?true:false} key={patient.id} to={`/patient/${patient.id}`} style={{backgroundColor:"white",margin:"0px",position:"sticky",top:"0",borderColor:"#F9F9FB",color:"#11485C", borderRadius:"3px",textDecoration:"none",height:"5vh",fontSize:"13px"}}>{patient.firstName+' '+patient.lastName}</Link>
    


           )

      }
    
  </div>

      <Link to="/logout" style={{color:"silver", fontWeight:"900"}}>
        <div>{React.createElement(FiLogOut)} </div>
      </Link>
    </div>
  </div>
  );
};

export default Header;
