import React, { useEffect, useState } from "react";
import {Card} from 'react-bootstrap'

const MyPostPage = ()=>{
    const [userPosts, setUserPosts] = useState([])

    useEffect(()=>{
        fetchUsersPosts()
    }, [])

    const fetchUsersPosts = async () =>{
        try{
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const response = await fetch(`https://dig-in.onrender.com/posts/${localStorage.getItem('userId')}`,{
                headers: {
                    'Authorization' : `Bearer ${token}`,
                },
            });
            
            if(response.ok){
                const posts= await response.json();
                setUserPosts(posts)
            }else{
                console.log('failed to fetch users posts')
            }
        }catch(error){
            console.error(error)
        }
    };
    return(
        <div>
            <h1 style={{color: 'white', margin: 20}}>My foodies</h1>
            <Row>
            {userPosts.map((post)=>(
                <div key={post.id}className ='col-lg-5 mb-4'>
            )
                <Card style={{width: '100%', margin: 20}}>
                    <Card.Img variant="top" src={post.image}/>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {post.country},{post.city}
                        </Card.Subtitle>
                        <Card.Text>{post.description}</Card.Text>
                    </Card.Body>
                </Card>
        </div>
            ))}
    
    </Row>
    </div>
    );
};

export default MyPostPage;