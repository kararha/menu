"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Fuse from "fuse.js";

export interface SearchItem {
  id: number;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  price: number;
  image: string;
}

interface UseSearchOptions {
  threshold?: number;
  keys?: string[];
  minMatchCharLength?: number;
}

export function useSearch(items: SearchItem[], options: UseSearchOptions = {}) {
  const { 
    threshold = 0.3, 
    keys = ["name", "nameAr", "description", "category"],
    minMatchCharLength = 2 
  } = options;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys: keys.map(key => ({
        name: key,
        weight: key === "name" || key === "nameAr" ? 2 : 1,
      })),
      threshold,
      minMatchCharLength,
      includeScore: true,
      ignoreLocation: true,
      useExtendedSearch: true,
    });
  }, [items, keys, threshold, minMatchCharLength]);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery || searchQuery.length < minMatchCharLength) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Use Fuse.js for fuzzy search
    const fuseResults = fuse.search(searchQuery);
    const searchResults = fuseResults.map(result => result.item);
    
    setResults(searchResults);
    setIsSearching(false);
  }, [fuse, minMatchCharLength]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsSearching(false);
  }, []);

  return {
    query,
    results,
    isSearching,
    search,
    clearSearch,
    hasResults: results.length > 0,
  };
}

// Debounce hook for search input
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
