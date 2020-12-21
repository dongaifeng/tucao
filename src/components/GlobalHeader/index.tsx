import React, { FC, useState, useEffect } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { history, connect, Link, Dispatch } from 'umi';
import logo from '@/assets/logo.png';
import styles from './index.less';

import HeaderSearch from '@/components/HeaderSearch';

import { StateType } from '../../models/user';
interface PropsType {
  dispatch: Dispatch;
  userInfo: StateType['userInfo'];
  status: StateType['status'];
}

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/setting">个人设置</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/user/login">退出登录</Link>
    </Menu.Item>
  </Menu>
);

const PageHeader: FC<PropsType> = ({ dispatch, userInfo, status }) => {
  const [login, setLogin] = useState<boolean>(false);
  const toLogin = () => {
    history.push('/user/login');
  };

  useEffect(() => {
    dispatch({
      type: 'user/fetchUser',
    });
  }, []);

  useEffect(() => {
    console.log(userInfo, 'llllll');
    if (userInfo) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  return (
    <>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} width="120px" />
        </Link>
      </div>

      <div className={styles.right}>
        <HeaderSearch />

        {!login ? (
          <div>
            <Button onClick={toLogin} type="text" danger>
              {' '}
              登录{' '}
            </Button>
            <Button type="text" danger>
              <Link to="/user/register">注册</Link>
            </Button>
          </div>
        ) : (
          <Dropdown
            overlay={menu}
            overlayClassName={styles.userDron}
            placement="bottomCenter"
          >
            <a onClick={e => e.preventDefault()}>{userInfo?.name}</a>
          </Dropdown>
        )}
      </div>
    </>
  );
};

type P = {
  user: StateType;
};

export default connect(({ user }: P) => ({
  status: user.status,
  userInfo: user.userInfo,
}))(PageHeader);
