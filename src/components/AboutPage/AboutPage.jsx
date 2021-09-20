import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <center>
      <div>
        <p>Technologies Used</p>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Node js</li>
          <li>Material UI</li>
          <li>PostgreSql</li>
          <li>Chart js</li>
          
        </ul>
      </div>
      </center>
    </div>
  );
}

export default AboutPage;
