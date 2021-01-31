import React, { FC, useEffect, useRef, useState } from 'react';
import { Avatar } from 'antd';
import {
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from '@ant-design/icons';
import styles from '../index.less';

import { ModalState } from '../model';
import Icon from '@/components/Icon';

interface PropType {
  info: ModalState['userInfo'];
}
const UserCard: FC<PropType> = ({ info }) => {
  return (
    <>
      <Avatar
        size={{ xs: 44, sm: 52, md: 60, lg: 84, xl: 100, xxl: 120 }}
        // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        src={info.avatar}
      />

      <div className={styles.userName}>{info.name}</div>

      <div>{info.introduce}</div>

      <div className={styles.detail}>
        <p>
          <Icon icon={PhoneOutlined} alt="手机号" />

          {info.phone}
        </p>

        <p>
          <Icon icon={MailOutlined} alt="邮箱" />
          {info.email}
        </p>

        <p>
          <Icon icon={EnvironmentOutlined} alt="地址" />
          {info.country}
          {info.address && `-${info.address}`}
        </p>
      </div>
    </>
  );
};

export default UserCard;
