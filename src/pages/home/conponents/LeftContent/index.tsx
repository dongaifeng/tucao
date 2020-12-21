import React, { FC, useState, useEffect } from 'react';
import logo from '@/assets/nouser.png';
import { connect, Dispatch, history, Link } from 'umi';

import { Divider, Menu } from 'antd';
import { HomeOutlined, SmileTwoTone } from '@ant-design/icons';
import styles from './index.less';
import { User } from '../../data.d';
import { StateType } from '../../model';

const menu: { [key: string]: string } = {
  follow: '我的关注',
  fans: '我的粉丝',
  collect: '我的收藏',
};

type SelectType = 'follow' | 'fans' | 'collect';
interface PropsType {
  currentUser: Partial<User>;
  dispatch: Dispatch;
}

const LeftContent: FC<PropsType> = ({ dispatch, currentUser }) => {
  const { name, address, avatar = logo, introduce } = currentUser;

  const selectKey = (key: SelectType) => {
    history.push(`/${key}`);
  };

  useEffect(() => {
    dispatch({
      type: 'home/fetchUser',
    });
  }, []);

  return (
    <div className={styles.box}>
      <Link to="/setting">
        <img src={avatar} alt="avatar" />
      </Link>
      <div className={styles.name}>{name}</div>
      <div className={styles.sign}>{introduce}</div>

      <p>
        <HomeOutlined
          style={{
            marginRight: 8,
          }}
        />
        {address}
      </p>

      <Divider dashed />

      <Menu
        style={{
          textAlign: 'center',
        }}
        mode="inline"
        onClick={({ key }) => selectKey(key as SelectType)}
      >
        {Object.keys(menu).map(item => (
          <Menu.Item key={item}>{menu[item]}</Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

type MapType = {
  home: StateType;
};

export default connect(
  //mapStateToProps
  ({ home }: MapType) => ({
    currentUser: home.currentUser,
  }),
)(LeftContent);
