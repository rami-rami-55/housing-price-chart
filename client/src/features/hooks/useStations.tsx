import { useEffect, useState } from 'react';

export type Station = { id: string; name: string };

export const useStations = (cityId: string) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cityId) {
      setStations([]);

      return;
    }

    const ctrl = new AbortController();

    (async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/list/station?city=${encodeURIComponent(cityId)}`, {
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.stations;
        setStations(Array.isArray(list) ? list : []);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          setStations([]);
        }
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [cityId]);

  return { stations, loading };
};
