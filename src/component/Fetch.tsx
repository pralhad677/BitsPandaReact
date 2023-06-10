import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

interface Post {
    userId: number;
    id:number
  title: string
  body:string
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('An error occurred while fetching posts');
  }
  const data = await response.json();
 
  console.log('data',data)
  return data;
};

const Posts = () => {
  const { data, isLoading, error, refetch } = useQuery<Post[]>('posts', fetchPosts);

  useEffect(() => {
        refetch(); 
      console.log('data',data)
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as any).message}</div>;
  }
   
  if (data!==undefined && data.length === 0) {
    return <div>No posts available</div>;
  
  }
  return (
    <div>
      <h1>Posts</h1>
      <ul>
    
          {data?.slice(0,10).map((post:Post) => {
             
          return  <li key={post.id}> <h1 >{post.title}</h1></li>
           
        //   <li key={post.id}>{post.title}</li>
          })}
      </ul>
    </div>
  );
};

export default Posts;
