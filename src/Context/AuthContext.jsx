import { createContext,useEffect,useState,useContext } from "react";
import {supabase} from "../supabaseclient"
const AuthContext= createContext()

export const AuthContextProvider =({children}) => {
    const[session,setSession] = useState(undefined)
    //Sign up
    const signUpNewUser =async(email,password)=>{
        const{data,error} = await supabase.auth.signUp({
        email: email,
        password: password,
        });
        if(error){
            console.error("problem signing up:", error);q
            return{success:false, error};
        }
        return {success:true,data};
    };
    //sign in
    const signIn =async(email,password)=>{
        try{
            const{data,error} = await supabase.auth.signInWithPassword({
                email: email,
                password:password,
            });
            if(error){
                console.error("sign in error occured:", error);
                return{success:false,error:error.message}
            }
            console.log("sign in success:",data);
            return{success:true,data};
        }
            catch(error){
            console.error("an error occured", error)
        };

        if(error){
            console.error("problem signing up:", error);
            return{success:false, error};
        }
        return {success:true,data};
    };

    useEffect(()=> {
        supabase.auth.getSession().then(({data:{session}}) => {
            setSession(session);
        })

        supabase.auth.onAuthStateChange((_event, session) =>{
            setSession(session);
        })
    },[])

    //sign out
    const signOut = () => {
        const{error} =supabase.auth.signOut();
        if(error){
            console.error("there was an error", error);
        }
    }
    return(
        <AuthContext.Provider value={{session, signUpNewUser, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () =>{
    return useContext(AuthContext);
}