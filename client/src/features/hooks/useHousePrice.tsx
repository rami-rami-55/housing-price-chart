import { useState } from 'react';

export interface HousePrice {
  id: string;
  name: string;
  price: number;
}

interface FetchResult {
  data: HousePrice[] | null;
  loading: boolean;
  error: string | null;
  fetchHousePrice: (params: {
    houseType: string;
    layoutType: string;
    prefecture: string;
    city: string;
    station: string;
  }) => Promise<void>;
}

const useHousePrice = (): FetchResult => {
  const [data, setData] = useState<HousePrice[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHousePrice = async ({
    houseType,
    layoutType,
    prefecture,
    city,
    station,
  }: {
    houseType: string;
    layoutType: string;
    prefecture: string;
    city: string;
    station: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        houseType,
        layoutType,
        prefecture,
        city,
        station,
      });

      const res = await fetch(`/api/list/house-price?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const result = await res.json();
      setData(Array.isArray(result) ? result : (result?.data ?? null));
    } catch (err: any) {
      setError(err.message ?? 'データ取得に失敗しました');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchHousePrice };
};
export default useHousePrice;
