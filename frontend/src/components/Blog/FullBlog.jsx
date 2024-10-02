// Fullblog.jsx

import { Avatar } from "./BlogCard";
import { Appbar } from "../Appbar";
import { useState, useRef, useEffect } from "react";
import { BACKEND_URL } from "../../../config";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios'; // Added axios import

const Fullblog = ({ blog , authorized , id}) => {
    return (
        <div className="">
            <Appbar />
            <div className="flex justify-center min-h-screen pl-10">
                <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-2xl">
                    <div className="col-span-8">
                        <div className="text-5xl font-bold font-sans">
                            {blog.title}
                        </div>
                        <div className="text-base font-medium text-slate-500 pt-3">
                            Posted on {blog.date.slice(0, 10)} {blog.date.slice(11, 19)}
                        </div>
                        <div className="flex border-y py-4 justify-between">
                            <LikedButton />
                            {authorized ? <Menu id={id} /> : null}
                        </div>
                        <div className="pt-6 font-sans text-xl">
                            {blog.content}
                        </div>
                    </div>

                    <div className="col-span-4">
                        <div className="font-sans text-lg text-gray-500">
                            Author :-
                        </div>
                        <div className="flex w-full">
                            <div className="pr-2 flex flex-col justify-center">
                                <Avatar name={blog.authorId?.firstName || "Anonymous"} size="big" />
                            </div>
                            <div className="">
                                <div className="font-mono text-xl font-bold">
                                    {blog.authorId?.firstName || "Anonymous"}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    <p>Random catchy phrase about the author's ability to grab the user's attention</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function LikedButton() {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);

    return (
        <div>
            <div className="flex">
                <div className="pr-8">
                    <button
                        className={`cursor-pointer transition-opacity duration-300 ${liked ? "" : "hover:opacity-50"}`}
                        onClick={() => {
                            setLiked(!liked);
                            liked ? setCount(count - 1) : setCount(count + 1);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill={liked ? "red" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 transition-all duration-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                            />
                        </svg>
                    </button>
                </div>
                <div>
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                {count > 0 && (
                    <span>
                        {count} {count > 1 ? "Likes" : "Like"}
                    </span>
                )}
            </div>
        </div>
    );
}

export function Menu({id}) {
    const [isOpen, setIsOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const dropdownRef = useRef(null);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate()

    const deleteBlog = () => {
        const token = localStorage.getItem('token');
        axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
            .then(response => {
                setMsg(response.data.msg);
                setShowConfirm(false);
                setIsOpen(false);
                navigate('/blogs')
            })
            .catch(error => {
                console.error("Error deleting blog:", error);
            });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                id="dropdownDefaultButton"
                onClick={() => setIsOpen(!isOpen)}
                className="pr-8"
                type="button"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                </svg>
            </button>

            {isOpen && (
                <div
                    id="dropdown"
                    className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow z-10"
                >
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
                                Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                                onClick={() => {
                                    setShowConfirm(true)}}
                            >
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )}

            {showConfirm && (
                <div className="absolute right-0 mt-2 w-64 bg-white p-4 rounded-lg shadow z-20">
                    <span>Are you sure you want to delete this blog?</span>
                    <div className="flex justify-between mt-4">
                        <button
                            className="px-4 py-2 border rounded-lg"
                            onClick={() => setShowConfirm(false)}
                        >
                            No
                        </button>
                        <button
                            className="px-4 py-2 border rounded-lg bg-red-500 text-white"
                            onClick={deleteBlog}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {msg && (
                <div className="mt-2 text-green-500">
                    {msg}
                </div>
            )}
        </div>
    );
}

export default Fullblog;
