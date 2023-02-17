import React from 'react';

import { gql, useQuery } from '@apollo/client';
import loadingImage from '../assets/loadingImage.svg';
import PostCard from '../components/PostCard';

const GET_ALL_POSTS = gql`
  query NewQuery {
    posts {
      nodes {
        content
        slug
        title
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading)
    return (
      <div className="outer-page">
        <img className="loading-img" src={loadingImage}></img>{' '}
      </div>
    );
  if (error) return <p>Error :( </p>;

  const postsFound = Boolean(data?.posts.nodes.length);
  if (!postsFound) {
    return <p>No matching posts found</p>;
  }

  console.log(data.posts);

  return (

      <div className="posts-list">
        {data.posts.nodes.map((post) => (
          <PostCard key={post.databaseId} post={post} />
        ))}
      </div>

  );
};

export default HomePage;

// https://www.youtube.com/watch?v=cdBBCCvIqvo&ab_channel=WPEngineBuilders
