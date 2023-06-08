import React,{useState} from 'react';
import Posts from './Fetch';

const About = () => {
  const [showPosts, setShowPosts] = useState(false);

  const handleButtonClick = () => {
    setShowPosts(true);
  };
  return (
   <div>
      <button onClick={handleButtonClick}>Show Posts</button>
      {showPosts && <Posts />}
    </div>
  )
};

export default About;