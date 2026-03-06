"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { menuItems } from "@/data/menuData";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<typeof menuItems>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Perform search
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const query = debouncedQuery.toLowerCase();

    // Fuzzy search logic
    const searchResults = menuItems.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(query) || item.nameAr.includes(debouncedQuery);
      const descMatch = item.description.toLowerCase().includes(query);
      const catMatch = item.category.toLowerCase().includes(query);
      return nameMatch || descMatch || catMatch;
    });

    setResults(searchResults.slice(0, 8));
    setIsSearching(false);
  }, [debouncedQuery]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInputValue("");
    setResults([]);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { en: string; ar: string }> = {
      appetizers: { en: "Appetizers", ar: "المقبلات" },
      mains: { en: "Main Courses", ar: "الأطباق الرئيسية" },
      desserts: { en: "Desserts", ar: "التحلية" },
      drinks: { en: "Drinks", ar: "المشروبات" },
    };
    return labels[category] || { en: category, ar: category };
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Button (when closed) */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-4 py-2 text-sm text-text-secondary transition-all hover:border-brand hover:text-white"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">{isAr ? "بحث..." : "Search..."}</span>
        </button>
      )}

      {/* Search Input (when open) */}
      {isOpen && (
        <div className="flex items-center gap-2 rounded-full border border-brand bg-surface-card px-4 py-2">
          <Search className="h-4 w-4 text-brand" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isAr ? "ابحث عن طبق..." : "Search for dishes..."}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-text-muted focus:outline-none"
          />
          {inputValue && (
            <button onClick={() => setInputValue("")} className="text-text-secondary hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="rounded-full bg-surface-dark px-2 py-1 text-xs text-text-secondary hover:text-white"
          >
            ESC
          </button>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && inputValue.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[400px] overflow-y-auto rounded-xl border border-border-subtle bg-surface-card shadow-xl">
          {isSearching ? (
            <div className="flex items-center justify-center p-6">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <p className="px-4 pb-2 text-xs text-text-muted">
                {isAr ? `found ${results.length} result` : `Found ${results.length} results`}
              </p>
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/item?id=${item.id}`}
                  onClick={handleClose}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-dark"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image src={item.image} alt={isAr ? item.nameAr : item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="truncate font-medium text-white">{isAr ? item.nameAr : item.name}</h4>
                      <span className="shrink-0 text-sm font-bold text-brand">${item.price}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-text-secondary">
                      {isAr ? item.descriptionAr : item.description}
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-surface-dark px-2 py-0.5 text-[10px] text-text-muted">
                      {isAr ? getCategoryLabel(item.category).ar : getCategoryLabel(item.category).en}
                    </span>
                  </div>
                </Link>
              ))}
              {results.length > 8 && (
                <div className="px-4 pt-2 border-t border-border-subtle">
                  <Link
                    href={`/${locale}?search=${encodeURIComponent(inputValue)}`}
                    onClick={handleClose}
                    className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-brand hover:text-brand-light"
                  >
                    {isAr ? `view all ${results.length} results` : `View all ${results.length} results`}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center">
              <Search className="mx-auto mb-2 h-8 w-8 text-text-muted" />
              <p className="text-sm text-text-secondary">{isAr ? "لم يتم العثور على نتائج" : "No results found"}</p>
              <p className="mt-1 text-xs text-text-muted">{isAr ? "جرب كلمات مختلفة" : "Try different keywords"}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
