"use client";

import { useState, useCallback } from "react";

interface UseButtonClickOptions {
  debounceMs?: number;
  disabled?: boolean;
}

export function useButtonClick<T>(
  callback: (...args: T[]) => Promise<void> | void,
  options: UseButtonClickOptions = {}
) {
  const { debounceMs = 500, disabled = false } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = useCallback(
    async (...args: T[]) => {
      if (isLoading || isDisabled || disabled) {
        return;
      }

      setIsLoading(true);
      setIsDisabled(true);

      try {
        await callback(...args);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setIsDisabled(false);
        }, debounceMs);
      }
    },
    [callback, debounceMs, disabled, isLoading, isDisabled]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsDisabled(false);
  }, []);

  return {
    handleClick,
    isLoading,
    isDisabled,
    reset,
  };
}

export function useCartActions() {
  const [isAdding, setIsAdding] = useState<string | null>(null);

  const addToCart = useCallback(async (itemId: number) => {
    setIsAdding(itemId.toString());
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsAdding(null);
  }, []);

  const isItemAdding = useCallback((itemId: number) => {
    return isAdding === itemId.toString();
  }, [isAdding]);

  return { addToCart, isItemAdding, isAdding };
}

export function useOrderActions() {
  const [pendingActions, setPendingActions] = useState<Set<string>>(new Set());

  const isActionPending = useCallback((actionId: string) => {
    return pendingActions.has(actionId);
  }, [pendingActions]);

  const executeAction = useCallback(async (actionId: string, action: () => Promise<void>) => {
    if (pendingActions.has(actionId)) {
      return;
    }

    setPendingActions(prev => new Set(prev).add(actionId));

    try {
      await action();
    } finally {
      setPendingActions(prev => {
        const next = new Set(prev);
        next.delete(actionId);
        return next;
      });
    }
  }, [pendingActions]);

  return { isActionPending, executeAction };
}
