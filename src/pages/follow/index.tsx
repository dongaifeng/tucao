import React, { FC, useEffect } from 'react';
import { Dispatch, connect, history } from 'umi';
import { List, Avatar, Button, Card } from 'antd';
import styles from './index.less';

import { StateType } from './model';
import { FollowType } from './data.d';
interface IProps {
  dispatch: Dispatch;
  follows: FollowType[];
}

export const rederTab = () => (
  <div>
    <Button type="link">首页</Button>|<Button type="link">我的粉丝</Button>|
    <Button type="link">我的收藏</Button>
  </div>
);

const Follow: FC<IProps> = ({ dispatch, follows }) => {
  useEffect(() => {
    dispatch({
      type: 'follow/fetchFollows',
      payload: { userId: 'aaa' },
    });
  }, []);

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
              actions={[<Button>关注</Button>]}
              extra={<Button>发私信</Button>}
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" size={50} src={item.avatar} />}
                title={item.name}
                description={item.description}
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
