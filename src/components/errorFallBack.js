import React from 'react';

function ErrorFallback({ error }) {
    console.log(error)
  return <div>Error: {error.message}</div>;
}

export default ErrorFallback;
