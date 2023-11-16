import React, { useContext } from 'react';
import FeedbackItem from '../FeedbackItem';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackContext from '../context/FeedbackContext';
import Loading from './shared/Loading';
function FeedbackList() {
  const { feedback, deleteFeedback, isLoading } = useContext(FeedbackContext);
  console.log(feedback);
  const printItems = () => {
    return !isLoading ? (
      <div className="feedback-list">
        <AnimatePresence>
          {feedback.map((fb, index) => {
            return (
              <motion.div>
                <FeedbackItem item={fb} key={index} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    ) : (
      <Loading />
    );
  };

  const noFedback = () => {
    return (
      <div>
        <h2>No feedback yet</h2>
      </div>
    );
  };
  return (
    <div className="feedback-list">
      {!isLoading && (!feedback || feedback.length) === 0
        ? noFedback()
        : printItems()}
    </div>
  );
}

export default FeedbackList;
