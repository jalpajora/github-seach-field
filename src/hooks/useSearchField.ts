import React, { useState, useEffect, useCallback } from 'react';

type GithubResult = {
  incomplete_results?: boolean;
  items?: [];
  total_count?: number;
};

type SearchFieldHook = [
  GithubResult,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void
];

export function useSearchField(
  newValue: string = '',
  searchUrl: string = ''
): SearchFieldHook {
  const [value, setValue] = useState(newValue);
  const [result, setResult] = useState({});
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  const fetchData = useCallback(
    async (searchTerm: string) => {
      const result = await fetch(`${searchUrl}?q=${searchTerm}`);
      const data = await result.json();
      console.log(data);
      setResult(data);
    },
    [searchUrl]
  );

  useEffect(() => {
    if (value.length > 3) {
      fetchData(value);
    }
  }, [value, fetchData]);

  return [result, value, handleChange];
}
