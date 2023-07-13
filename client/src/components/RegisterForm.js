import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap'

const RegisterForm = ({handleClosetModal}) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // handle register logic here
        try{
            const response = await fetch('/register',{
                method:'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if(response.ok){
                const data = await response.json();
                console.log(data)
                handleClosetModal()
            }else{
                console.log('Registration failed')
            }
        }catch(error){
            console.error(error)
        }
        //reset form fields
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="register-form-email">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="register-form-password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="register-form-confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
};


export default RegisterForm;