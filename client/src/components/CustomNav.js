import React, { useState } from 'react'
import { Navbar, Nav , Modal, Button} from 'react-bootstrap'
import logoimg from '../image/logo dig in.png'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

 function CustomNav(){
    const [formType, setFormType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

   

   const handleShowModal = (type)=>{
      setFormType(type)
      setIsModalOpen(true)
   };

   const handleCloseModal =() =>{
      setIsModalOpen(false);
   }
   const renderForm =()=>{
      if(formType === 'login'){
         return <LoginForm handleCloseModal={handleCloseModal}/>
            }else if(formType === 'register'){
               return <RegisterForm  handleCloseModal={handleCloseModal}/>;
            }
            return  null
   };

    return(
      <>
      <Navbar bg='black' variant='black' expand='lg'>
         <Nav className='mx-auto'>
         <Navbar.Brand >
            <img
         src={logoimg}
         width= '100'
         height='100'
         className='d-inline-block align-top'
         alt='Logo'
      />
     
         </Navbar.Brand>
         </Nav>
         <Navbar.Toggle aria-controls='basic-navbar-nav'/>
         <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
            <Nav className='ml-auto'>
               <Nav.Link  style={{color: 'white'}} onClick={()=> handleShowModal('login')}>Login</Nav.Link>
               
               
               <Nav.Link style={{color: 'white'}} onClick={()=> handleShowModal('register')}>Register</Nav.Link> 
            </Nav>
         </Navbar.Collapse>
      </Navbar>

      <Modal show={isModalOpen} onHide={handleCloseModal}>
         <Modal.Header closeButton>
            <Modal.Title>{formType === 'login' ? 'Login' : 'Register'}</Modal.Title>
         </Modal.Header>

      <Modal.Body>{renderForm()}</Modal.Body>
      <Modal.Footer>
         <Button variant='secondary' onClick={handleCloseModal}>
            Close
         </Button>
      </Modal.Footer>
      </Modal>
      </>
      
    );
 };

 export default CustomNav;