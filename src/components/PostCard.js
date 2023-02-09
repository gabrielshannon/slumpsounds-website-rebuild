import React from 'react';
import { Link } from 'react-router-dom';

// const formatDate = (date) => new Date(date).toLocaleDateString();

export default function PostCard({ post }) {
  const { title, slug, featuredImage } = post;
  

  console.log(slug)

  return (
    <div className="post-card">
      {/* <img
        src={featuredImage.mediaItemURL}
       
      /> */}
      <Link to={`/blog/${slug}`}>
        <h3>{title}</h3>
      </Link>
    </div>
  );

  // return (
  //   <div className="post-card">
  //     {featuredImage ? (
  //       <img
  //         src={featuredImage.node.sourceUrl}
  //         alt={featuredImage.node.altText}
  //       />
  //     ) : null}
  // <Link to={`/blog/${slug}`}>
  //   <h3>{title}</h3>
  // </Link>
  //     <div className="metadata">
  //       <p>
  //         {/* <span className="text-bold">Date:</span> {formatDate(date)} */}
  //       </p>
  //       <p>
  //         {/* <span className="text-bold">Author:</span> {authorName} */}
  //       </p>
  //     </div>
  //   </div>
  // );
}
