import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Loader.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(styles.loader, {}, [className])}>
      <div className={styles.loaderWrapper}>
        <div />
        <div>
          <div />
        </div>
      </div>
    </div>
  );
};
