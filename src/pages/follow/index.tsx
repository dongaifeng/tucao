import React, { FC, useEffect } from 'react';
import { Dispatch, connect, history } from 'umi';
import { List, Avatar, Button, Card, message } from 'antd';
import styles from './index.less';
import { follow, cancelFollow } from './service';

import { StateType } from './model';
import { FollowType } from './data.d';
interface IProps {
  dispatch: Dispatch;
  follows: FollowType[];
}

const goPage = () => {};

export const rederTab = () => (
  <div>
    <Button type="link" onClick={() => history.push('/')}>
      首页
    </Button>
    |
    <Button type="link" onClick={() => history.push('/follow')}>
      我的关注
    </Button>
    |
    <Button type="link" onClick={() => history.push('/fans')}>
      我的粉丝
    </Button>
    |
    <Button type="link" onClick={() => history.push('/collect')}>
      我的收藏
    </Button>
  </div>
);

const Follow: FC<IProps> = ({ dispatch, follows }) => {
  useEffect(() => {
    dispatch({
      type: 'follow/fetchFollows',
      payload: { userId: 'aaa' },
    });
  }, []);

  const followHandle = async (item: FollowType) => {
    const res = await cancelFollow({ beFollowId: item.user_id });
    if (res.code === 'success') {
      message.success(res.message || '取消关注成功');

      dispatch({
        type: 'follow/fetchFollows',
        payload: {},
      });
    }
    console.log('>>>>>>>>>>>', res);
  };

  return (
    <div className={styles.box}>
      <Card title={rederTab()} bordered={false}>
        <List
          className={styles.list}
          split
          size="large"
          locale={{ emptyText: '暂无数据' }}
          itemLayout="horizontal"
          dataSource={follows}
          renderItem={item => (
            <List.Item
              actions={[
                <Button onClick={() => followHandle(item)} type="primary">
                  取消关注
                </Button>,
              ]}
              extra={<Button>发私信</Button>}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" size={50} src={item.avatar} />}
                title={item.user_name}
                description={item.introduce}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

type P = {
  follow: StateType;
};

export default connect(({ follow }: P) => ({
  follows: follow.follows,
}))(Follow);
