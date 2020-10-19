import React, { FC } from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import { Link, connect } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import styles from './fans.less';
import { FollowType } from '../follow/data.d';
import { StateType } from '../follow/model';

import { rederTab } from '../follow';

interface IProps {
  follows: FollowType[];
}

const Fans: FC<IProps> = ({ follows }) => {
  return (
    <div className={styles.box}>
      <Card title={rederTab()} bordered={false}>
        {follows &&
          follows.map(item => (
            <div className={styles.item}>
              <Link to="">
                <Tooltip title={item.name} placement="top">
                  <Avatar icon={<UserOutlined />} size={60} src={item.avatar} />
                </Tooltip>
                <div className={styles.name}>{item.name}</div>
              </Link>
            </div>
          ))}
      </Card>
    </div>
  );
};

type P = {
  follow: StateType;
};

export default connect(({ follow }: P) => ({
  follows: follow.follows,
}))(Fans);
