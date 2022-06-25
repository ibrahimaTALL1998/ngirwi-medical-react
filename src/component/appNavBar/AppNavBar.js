import Ngirwi_Logo from './Ngirwi_Transparent.png';
import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBCollapse
} from 'mdb-react-ui-kit';


function AppNavBar() {
    const [showBasic, setShowBasic] = useState(false);

    return (
        <><header fixed>
            <MDBNavbar expand='lg' light bgColor='light' fixed="top">
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/home'>
                        <img src={Ngirwi_Logo} style={{ display: "flex", maxWidth: '10%', maxHeight: '20%' }} />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowBasic(!showBasic)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showBasic}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <MDBNavbarLink active aria-current='page' href='/home'>
                                    Accueil
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag='a' className='nav-link'>
                                        Patients
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem>
                                            <MDBDropdownLink href="/add-patient">Enregistrer Patient</MDBDropdownLink>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem>
                                            <MDBDropdownLink href="/patients">Liste Patient</MDBDropdownLink>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                        </MDBNavbarNav>

                        <MDBNavbarLink active aria-current='page' href='/'>
                            Déconnexion
                        </MDBNavbarLink>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </header><br></br><br></br><br></br><br></br></>
    );
}

export default AppNavBar;
