import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
//import FeedbackData from '../data/feedbackData';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const fetchFeedback = async () => {
    const response = await fetch('/feedback');
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeedback();
    /*
    fetch('http://localhost:5000/feedback')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //setFeedback(data);
      });*/
  }, []);
  const deleteFeedback = async (id) => {
    if (window.confirm('are you sure you want to delete this shit?')) {
      const response = await fetch(`/feedback/${id}`, { method: 'DELETE' });
      console.log(response);
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    });
    console.log(response);
    const data = response.json();
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item)),
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
