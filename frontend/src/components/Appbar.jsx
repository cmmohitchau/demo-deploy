import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue} from 'recoil';
import { LoginAtom } from "../atoms/LoginAtom";

export function Appbar() {
  const navigate = useNavigate();
  const [LoginAtomValue , SetLoginAtom] = useRecoilState(LoginAtom);
  
    return(
        <>     

          <nav className="bg-white border-b">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between  p-4">
              <div className="flex ">
                <Link to={'/'}><div className="flex flex-col justify-center font-bold text-2xl">Blog Master</div></Link>
                                <div className="relative flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 absolute left-4 text-black-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"
                    />
                  </svg>
                  <input
                    type="text"
                    className="border rounded-full h-10 w-42 bg-gray-200 pl-10 py-2 text-left outline-none"
                    placeholder="Search"
                  />
                </div>

              </div>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex justify-between space-x-3">
                <div>
                {!LoginAtomValue && <button type="button" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500" onClick={ (e) => {
                  navigate('/signin')
                }}>Login</button>}
                </div>

                  <div>
                {LoginAtomValue && <button type="button" className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500" onClick={ (e) => {
                  navigate('/editor')
                }}>new</button>}
                </div>
                <div>
                {LoginAtomValue && <button type="button" className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-500" onClick={ (e) => {
                  localStorage.clear();
                  navigate('/signin')
                  SetLoginAtom(false)
                }}>Logout</button>}
                </div>
                </div>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link to={'/blogs'}>
                  <span className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 " aria-current="page">Home</span>
                  </Link>
                </li>
                <li>
                <Link to={'/'}>
                  <span className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent ">About</span>
                  </Link>
                </li>
                <li>
                <Link to={'/'}>
                  <span  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent ">Services</span>
                  </Link>
                </li>
                <li>
                <Link to={'/'}>
                  <span className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent ">Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
            </div>
          </nav>

        </>
    )
}

function Contact() {
  return(
      <>
          <div>
              <a href="">Mohit Chaudhary</a>
          </div>
          <div>
              <a href="">Lakshay</a>
          </div>
          <div>
              <a href="">Raushan</a>
          </div>
          <div>
              <a href="">Kunal Kumar</a>
          </div>
      </>
  )
}