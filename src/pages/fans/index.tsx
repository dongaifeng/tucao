import React, { FC, useEffect, useState } from 'react';
import { Card, Avatar, Tooltip, Button, message } from 'antd';
import { Link, connect } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import styles from './fans.less';
import { FollowType } from '../follow/data.d';
import { StateType } from '../follow/model';
import { queryFans, follow } from '../follow/service';

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

  const followHandle = async (item: FollowType) => {
    console.log(item);
    const res = await follow({ beFollowId: item.user_id });
    if (res.code === 'success') {
      message.success('关注成功');
    }
  };

  const renderFollowBtn = (item: FollowType) => (
    <Button
      onClick={() => followHandle(item)}
      type="text"
      size="small"
      style={{ color: '#fff' }}
    >
      也关注TA
    </Button>
  );

  return (
    <div className={styles.box}>
      <Card title={rederTab()} bordered={false}>
        {fans &&
          fans.map(item => (
            <div className={styles.item}>
              <Tooltip
                title={renderFollowBtn(item)}
                placement="bottom"
                color="pink"
              >
                <Link to="">
                  <Avatar icon={<UserOutlined />} size={60} src={item.avatar} />
                </Link>
              </Tooltip>
              <div className={styles.name}>{item.user_name}</div>
            </div>
          ))}
      </Card>
    </div>
  );
};

type P = {
  follow: StateType;
};

export default Fans;

// export default connect(({ follow }: P) => ({
//   follows: follow.follows,
// }))(Fans);
