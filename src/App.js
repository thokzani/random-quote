import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  const handleTweet = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(tweetUrl, '_blank');
  };

  return (
    <div id="quote-box">
      <div id="text">
        "{quote}"
      </div>
      <div id="author">
        - {author}
      </div>
      <div id="buttons">
        <button id="new-quote" onClick={handleNewQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text="${encodeURIComponent(
            `${quote} - ${author}`
          )}"`}
          target="_blank"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
};

export default App;
