import Select from '../common/Select';
import { citys } from '../options/citys';
import { prefectures } from '../options/prefectures';
import { stations } from '../options/stations';

export const LocationFilter = () => {
  const prefectureOptions = prefectures.map((prefecture) => ({
    value: prefecture.code,
    label: prefecture.name,
  }));

  const cityOptions = citys.map((city) => ({
    value: city.code,
    label: city.name,
  }));

  const stationOptions = stations.map((station) => ({
    value: station.code,
    label: station.name,
  }));

  return (
    <>
      <Select placeholder="都道府県" options={prefectureOptions} />
      <Select placeholder="市区町村" options={cityOptions} />
      <Select placeholder="駅名" options={stationOptions} />
    </>
  );
};
