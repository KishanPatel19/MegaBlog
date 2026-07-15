import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function AuthLayout({children,authentication = true}) {
    const navigate= useNavigate()
    const authStatus = useSelector(state=>state.auth.status)
    const [loader,setLoader] = useState(true)

    useEffect(()=>{
        if(authentication){
            if(!authStatus){
                navigate("/login")
            }
        }else{
            if(authStatus){
                navigate('/')
            }
        }
        setLoader(false)
    },[navigate,authStatus,authentication])

  return loader ? <div>Loading...</div>:<>{children}</>
}

export default AuthLayout   