import { Link } from "react-router-dom";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-3 line-clamp-2">{blog.title}</h2>

      {/* Content Snippet */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.content}</p>

      {/* Author & Date */}
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>✍️ {blog.author}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      {/* Likes & Read More */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-red-600">
          <SolidHeartIcon className="w-5 h-5" />
          <span>{blog.likes}</span>
        </div>

        <Link
          to={`/blog/${blog.id}`}
          className="text-blue-600 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
