import { Appbar } from '../components/Appbar';
import myImage from '../assets/images/image.jpg'
import { useNavigate } from 'react-router-dom';
export function Landing() {
  const navigate = useNavigate()
  return (
    <>
      <Appbar />
      <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-200">

      <div className="flex flex-col items-center mt-10 px-5 text-center">


        <h1 className="font-bold text-6xl max-w-3xl">
          Where developer blogs meet community power!
        </h1>


        <p className="text-xl mt-5 max-w-xl text-gray-600">
          Create and grow your developer blog, newsletter, or team engineering blog effortlessly with Blog Master. 
        </p>

        <div className="mt-4 flex space-x-4">
          
          <button className="px-6 py-2 text-white bg-blue-600 rounded-lg  hover:bg-blue-500" onClick={ (e) => {
            navigate('/signin')
          }}>
            Log in
          </button>
          <button className="px-6 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800">
            Get started
          </button>
        </div>

        {/* Below Content */}
        <div className="mt-16 transform-gpu transition duration-700 hover:-translate-y-48">
          {/* You can add an image or other content here */}
          <img src={myImage} alt="Preview UI" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
    </>
  );
}
