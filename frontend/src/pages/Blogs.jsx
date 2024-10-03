import { Appbar } from "../components/Appbar";
import BlogCard from "../components/Blog/BlogCard";
import { useBlogs } from '../hooks/blogHooks';

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  const SkeletonBlogCard = () => (
    <div className="animate-pulse mb-4 mt-4 ">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-20 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );

  return (
    <div>
      <Appbar />
      <div className='flex justify-center'>
        <div className='w-full max-w-2xl'>
          {loading ? (
            // Skeleton loading state
            <>
              <SkeletonBlogCard />
              <SkeletonBlogCard />
              <SkeletonBlogCard />
            </>
          ) : blogs && blogs.length > 0 ? (
            // Render actual blog cards when data is available
            blogs.map(blog => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                authorName={blog.authorId.firstName || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.date}
              />
            ))
          ) : (
            <div>No blogs available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;