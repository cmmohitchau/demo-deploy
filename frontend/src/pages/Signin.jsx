import { useState } from "react";
import { Header } from "../components/Header";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import { Appbar } from "../components/Appbar"
import { LoginAtom } from "../atoms/LoginAtom";
import { Link , useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from 'axios'

export function Signin() {
    const [postInputs , setPostInputs] = useState({
        username : "",
        password : ""
    })
    const navigate = useNavigate()
    const SetLoginAtom = useSetRecoilState(LoginAtom);
    
   
    return(
        <>
            <Appbar />
            <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-200">


            <div className="flex h-screen justify-center bg-center bg-cover" >
            <div className="flex flex-col justify-center">
                <div className="h-max w-80 rounded-lg p-2 px-2 text-center bg-white border">
                    <Header label={"Sign In"} />
                    <div className="pl-2 font-sm text-xl flex">
                    Don't have an account?     
                    <Link to={'/signup'}>
                        <div className="pl-2 underline">
                             Sign up
                        </div>
                    </Link>
                </div>
                    <InputBox label={"username"} placeholder={"cmmohitchau@gmail.com"} onChange={ (e) => {
                        setPostInputs( c => ({
                            ...c,
                            username : e.target.value 
                        }))
                    }}/>
                    <InputBox label={"password"} type={"password"} placeholder={"12345"} onChange={ (e) => {
                        setPostInputs( c => ({
                            ...c,
                            password : e.target.value
                        }))
                    }}/>
                    <Button label={"Sign in"} onClick={async () => {
                        const res = await axios.post("http://localhost:3000/api/v1/user/signin", postInputs)
                        const token = res.data.token;
                        localStorage.setItem('token' , token)
                        SetLoginAtom(true);
                        console.log("before");
                        navigate('/blogs');
                        console.log("after");
                        
                    }}/>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}