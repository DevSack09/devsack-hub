"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useToolFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const toggleListFilter = useCallback(
    (key: string, value: string) => {
      const current = searchParams.get(key)?.split(",").filter(Boolean) ?? [];
      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];

      const params = new URLSearchParams(searchParams.toString());
      if (next.length > 0) {
        params.set(key, next.join(","));
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return { searchParams, setFilter, toggleListFilter, clearFilters };
}
