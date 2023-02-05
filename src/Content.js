import React from 'react';

import { gql, useQuery } from '@apollo/client';

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

export const Content = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if(loading) return <p>Loading Page</p>
  if(error) return <p>Error</p>

  const postsFound = Boolean(data?.posts.nodes.length);
  if (!postsFound) {
    return <p>No matching posts found</p>
  }

  console.log(data.posts);

  return <div>Content</div>;
};
