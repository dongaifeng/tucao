import React, { FC, useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { history, ConnectProps, connect, Link } from 'umi';
import logo from '@/assets/logo.png';
import styles from './index.less';

import HeaderSearch from '@/components/HeaderSearch';

interface PropsType {}

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/setting">个人设置</Link>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        退出登录
      </a>
    </Menu.Item>
  </Menu>
);

const PageHeader: FC<PropsType> = () => {
  const [login, setLogin] = useState<boolean>(false);
  const toLogin = () => {
    history.push('/user/login');
  };

  return (
    <>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} width="120px" />
        </Link>
      </div>

      <div className={styles.right}>
        <HeaderSearch />

        {login ? (
          <div>
            <Button onClick={toLogin} type="text" danger>
              登录
            </Button>
            <Button type="text" danger>
              注册
            </Button>
          </div>
        ) : (
          <Dropdown
            overlay={menu}
            overlayClassName={styles.userDron}
            placement="bottomCenter"
          >
            <a onClick={e => e.preventDefault()}>dongaifeng</a>
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default PageHeader;
