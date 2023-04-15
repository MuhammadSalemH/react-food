import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const sendRequest = useCallback(async (requsetConfig, applyData) => {
    setIsLoading(true);
    setHasError(false);

    try {
      const response = await fetch(requsetConfig.url, {
        method: requsetConfig.method || "GET",
        body: JSON.stringify(requsetConfig.body) || null,
        headers: requsetConfig.headers || {},
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      applyData(data);

      // Catch errors
    } catch (err) {
      setIsLoading(false);
      setHasError(err.message);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    hasError,
    sendRequest,
  };
};

export default useHttp;
