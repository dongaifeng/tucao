import React, { FC, useEffect, useState } from 'react';
import { Card, Avatar, Tooltip, Button, message } from 'antd';
import { Link, connect, Dispatch, history } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import styles from './fans.less';
import { FollowType } from '../follow/data.d';
import { StateType } from '../follow/model';
import { queryFans } from '../follow/service';

import { rederTab } from '../follow';
import { open } from '@/utils';

interface IProps {
  follows: FollowType[];
  dispatch: Dispatch;
}

const Fans: FC<IProps> = ({ follows, dispatch }) => {
  const [fans, setFans] = useState<FollowType[]>([]);

  useEffect(() => {
    queryFans({}).then(res => {
      setFans(res.data);
    });
  }, []);

  const followHandle = async (item: FollowType) => {
    console.log(item);

    dispatch({
      type: 'prefile/followHandle',
      payload: { beFollowId: item.user_id, followStatus: false },
      callback: () => {},
    });

    // const res = await follow({ beFollowId: item.user_id });
    // if (res.code === 'success') {
    //   message.success('关注成功');
    // }
  };

  // 用户详情，判断是不是注册用户，非注册用户不可点击
  const userDetail = (userId: number) => {
    console.log(userId);
    if (!userId) {
      return message.info('此用户没有注册信息!');
    }
    // history.push(`/prefile/${userId}`);
    open(`/prefile/${userId}`);
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
            <div className={styles.item} key={item.user_id}>
              <Tooltip
                title={renderFollowBtn(item)}
                placement="bottom"
                color="pink"
              >
                <Link to={`/prefile/${item.user_id}`}>
                  <Avatar icon={<UserOutlined />} size={60} src={item.avatar} />
                </Link>
              </Tooltip>
              <div
                onClick={() => userDetail(item.user_id)}
                className={styles.name}
              >
                {item.user_name}
              </div>
            </div>
          ))}
      </Card>
    </div>
  );
};

type P = {
  follow: StateType;
};

// export default Fans;

export default connect(({ follow }: P) => ({
  follows: follow.follows,
}))(Fans);
