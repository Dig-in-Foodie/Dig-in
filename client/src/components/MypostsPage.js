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
            const response = await fetch(`/posts/${userId}`)
            //     headers: {
            //         'Authorization' : `Bearer ${token}`
            //     },
            // });
            // console.log(response) tral 
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
            <h1>My foodies</h1>
            {userPosts.map((post)=>{
                <Card key={post.id}>
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.description}</Card.Text>
                    </Card.Body>
                </Card>
            })}
        </div>
    )
}

export default MyPostPage;