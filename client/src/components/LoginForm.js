import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const LoginForm =({handleCloseModal})=>{
    const navigate = useNavigate()
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault()
        // add here the login form submission logic from back end
        try{
        const response = await fetch('/login',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok){
                const data= await response.json()
                console.log(data)
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId',data.userId)
                console.log(data)
                handleCloseModal()
                navigate('/dashboard'); //to redirect to dashboard page
            }else{
                const errorData = await response.json()
                console.log('Login failed:', errorData.message)
            }
        }catch(error){
            next(error)
        }
           


        //reset the form fields
        setUsername('')
        setPassword('')
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="login-form-email">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
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