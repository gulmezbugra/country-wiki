import { useState, useEffect, useRef, useCallback } from 'react';

const PAGE_SIZE = 20;

export const useInfiniteScroll = (items) => {
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const visibleItems = items.slice(0, page * PAGE_SIZE);
  const hasMore = visibleItems.length < items.length;

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // Reset pagination when items change (e.g. search/filter)
  useEffect(() => {
    setPage(1);
  }, [items]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return { visibleItems, hasMore, loaderRef };
};
