import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
  size?: string;
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const { className, size = '100' } = props;

  // Calculate new sizes based on the original sizes and the new size ratio
  const newSize = parseInt(size, 10);
  const scaleFactor = newSize / 100; // Assuming the original size is 100px
  const scaledSize = `${newSize}px`;

  const loaderStyle = {
    width: scaledSize,
    height: scaledSize,
  };

  const wrapperStyle = {
    width: scaledSize,
    height: scaledSize,
  };

  const spinnerSize = `${72 * scaleFactor}px`;

  const spinnerStyle = {
    width: spinnerSize,
    height: spinnerSize,
    top: `${14 * scaleFactor}px`,
    left: `${14 * scaleFactor}px`,
    borderWidth: `${8 * scaleFactor}px`,
    borderColor: `var(--primary-color) transparent`,
  };

  return (
    <div className={classNames(styles.loader, {}, [className])} style={loaderStyle}>
      <div className={styles.loaderWrapper} style={wrapperStyle}>
        <div style={spinnerStyle} />
      </div>
    </div>
  );
};
