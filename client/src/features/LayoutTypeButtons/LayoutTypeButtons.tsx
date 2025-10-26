import React, { Dispatch, SetStateAction } from 'react';
import ChipButton from '../../components/common/ChipButton';
import { layouts } from '../../components/options/layouts';
import styles from '../../styles/pages/Top.module.css';

type LayoutTypeButtonProps = {
  layoutType: string;
  setLayoutType: Dispatch<SetStateAction<string>>;
};

const LayoutTypeButtons: React.FC<LayoutTypeButtonProps> = ({ layoutType, setLayoutType }) => {
  return (
    <div>
      <h3 className={styles.sectionTitle}>間取り</h3>
      <div className={styles.flexRow}>
        {layouts.map((layout) => (
          <ChipButton
            key={layout.id}
            label={layout.name}
            selected={layoutType === layout.id}
            onClick={() => setLayoutType(layout.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LayoutTypeButtons;
