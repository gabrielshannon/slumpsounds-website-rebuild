import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


// const formatDate = (date) => new Date(date).toLocaleDateString();

export default function PostCard({ post }) {
  const { title, slug, featuredImage } = post;

  console.log(featuredImage);

  return (
    //     <div className="post-card">
    //       {/* <img
    //         src={featuredImage.mediaItemURL
    // }

    //       /> */}
    //       <Link to={`/blog/${slug}`}>
    //         <h3>{title}</h3>
    //       </Link>
    //     </div>

    <div className="post-card">
      {featuredImage ? (
        <img
          className="featured-image"
          src={featuredImage.node.mediaItemUrl}
          alt={featuredImage.node.altText}
        />
      ) : null}
      <div className='menu-item"'>
        <Link  style={{ textDecoration: 'none' }} to={`/blog/${slug}`}>
          <h3 className='post-card-title'>{title}</h3>
        </Link>{' '}
      </div>
      <div className="metadata">
        <p>
          {/* <span className="text-bold">Date:</span> {formatDate(date)} */}
        </p>
        <p>{/* <span className="text-bold">Author:</span> {authorName} */}</p>
      </div>
    </div>
  );
}
