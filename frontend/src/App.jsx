import { BrowserRouter , Routes , Route } from "react-router-dom"
import { Landing } from "./pages/Landing"
import Blogs from "./pages/Blogs"
import Blogid from "./pages/Blog"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { PostBlog } from "./pages/PostBlog"
import { RecoilRoot } from "recoil"


function App() {
  

  return (
    <>
      <RecoilRoot>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/editor" element={<PostBlog />} />
        <Route path="/blog/:id" element={<Blogid />} />
      </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
