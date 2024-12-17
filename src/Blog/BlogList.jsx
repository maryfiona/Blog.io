import { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Contentful client configuration
  const client = createClient({
    space: '7fgmlwcyh00y', // Replace this with your own space ID
    accessToken: 'iUgrqhndli0c2USpxiyn3c7Z7VGYT3jE2igLYvOqzpI', // Replace this with your own access token
  });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const entries = await client.getEntries();
        setBlogPosts(entries.items || []); // Store blog items
      } catch (error) {
        console.error(`Error fetching blog posts: ${error.message}`);
        setError('Failed to fetch blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getAllEntries();
  }, []);

  return (
    <div id="layout" className="pure-g">
      <div className="content pure-u-1 pure-u-md-3-4">
        <h1 className="content-subhead">Latest Blog</h1>

        {/* Loading state */}
        {loading && <p>Loading blog posts...</p>}
        {/* Error state */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Blog Posts Rendering */}
        {blogPosts.map((post) => (
          <section className="post" key={post.sys.id}>
            <header className="post-header">
              {/* Blog Image */}
              {post.fields.blogImage && post.fields.blogImage.fields.file.url && (
                <img
                  src={post.fields.blogImage.fields.file.url}
                  alt={post.fields.blogTitle || 'Blog Image'}
                  width="578"
                  height="291"
                />
              )}

              {/* Blog Title */}
              <h2 className="post-title pt-3">{post.fields.blogTitle || 'No Title'}</h2>

              {/* Blog Meta Information */}
              <p className="post-meta">
                By{' '}
                <a href="https://thecodeangle.com/" className="post-author">
                  {post.fields.blogAuthor || 'Unknown Author'}
                </a>
              </p>
            </header>

            {/* Blog Description */}
            <div className="post-description">
              <p>{post.fields.blogSummary || 'No summary available.'}</p>
              <Link to={`/blogDetails/${post.sys.id}`} className="button">
                Read More
              </Link>
            </div>
          </section>
        ))}

        {/* Footer */}
        <div className="footer">
          <div className="pure-menu pure-menu-horizontal">
            <div className="pure-menu-item">
              <a href="https://x.com/annafiona11" className="pure-menu-link">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
