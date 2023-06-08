import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

interface Post {
    userId: number;
    id:number
  title: string
  body:string
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('An error occurred while fetching posts');
  }
  return response.json();
};

const Posts = () => {
  const { data, isLoading, error, refetch } = useQuery<Post[]>('posts', fetchPosts);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map((post:Post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
