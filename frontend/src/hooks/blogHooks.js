import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { LoginAtom } from "../atoms/LoginAtom";
import { useSetRecoilState } from "recoil";

export function useBlogs() {
    const [loading , setLoading] = useState(true);
    const [blogs , setBlogs] = useState([]);
    const setLoginAtom = useSetRecoilState(LoginAtom);


    useEffect( ()=> {
        const token = localStorage.getItem("token")
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(response => {
            setBlogs(response.data.blogs),
            setLoading(false)
            setLoginAtom(true);

        })
    } , [])




    return{
        blogs,
        loading
    }
    
}

export function useBlog({id}) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState({});
    const [authorized , setAuthorized] = useState(false);
    const setLoginAtom = useSetRecoilState(LoginAtom);
    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setLoading(false);
                    setBlog(response.data.blog);
                    setLoginAtom(true);
                    {response.data.owner ? setAuthorized(true) : setAuthorized(false)}
                    console.log("authorized from frontend" ,authorized);

                })
        } catch (e) {
            console.error(e);
        }
        
    }, [id]);

    return {
        loading,
        blog,
        authorized
    };

}