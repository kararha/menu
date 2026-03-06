"use client";

import { useState, useEffect, useCallback } from "react";

export interface PaginationInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface MenuItem {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  description: string;
  descriptionAr: string;
  image: string;
  category: string;
  subcategory?: string;
  badge?: string | null;
  badgeColor?: string | null;
  rating?: number;
  reviewCount?: number;
  popularity?: number;
  dietary?: string[];
  allergens?: string[];
  calories?: number;
  preparationTime?: number;
  spicyLevel?: number;
}

export interface MenuApiResponse {
  success: boolean;
  data: {
    items: MenuItem[];
    pagination: PaginationInfo;
  };
  categories: { id: string; icon: string; labelKey: string }[];
}

export interface UseMenuOptions {
  initialPage?: number;
  initialLimit?: number;
  initialCategory?: string;
}

export function useMenu(options: UseMenuOptions = {}) {
  const { initialPage = 1, initialLimit = 10, initialCategory = "all" } = options;

  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; icon: string; labelKey: string }[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [dietary, setDietary] = useState<string[]>([]);

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        category,
        sortBy,
      });

      if (search) params.append("search", search);
      if (dietary.length > 0) params.append("dietary", dietary.join(","));

      const response = await fetch(`/api/menu?${params.toString()}`);
      const result: MenuApiResponse = await response.json();

      if (result.success) {
        setItems(result.data.items);
        setPagination(result.data.pagination);
        setCategories(result.categories);
      } else {
        setError("Failed to fetch menu items");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [page, limit, category, search, sortBy, dietary]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    if (pagination?.hasNextPage) {
      setPage(prev => prev + 1);
    }
  }, [pagination?.hasNextPage]);

  const prevPage = useCallback(() => {
    if (pagination?.hasPrevPage) {
      setPage(prev => prev - 1);
    }
  }, [pagination?.hasPrevPage]);

  const changeCategory = useCallback((newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
  }, []);

  const changeSearch = useCallback((newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  }, []);

  const changeSort = useCallback((newSort: string) => {
    setSortBy(newSort);
    setPage(1);
  }, []);

  const toggleDietary = useCallback((filter: string) => {
    setDietary(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter);
      }
      return [...prev, filter];
    });
    setPage(1);
  }, []);

  return {
    items,
    categories,
    pagination,
    loading,
    error,
    page,
    limit,
    category,
    search,
    sortBy,
    dietary,
    goToPage,
    nextPage,
    prevPage,
    changeCategory,
    changeSearch,
    changeSort,
    toggleDietary,
    refetch: fetchMenu,
  };
}
