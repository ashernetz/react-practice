import React, { useContext, useEffect, useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
  const [text, setText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(10);
  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    console.log(feedbackEdit);
    if (feedbackEdit.edit) {
      setText(feedbackEdit.item.text);
      setIsButtonDisabled(false);
      setRating(feedbackEdit.item.rating);
      console.log(feedbackEdit.item.text);
    }
  }, [feedbackEdit]);
  const handleOnChange = (e) => {
    if (text === '') {
      setIsButtonDisabled(true);
      setMessage(null);
    } else if (text !== '' && text.trim().length <= 10) {
      setIsButtonDisabled(true);
      setMessage('text must be at least 10 characters');
    } else {
      setIsButtonDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length >= 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (feedbackEdit?.edit) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
        setMessage('');
      }
    }
  };
  return (
    <>
      <Card>
        <form action="" onSubmit={handleSubmit}>
          <h2>how would you rate your service with us?</h2>
          <h1>Rating {rating}</h1>
          <RatingSelect select={(rating) => setRating(rating)} />
          {/* rating select component*/}
          <div className="input-group">
            <input
              type="text"
              placeholder="write a review"
              onChange={(e) => handleOnChange(e)}
              value={text}
            />
            <Button type="submit" isDisabled={isButtonDisabled}>
              Send
            </Button>
          </div>
          {message && <div className="message">{message}</div>}
        </form>
      </Card>
    </>
  );
}

export default FeedbackForm;
