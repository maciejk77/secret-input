import React, { useEffect } from 'react';
import runServer from './server';
import useInput from './hooks/useInput';
import useSubmit from './hooks/useSubmit';
import useData from './hooks/useData';

// 2000ms delayed
runServer();

const App = () => {
  const { handleChange, inputValue } = useInput();
  const { loading, isSuccess, error, handleBlur } = useSubmit();
  const { fetchData } = useData();

  useEffect(() => {
    loading && fetchData();
  }, [fetchData, loading]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <input value={inputValue} onChange={handleChange} onBlur={handleBlur} />
        <div>{loading && <> loading... </>}</div>
      </div>
      <div>{!loading && isSuccess && <>&#9989;</>}</div>
      <div>{!loading && error && <>{error}</>}</div>
    </>
  );
};

export default App;
