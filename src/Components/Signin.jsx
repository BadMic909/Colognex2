import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { UserAuth } from "../Context/AuthContext"
    const Signin = () => {
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [error, setError]= useState("")
    const [loading, setLoading]= useState("")

    const { session , signIn } = UserAuth();
    const navigate=useNavigate()
    console.log(session);

    const handleSignIn= async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            const result=await signIn(email,password)
            if(result.success){
                navigate('/dashboard')
            }
        }catch (err){
                setError("an error occured")
            } finally{
                setLoading(false)
        }
    }
    return(
        <div><form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
            <h2 className='font-bold pb-2'>Sign in</h2>
            <p>Don't have an account? <Link to="/signup">Sign up!</Link></p>
            <div className="flex flex-col py-4">
                <input onChange={(e)=>setEmail(e.target.value)} placeholder="email" type="email" className="p-3 m-6"/>
                <input onChange={(e)=>setPassword(e.target.value)}placeholder="password" type="password" className="p-3 m-6"/>
                <button type="submit" disabled={loading} className="mt-6 w-full">Sign in</button>
                {error && <p className="text-red-600 text-center">{error}</p>}
            </div>
        </form></div>
    )
}
export default Signin