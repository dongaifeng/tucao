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
        <div className={styles.desc}>吐槽吧 留下你的吐槽 还你美好心情</div>
      </div>
      {props.children}
    </div>
  );
};

export default User;
