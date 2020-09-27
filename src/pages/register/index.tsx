import React, { FC } from 'react';
import styles from './index.less';

interface PageType {}

const Register: FC<PageType> = () => {
  return (
    <div>
      <h1 className={styles.title}>Page register/index</h1>
    </div>
  );
};

export default Register;
