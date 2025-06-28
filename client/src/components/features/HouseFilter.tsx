import PrimaryButton from '../common/PrimaryButton';
import Select from '../common/Select';
import { houseTypes } from '../options/houseTypes';
import { layouts } from '../options/layouts';

export const HouseFilter = () => {
  const houseTypeOptions = houseTypes.map((houseType) => ({
    value: houseType.code,
    label: houseType.name,
  }));

  const layoutOptions = layouts.map((layout) => ({
    value: layout.code,
    label: layout.name,
  }));

  return (
    <>
      <Select placeholder="住宅の種類" options={houseTypeOptions} />
      <Select placeholder="間取り" options={layoutOptions} />
      <PrimaryButton text="検索" />
    </>
  );
};
