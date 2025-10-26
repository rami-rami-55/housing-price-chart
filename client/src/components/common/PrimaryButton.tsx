import styles from '../../styles/components/PrimaryButton.module.css';

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

const PrimaryButton: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled} type="button">
      <span className={styles.buttonText}>{text}</span>
    </button>
  );
};

export default PrimaryButton;
