import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap'

const LoginForm =({handleCloseModal})=>{
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault()
        // add here the login form submission logic from back end
        let response;
        fetch('/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
            .then((res)=>{
                response= res;
                return res.json()
            })
            .then((data)=>{
                console.log(data)
                handleCloseModal()
            })
            .catch((error)=>{
                    console.error(error)
                })


        //reset the form fields
        setEmail('')
        setPassword('')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="login-form-email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="login-form-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}

export default LoginForm