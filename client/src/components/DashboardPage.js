import React, {useEffect, useState} from 'react'
import {Button, Card,Modal, Form, Row} from 'react-bootstrap'
import CustomNav from './CustomNav'

const DashboardPage =()=>{
    const [showModal, setShowModal] = useState(false)
    const [foodiePosts, setFoodiePosts]= useState([])
    const [foodieData, setFoodieData] = useState({
        title: '',
        image: '',
        country: '',
        city: '',
        description: '',
    })

    useEffect(()=>{
        fetchFoodiePosts();
    }, []);

    const fetchFoodiePosts = async () =>{
        try{
            const response = await fetch('/posts')
            const posts = await response.json();
            setFoodiePosts(posts)
        }catch(error){
            console.error(error)
        }
    };

    const handleCloseModal = ()=>{
        setShowModal(false)
    };

    const handleShowModal = () =>{
        setShowModal(true)
    };

    const handleInputChange = (e) =>{
        setFoodieData({ ...foodieData, [e.target.name]: e.target.value});
    }

    const handleCreateFoodie = async ()=>{
        try{
            const response = await fetch('/posts',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(foodieData),
            });

            if(response.status === 201){
                //foodie created succesfully
                handleCloseModal();
                fetchFoodiePosts();
            }else if(response.status === 401){
                //user is not authenticated
                const errorData = await response.json()
                alert(errorData.message)
            }else{
                const errorData = await response.json()
                alert(errorData.message)
            }
        }catch(error){
            console.error(error)
        }
    };
  


    return(
        <div>
            <CustomNav />
        
        <div>
            <div className='dashboard-name'>
            <h1 style={{color: 'white', margin:20}}>Welcome to the foodie dashboard !</h1>

            </div>

            <Button variant='secondary' style={{margin:20}} onClick={handleShowModal}>
                Create your foodie post
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Foodie Post</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='foodie-title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                            type='text'
                            name='title'
                            value={foodieData.title}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId='foodie-image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control 
                            type='text'
                            name='image'
                            value={foodieData.image}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId='foodie-country'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control 
                            type='text'
                            name='country'
                            value={foodieData.country}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId='foodie-city'>
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                            type='text'
                            name='city'
                            value={foodieData.city}
                            onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId='foodie-description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            type='textarea'
                            rows={3}
                            name='description'
                            value={foodieData.description}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleCreateFoodie}>
                        Save Foodie
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* foodie posts */}
            <Row>
            {foodiePosts.map((post)=>(
            <div key={post.id} className='col-lg-5 mb-4'>
                <Card  style={{width: '100%',margin:20}}>
                    <Card.Img variant='top' src={post.image}/>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>
                            {post.country},{post.city}
                        </Card.Subtitle>
                        <Card.Text>{post.description}</Card.Text>
                    </Card.Body>
                </Card>
                </div>
                
            ))}
            </Row>
        </div>
    </div>
    );
};

export default DashboardPage