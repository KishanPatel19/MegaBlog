import React, { useEffect, useState } from 'react'
import  appwriteService  from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'

function AllPost() {
    const[posts,setPosts]=useState([])
    useEffect(()=>{
        appwriteService.getPosts([])
        .then((posts)=>{
            if(posts){
                setPosts(posts.rows)
            }
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post)=>(
                        <div key={post.$id}>
                            <PostCard {...post}/>
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPost