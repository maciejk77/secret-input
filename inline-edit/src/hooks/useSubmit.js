import { useState } from 'react';
import { BASE_PATH } from '../constants';

const useSubmit = () => {
  const [loading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleBlur = async (e) => {
    const { value } = e.target;
    const variant = Math.random(); // move to helper file

    const submitInputValue = async () => {
      setIsLoading(true);
      await fetch(BASE_PATH, {
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

    // to be refactored to implement A/B split,
    // random number 0-1 at the moment
    if (variant <= 0.5) {
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  return { loading, isSuccess, error, handleBlur };
};

export default useSubmit;
