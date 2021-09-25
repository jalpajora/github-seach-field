import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './';

type GithubResult = {
  incomplete_results?: boolean;
  items?: [];
  total_count?: number;
};

type SearchFieldHook = [
  GithubResult,
  boolean,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void
];

export function useSearchField(searchUrl: string = ''): SearchFieldHook {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchDone, startSearchDone] = useState(false);
  const [result, setResult] = useState({});
  const debouncedValue = useDebounce(searchTerm);

  const fetchData = useCallback(
    async (query: string) => {
      const result = await fetch(`${searchUrl}?q=${query}`);
      const data = await result.json();
      setResult(data);
      startSearchDone(true);
    },
    [searchUrl]
  );

  useEffect(() => {
    if (debouncedValue.length > 3) {
      fetchData(debouncedValue);
      startSearchDone(false);
    }
  }, [debouncedValue, fetchData]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(target.value);
  };

  return [result, isSearchDone, searchTerm, handleChange];
}
