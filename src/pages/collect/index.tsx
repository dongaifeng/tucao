import React, { FC, useEffect, useState } from 'react';
import { Card, List, Button, message } from 'antd';
import { Link, connect, Dispatch } from 'umi';
import { UserOutlined } from '@ant-design/icons';
import styles from './index.less';
import { FollowType } from '../follow/data.d';
import { StateType } from '../follow/model';
import { queryCollect } from './service';

import { rederTab } from '../follow';

interface CollectType {
  title?: string | undefined;
  content: string;
  owner_name: string;
  owner: number;
  create_date: string;
  id: number;
  cancelFlag?: boolean;
}

interface IProps {
  dispatch: Dispatch;
}

const Collect: FC<IProps> = ({ dispatch }) => {
  const [collectList, setCollectList] = useState<CollectType[]>([]);
  const [flag, setFlag] = useState<boolean>(true);

  useEffect(() => {
    queryCollect({}).then(res => {
      const data = res.data.map((item: CollectType) => ({
        ...item,
        cancelFlag: false,
      }));
      setCollectList(data);
    });
  }, []);

  const cancelCollect = async (item: CollectType) => {
    console.log(item);

    dispatch({
      type: 'home/collect',
      payload: { id: item.id },
      callback: () => {
        const newData = collectList.map(i => {
          if (i.id === item.id) {
            return { ...i, cancelFlag: !i.cancelFlag };
          }
          return i;
        });
        setCollectList(newData);
      },
    });
  };

  const renderFollowBtn = (item: CollectType) => (
    <Button onClick={() => cancelCollect(item)} type="link" size="small">
      {item.cancelFlag ? '重新收藏' : '取消收藏'}
    </Button>
  );

  return (
    <div className={styles.box}>
      <Card title={rederTab()} bordered={false}>
        <List
          itemLayout="vertical"
          size="small"
          dataSource={collectList}
          renderItem={item => (
            <List.Item
              actions={[
                <div>
                  作者：<span className={styles.name}>{item.owner_name}</span>
                </div>,
                <div>关注时间：{item.create_date}</div>,
              ]}
              extra={renderFollowBtn(item)}
            >
              <span className={styles.title}>{item.title}</span>
              <div className={styles.content}>{item.content}</div>
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
  // follows: follow.follows,
}))(Collect);
