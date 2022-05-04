import { Spin } from 'antd';
import styles from './index.less';
import classNames from 'classnames';

export default ({ className, inner }) => (
  <Spin
    style={{ position: inner ? 'absolute' : 'fixed' }}
    className={classNames(styles.container, className)}
    spinning
  />
);
