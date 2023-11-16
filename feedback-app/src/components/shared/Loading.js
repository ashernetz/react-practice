import React from 'react';
import spinner from '../assets/spinner.gif';
function Loading() {
  return (
    <img
      src={spinner}
      alt="loading..."
      style={{ width: '100px', margin: 'auto', display: 'block' }}
    />
  );
}

export default Loading;
