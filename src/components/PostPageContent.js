import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (date) => new Date(date).toLocaleDateString();

export default function PostPageContent({ post }) {
  const { date, title, content, author, categories } = post;


//   const haveCategories = Boolean(categories?.nodes?.length);





    return (
      <article className='post-article'>
        <h3>{title}</h3>
    
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
    
      </article>
    );
}
