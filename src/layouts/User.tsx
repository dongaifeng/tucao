import React from 'react';
import { IRouteComponentProps, Link } from 'umi';
import logo from '@/assets/logo.png';
import styles from './index.less';

const User: React.FC<IRouteComponentProps> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <Link to="/">
            <img alt="logo" className={styles.logo} src={logo} />
          </Link>
        </div>
        <div className={styles.desc}>
          Ant Design 是西湖区最具影响力的 Web 设计规范
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default User;
