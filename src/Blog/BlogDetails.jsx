import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createClient } from 'contentful';
import '../css/BlogDetails.css'; // Importing the CSS file

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const client = createClient({
    space: '7fgmlwcyh00y', // Replace with your space ID
    accessToken: 'iUgrqhndli0c2USpxiyn3c7Z7VGYT3jE2igLYvOqzpI', // Replace with your access token
  });

  useEffect(() => {
    const getBlogPost = async () => {
      try {
        const entry = await client.getEntry(id);
        setBlog(entry);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError('Blog post not found.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getBlogPost();
    }
  }, [id]);

  if (loading) return <p className="loading">Loading blog details...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="blog-details-container">
      <button className="go-back-button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      
      {blog && (
        <div className="blog-content">
          <h1 className="blog-title">{blog.fields.blogTitle || 'No Title'}</h1>
          <p className="blog-summary">{blog.fields.blogSummary || 'No summary available.'}</p>
          <div className="blog-image-container">
            <img
              src={blog.fields.blogImage.fields.file.url}
              alt={blog.fields.blogTitle || 'Blog Image'}
              className="blog-image"
            />
          </div>
          <div className="blog-body">
            <p>{blog.fields.postContent || 'No content available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
