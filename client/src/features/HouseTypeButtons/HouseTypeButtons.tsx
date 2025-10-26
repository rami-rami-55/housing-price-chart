import React, { Dispatch, SetStateAction } from 'react';
import ChipButton from '../../components/common/ChipButton';
import { houseTypes } from '../../components/options/houseTypes';
import styles from '../../styles/pages/Top.module.css';

type HouseTypeButtonProps = {
  houseType: string;
  setHouseType: Dispatch<SetStateAction<string>>;
};

const HouseTypeButtons: React.FC<HouseTypeButtonProps> = ({ houseType, setHouseType }) => {
  return (
    <div>
      <h4 className={styles.sectionTitle}>物件の種類</h4>
      <div className={styles.flexRow}>
        {houseTypes.map((type) => (
          <ChipButton
            key={type.id}
            label={type.name}
            selected={houseType === type.id}
            onClick={() => setHouseType(type.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HouseTypeButtons;
