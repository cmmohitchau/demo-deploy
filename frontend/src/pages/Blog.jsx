import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/blogHooks";
import Fullblog from "../components/Blog/FullBlog";
import SkeletonFullblog from "../components/Blog/Skeleton";

const Blogid = () => {
  const { id } = useParams();
  const { loading, blog, authorized } = useBlog({
    id: id || ""
  });

  if (loading || !blog) {
    return <SkeletonFullblog />
  }

  return (
    <div className="">
      <Fullblog blog={blog} authorized={authorized} id={id} />
    </div>
  )
}

export default Blogid