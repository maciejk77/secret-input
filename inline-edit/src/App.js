import React, { useState, useEffect } from 'react';
import { Server } from 'miragejs';

let server = new Server({ timing: 2000 });
server.get('/api/input', {});
server.post('/api/input', (_, request) => {
  return JSON.parse(request.requestBody);
});

const App = () => {
  const [loading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    await fetch('/api/input').then((json) => {
      const data = JSON.parse(json._bodyInit);
      setInputValue(data.text);
    });
  };

  useEffect(() => {
    loading && fetchData();
  }, [loading]);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleBlur = async (e) => {
    const { value } = e.target;

    const variant = Math.random();

    const submitInputValue = async () => {
      setIsLoading(true);
      await fetch('/api/input', {
        method: 'POST',
        body: JSON.stringify({ input: value }),
      });

      setIsLoading(false);
    };

    const handleSuccess = () => {
      submitInputValue();

      setIsSuccess(true);
      setError(false);
    };

    const handleFailure = () => {
      submitInputValue();

      setIsSuccess(false);
      setError(true);
    };

    if (variant <= 0.5) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <input value={inputValue} onChange={handleChange} onBlur={handleBlur} />
        <div>{loading && <> loading... </>}</div>
      </div>
      <div>{!loading && isSuccess && <>&#9989;</>}</div>
      <div>{!loading && error && <>&#x26A0;</>}</div>
    </>
  );
};

export default App;
