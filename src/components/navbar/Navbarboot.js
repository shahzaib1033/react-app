import React from 'react'
import { AiOutlineShoppingCart, AiOutlineDashboard } from 'react-icons/ai'
import { Navbarwrapper } from './style'
import {RiAccountCircleFill} from "react-icons/ri";

import { useNavigate } from 'react-router-dom';
export default function Navbarboot() {
    const navigate = useNavigate();
    return (
        <Navbarwrapper>
            <div className='navBarSection'>
                <h2>ADMIN</h2>

                <div className='links'>
                    <div className='container' onClick={() => navigate('/')}>
                        <AiOutlineDashboard size={35} />
                        <span className='text'> Dashboard</span>
                    </div>
                    <div className='container' onClick={() => navigate('/products')}>
                        <AiOutlineShoppingCart size={35} />
                        <span className='text'> Products</span>
                    </div>

                    <div className='container' onClick={() => navigate('/accounts')}>
                        <RiAccountCircleFill size={35} />
                        <span className='text'> Accounts </span>
                    </div>
                </div>
                    <div className='logout' onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login')
                    }}>
                        <a>logOut</a>
                    </div>
            </div>
        </Navbarwrapper>
    )
}


    // <Navbar bg="light" expand="lg">
    //     <Container>
    //         <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //         <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="me-auto">
    //                 <Nav.Link href="#home">Home</Nav.Link>
    //                 <Nav.Link href="#link">About</Nav.Link>
    //                 <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //                     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.2">
    //                         Another action
    //                     </NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //                     <NavDropdown.Divider />
    //                     <NavDropdown.Item href="#action/3.4">
    //                         Separated link
    //                     </NavDropdown.Item>
    //                 </NavDropdown>
    //             </Nav>
    //         </Navbar.Collapse>
    //     </Container>
    // </Navbar>