import React, { FC, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { Button } from 'antd';

const Login = ({ status, dispatch, currentUser }) => {
  useEffect(() => {
    dispatch({
      type: 'center/fetchCurrent',
    });
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Page login/index</h1>
      <Button>按钮</Button>
      {status}
      <img alt="" src={currentUser.avatar} />
    </div>
  );
};

export default connect(({ login, center }) => ({
  status: login.status,
  currentUser: center.currentUser,
}))(Login);
