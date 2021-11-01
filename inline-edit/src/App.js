import React, { useState, useEffect } from 'react';
import { Server } from 'miragejs';

let server = new Server({ timing: 1000 });
server.get('/api/input', {});
server.post('/api/input', (_, request) => {
  return JSON.parse(request.requestBody);
});

const App = () => {
  const [loading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState(null);

  const fetchData = async () => {
    await fetch('/api/input').then((json) => {
      // console.log('json: ', JSON.parse(json._bodyInit));
      const data = JSON.parse(json._bodyInit);
      setInputValue(data.text);
    });
  };

  useEffect(() => {
    loading && fetchData();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleBlur = async (e) => {
    const { value } = e.target;
    setIsLoading(true);
    await fetch('/api/input', {
      method: 'POST',
      body: JSON.stringify({ input: value }),
    });
    setStatus('success');
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <input value={inputValue} onChange={handleChange} onBlur={handleBlur} />
        <div>{loading && <> loading... </>}</div>
      </div>
      <div>{status === 'success' && <>tick</>}</div>
    </>
  );
};

export default App;
