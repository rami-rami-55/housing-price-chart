import { useEffect, useState } from 'react';

export type City = { id: string; name: string };

export const useCities = (prefectureId: string) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!prefectureId) {
      setCities([]);
      return;
    }

    const ctrl = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/list/city?prefecture=${encodeURIComponent(prefectureId)}`, {
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.cities;
        setCities(Array.isArray(list) ? list : []);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          setCities([]);
        }
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [prefectureId]);

  return { cities, loading };
};
