import React, { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);
  const getAverage = () => {
    return feedback.length > 0
      ? (
          feedback.reduce((acc, currentRating) => {
            return acc + currentRating.rating;
          }, 0) / feedback.length
        )
          .toFixed(1)
          .replace(/[.,]0$/, '')
      : 0;
  };

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} reviews</h4>
      <h4>average raiting: {getAverage()}</h4>
    </div>
  );
}

export default FeedbackStats;
