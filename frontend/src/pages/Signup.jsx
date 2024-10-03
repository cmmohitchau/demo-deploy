import { Header } from "../components/Header";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LoginAtom } from "../atoms/LoginAtom";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../../config";
import { Link , useNavigate } from "react-router-dom";


export function Signup() {
const [postInputs , setPostInputs] = useState({
    firstName : "",
    lastName : "",
    username : "",
    password : ""
})

const navigate = useNavigate();
const SetLoginAtom = useSetRecoilState(LoginAtom);


return(
    <>
        <Appbar />
        <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-200">

    <div className="flex h-screen justify-center" >
        <div className="flex flex-col justify-center">
            <div className="h-max w-min-90 rounded-lg p-2 px-2 text-center bg-white border ">
                <Header label={"Create an account"}/>
                <div className="font-sm text-xl flex">
                    Already have an account? 
                    <Link to={'/signin'}>
                        <div className="pl-2 underline">
                            Log in
                        </div>
                    </Link>
                </div>

                <InputBox label={"Firstname"} placeholder={"mohit"} onChange={ (e) => {
                    setPostInputs(c => ({
                        ...c,
                        firstName : e.target.value
                    }))
                }}/>
                <InputBox label={"lastname"} placeholder={"chaudhary"} onChange={ (e) => {
                     setPostInputs(c => ({
                        ...c,
                        lastName : e.target.value
                    }))
                }}/>
                <InputBox label={"username"} placeholder={"cmmohitchau@gmail.com"} onChange={ (e) => {
                     setPostInputs(c => ({
                        ...c,
                        username : e.target.value
                    }))
                }}/>
                <InputBox label={"password"} type="password" placeholder={"12345"} onChange={ (e) => {
                    setPostInputs(c => ({
                        ...c,
                        password : e.target.value
                    }))                    }}/>
                <Button label={"Signup"} onClick={async () => {
                    try {
                        const res =await axios.post(`${BACKEND_URL}/api/v1/user/signup` , postInputs)
                        localStorage.setItem("token" , res.data.token);
                        SetLoginAtom(true);
                        navigate('/blogs')
                    } catch(e) {
                        console.error("signup failed" , e)
                    }
                }} />
            </div>
        </div>
    </div>
    </div>
    </>

)
}