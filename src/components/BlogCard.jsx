import { Link } from "react-router-dom";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white/95 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900">
          {blog.title}
        </h2>

        {/* Content Snippet */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {blog.content}
        </p>
      </div>

      {/* Bottom Section */}
      <div>
        {/* Author & Date */}
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <span>✍️ {blog.author}</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Actions */}
        <div className="flex justify-between items-center">
          {/* Stats */}
          <div className="flex items-center gap-5 text-sm text-gray-600">
            {/* Likes */}
            <div className="flex items-center gap-1 hover:text-red-600 transition">
              <HandThumbUpIcon className="w-5 h-5" />
              <span>{blog.likes}</span>
            </div>

            {/* Dislikes */}
            <div className="flex items-center gap-1 hover:text-gray-800 transition">
              <HandThumbDownIcon className="w-5 h-5" />
              <span>{blog.dislikes}</span>
            </div>

            {/* Comments */}
            <div className="flex items-center gap-1 hover:text-blue-600 transition">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <span>{blog.commentCount}</span>
            </div>
          </div>

          {/* Read More */}
          <Link
            to={`/blog/${blog.id}`}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
