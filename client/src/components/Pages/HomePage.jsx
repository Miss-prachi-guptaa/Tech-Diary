import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllBlogs } from "../../api/blog.api.js";
import { BlogCard } from "../blog/BlogCard.jsx";
import { fetchSearchResults } from "../../services/searchService.js";

export const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // reads ?q= from the URL automatically
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q'); // "docker" or null

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (searchQuery) {
          // URL has ?q= → fetch search results
          const results = await fetchSearchResults(searchQuery);
          setBlogs(results);
        } else {
          // normal feed — your existing code unchanged
          const res = await getAllBlogs();
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]); // re-runs whenever URL query changes

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl space-y-6">

        {/* Show search header when searching */}
        {searchQuery && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-dust_grey-700">
              {blogs.length} results for
              <span className="text-powder_petal-900 font-medium ml-1">
                "{searchQuery}"
              </span>
            </p>
          </div>
        )}

        {/* No results found */}
        {blogs.length === 0 && !loading && (
          <p className="text-center text-dust_grey-700 mt-10">
            {searchQuery
              ? `No blogs found for "${searchQuery}"`
              : "No blogs available"
            }
          </p>
        )}

        {/* Blog cards — same component, works for both feed and search */}
        {blogs.map(blog => (
          <BlogCard key={blog._id} blog={blog} />
        ))}

      </div>
    </div>
  );
};