import React from 'react';
import Card from '../components/shared/Card';
import { Route, Link } from 'react-router-dom';
function About() {
  return (
    <Card>
      <div className="about">
        <h2>holis</h2>
        <p>
          What if I say im not like the others, what if I say im nost just
          another one what if I say I will never surrender!
        </p>
        <Link to="/">back hom</Link>
      </div>
    </Card>
  );
}

export default About;
