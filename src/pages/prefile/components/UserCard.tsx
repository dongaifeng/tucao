import React, { Component, useEffect, useRef, useState } from 'react';
import { Avatar } from 'antd';
import {
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from '@ant-design/icons';
import styles from '../index.less';

const UserCard = () => {
  return (
    <>
      <Avatar
        size={{ xs: 44, sm: 52, md: 60, lg: 84, xl: 100, xxl: 120 }}
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />

      <div className={styles.userName}>董爱锋</div>

      <div>哈哈发VS地方v但是v哈哈哈</div>

      <div className={styles.detail}>
        <p>
          <PhoneOutlined style={{ marginRight: 8 }} />
          123234222
        </p>

        <p>
          <MailOutlined style={{ marginRight: 8 }} />
          123234222@qq.com
        </p>

        <p>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          河北省-邢台市-东张嘛村
        </p>
      </div>
    </>
  );
};

export default UserCard;
