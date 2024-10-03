import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
export function PostBlog() {
    const [post , setPost] = useState({
        title : "",
        content: ""
    })
    const navigate = useNavigate()
    return(
        <div className="h-screen w-screen ">
            <Appbar />
            <div className="flex justify-center mt-6">
                <input type="text" placeholder="Title" className="focus:bg-gray-50 block p-4 w-4/5 text-base font-bold text-2xl focus:ring-blue-500 rounded-lg" onChange={(e) => [
                    setPost(c => ({
                        ...c,
                        title : e.target.value
                    }))
                ]} />
            </div>
            <div className="flex w-screen-4/5 justify-center ">
                <textarea rows="4" className="block p-2.5 w-4/5 text-sm 
                rounded-lg focus:ring-blue-500 focus:bg-gray-50 focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e) => {
                    setPost(c=> ({
                        ...c,
                        content : e.target.value
                    }))
                }}></textarea>

            </div>
            <div className="flex justify-end mr-20">
                <Button label={"Publish"} onClick={(e) => {
                    const token = localStorage.getItem("token");
                    try {
                    const response = axios.post(`${BACKEND_URL}/api/v1/blog` , post,{
                        headers : {
                            authorization : `Bearer ${token}`
                        }
                    })
                    navigate('/blogs')
                } catch(e) {throw e;}
                }} />
            </div>

        </div>
    )
}

function Button({label, onClick}) {
    return (<button onClick={onClick} type="button" className="text-white bg-green-700 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 my-4">{label}</button>
)}