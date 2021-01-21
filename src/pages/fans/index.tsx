import React, { FC, useEffect, useState } from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import { Link, connect } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import styles from './fans.less';
import { FollowType } from '../follow/data.d';
import { StateType } from '../follow/model';
import { queryFans } from '../follow/service';

import { rederTab } from '../follow';

interface IProps {
  follows: FollowType[];
}

const Fans: FC<IProps> = ({ follows }) => {
  const [fans, setFans] = useState<FollowType[]>([]);

  useEffect(() => {
    queryFans({}).then(res => {
      setFans(res.data);
    });
  }, []);

  return (
    <div className={styles.box}>
      <Card title={rederTab()} bordered={false}>
        {fans &&
          fans.map(item => (
            <div className={styles.item}>
              <Link to="">
                <Tooltip title={item.user_name} placement="top">
                  <Avatar icon={<UserOutlined />} size={60} src={item.avatar} />
                </Tooltip>
                <div className={styles.name}>{item.user_name}</div>
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
