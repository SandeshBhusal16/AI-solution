import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);
  

  return (
    <div className="blog-container">
      <h1>Our Latest Insights</h1>
      {articles.map(article => (
        <div key={article._id} className="article">
          <h2>{article.title}</h2>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
