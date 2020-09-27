import React from 'react';
import { Button } from 'antd';
import { history, ConnectProps, connect, Link } from 'umi';
import logo from '@/assets/logo.png';
import styles from './index.less';

import HeaderSearch from '@/components/HeaderSearch';

const PageHeader = () => {
  const toLogin = () => {
    history.push('/user/login');
  };

  return (
    <>
      <div className={styles.logo}>
        <img src={logo} width="126px" />
      </div>

      <div style={{ float: 'right' }}>
        <Button onClick={toLogin} type="text" danger>
          登录
        </Button>
        <Button type="text" danger>
          <Link to="/user/register">注册</Link>
        </Button>
      </div>

      <HeaderSearch />
    </>
  );
};

export default PageHeader;
