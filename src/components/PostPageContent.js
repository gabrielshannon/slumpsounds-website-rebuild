import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function PostPageContent({ post }) {
  const { date, title, content, author, categories } = post;



    return (
      <article className='post-article'>
        <h4>{title}</h4>
    
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
    
      </article>
    );
}
