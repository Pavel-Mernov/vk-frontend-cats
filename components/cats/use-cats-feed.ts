"use client";

import { useEffect, useRef, useState } from "react";
import { PAGE_SIZE } from "./constants";
import { readFavorites, saveFavorites } from "./favorites-storage";
import type { Cat, TabId } from "./types";

export function useCatsFeed() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [cats, setCats] = useState<Cat[]>([]);
  const [favoritesMap, setFavoritesMap] = useState<Record<string, Cat>>({});
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  async function loadCats(nextPage: number) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/cats?page=${nextPage}&limit=${PAGE_SIZE}`, {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("Не удалось загрузить список котиков.");
      }

      const newCats = (await response.json()) as Cat[];

      setCats((currentCats) => {
        const merged = [...currentCats];
        const seen = new Set(currentCats.map((cat) => cat.id));

        for (const cat of newCats) {
          if (!seen.has(cat.id)) {
            merged.push(cat);
            seen.add(cat.id);
          }
        }

        return merged;
      });

      setHasMore(newCats.length === PAGE_SIZE);
      setPage(nextPage);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Что-то пошло не так.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setFavoritesMap(readFavorites());
    void loadCats(0);
  }, []);

  useEffect(() => {
    if (activeTab !== "all" || !hasMore || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadCats(page + 1);
        }
      },
      {
        rootMargin: "600px 0px"
      }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }

      observer.disconnect();
    };
  }, [activeTab, hasMore, isLoading, page]);

  function handleToggleFavorite(cat: Cat) {
    setFavoritesMap((currentFavorites) => {
      const nextFavorites = { ...currentFavorites };

      if (nextFavorites[cat.id]) {
        delete nextFavorites[cat.id];
      } else {
        nextFavorites[cat.id] = cat;
      }

      saveFavorites(nextFavorites);
      return nextFavorites;
    });
  }

  const favoriteCats = Object.values(favoritesMap);
  const visibleCats = activeTab === "all" ? cats : favoriteCats;
  const emptyStateMessage =
    activeTab === "all"
      ? "Список котиков пока пуст."
      : "Вы ещё не добавили котиков в любимые.";

  return {
    activeTab,
    setActiveTab,
    favoritesMap,
    visibleCats,
    loaderRef,
    isLoading,
    error,
    emptyStateMessage,
    handleToggleFavorite
  };
}
