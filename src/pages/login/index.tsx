import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { Button } from 'antd';
import LoginForm, { LoginContext } from './components/Login';

const { LoginTab } = LoginForm;

const Login = ({ status, dispatch, currentUser }) => {
  const [type, setType] = useState<string>('account');

  useEffect(() => {
    dispatch({
      type: 'center/fetchCurrent',
    });
  }, []);

  return (
    <div>
      <LoginForm activeKey={type} onTabChange={setType}>
        <LoginTab key="account" tab="账户密码登录">
          这是一个tab
        </LoginTab>
        <LoginTab key="mobie" tab="账户密码登录">
          这是一个tab1111111111111122222222222222222
        </LoginTab>

        <h1>登录</h1>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, center }) => ({
  status: login.status,
  currentUser: center.currentUser,
}))(Login);
