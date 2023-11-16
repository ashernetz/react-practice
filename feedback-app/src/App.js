import './App.css';
import Header from './header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import About from './pages/About';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AboutIconLink from './components/AboutIconLink';
import FeedbackContext, { FeedbackProvider } from './context/FeedbackContext';
import { useContext, useEffect } from 'react';
import FeedbackData from './data/feedbackData';
function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header text="hello world" />
        <div className="container">
          <Route path="/" exact>
            <FeedbackForm />
            <FeedbackStats />
            <FeedbackList />
          </Route>
          <Route path="/about" component={About} />
          <Link to="/about">
            <AboutIconLink />
          </Link>
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
