import React, { FC, useEffect, useState } from 'react';
import { Card, List, Button, message } from 'antd';
import { Link, connect, Dispatch } from 'umi';
import {
  UploadOutlined,
  StarOutlined,
  MessageFilled,
  LikeFilled,
  StarFilled,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import styles from '../index.less';
import { ModalState } from '../model';
import CommentList from '@/pages/home/conponents/CommentList';
import { CurrentUser } from '@/models/gloal';
import { queryTucao } from '../service';

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
  currentUser: CurrentUser;
}

interface TPType {
  icon: React.ReactNode | any;
  text: string | number;
  onClick?: () => void;
}

const IconText: FC<TPType> = ({ icon, text, onClick }) => {
  return (
    <span style={{ cursor: 'pointer' }} onClick={onClick}>
      {icon} {text}
    </span>
  );
};

const TucaoList: FC<IProps> = ({ dispatch, currentUser, userInfo }) => {
  const [dataList, setDataList] = useState<CollectType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initLoading, setInitLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [showCommentId, setShowCommentId] = useState<number>(0);

  useEffect(() => {
    queryTucao({ userId: userInfo.user_id || 57 }).then(res => {
      const data = res.data.map((item: CollectType) => ({
        ...item,
        cancelFlag: false,
      }));
      setDataList(data);
    });
  }, []);

  const cancelCollect = async (item: CollectType) => {
    console.log(item);

    dispatch({
      type: 'home/collect',
      payload: { id: item.id },
      callback: () => {
        const newData = dataList.map(i => {
          if (i.id === item.id) {
            return { ...i, cancelFlag: !i.cancelFlag };
          }
          return i;
        });
        setDataList(newData);
      },
    });
  };

  const renderFollowBtn = (item: CollectType) => (
    <Button
      style={{ color: item.cancelFlag ? '' : '#ccc' }}
      onClick={() => cancelCollect(item)}
      type="link"
      size="small"
    >
      {item.cancelFlag ? '重新收藏' : '取消收藏'}
    </Button>
  );

  const onLoadMore = () => {
    setLoading(true);

    dispatch({
      type: 'home/loadMore',
      payload: { size, page },

      callback: () => {
        setLoading(false);
        setPage(page + 1);
      },
    });
  };

  const collectHandle = (item: ListItemDataType) => {
    // console.log(item);
    // const { page, size } = this.state;
    // this.props.dispatch({
    //   type: 'home/collect',
    //   payload: { id: item.id },
    //   callback: () => {
    //     this.fetchData(page * size, 1);
    //   },
    // });
  };

  const likeHandle = (item: ListItemDataType) => {
    // const { page, size } = this.state;
    // if (this.props.likeArticles.includes(item.id)) {
    //   return message.info('已经点赞，不可重复点赞！');
    // }
    // this.props.dispatch({
    //   type: 'home/like',
    //   payload: { id: item.id },
    //   callback: () => {
    //     this.fetchData(page * size, 1);
    //   },
    // });
  };

  const commentHandle = (item: ListItemDataType) => {
    // const { showCommentId } = this.state;
    // const { dispatch } = this.props;
    // console.log(item);
    // if (showCommentId !== item.id) {
    //   dispatch({
    //     type: 'home/featchComment',
    //     payload: { articleId: item.id },
    //   });
    //   this.setState({
    //     showCommentId: item.id,
    //   });
    // } else {
    //   this.setState({
    //     showCommentId: undefined,
    //   });
    // }
  };

  const loadMore = !initLoading && (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button loading={loading} onClick={onLoadMore}>
        加载更多
      </Button>
    </div>
  );

  return (
    <div className={styles.box}>
      <List
        itemLayout="vertical"
        loadMore={loadMore}
        loading={initLoading}
        // header={<div>头部</div>}
        footer={<div>底部</div>}
        dataSource={dataList}
        renderItem={item => (
          <>
            <List.Item
              key={item.id}
              actions={[
                <IconText
                  icon={
                    item.star.indexOf(currentUser.user_id as number) === -1 ? (
                      <StarOutlined />
                    ) : (
                      <StarFilled className={styles.iconActive} />
                    )
                  }
                  text={item.star.length || ''}
                  key="list-vertical-star-o"
                  onClick={() => collectHandle(item)}
                />,
                // <IconText
                //   icon={
                //     likeArticles.indexOf(item.id) === -1 ? (
                //       <LikeOutlined />
                //     ) : (
                //       <LikeFilled className={styles.iconActive} />
                //     )
                //   }
                //   text={item.likes}
                //   key="list-vertical-like-o"
                //   onClick={() => likeHandle(item)}
                // />,
                <IconText
                  icon={
                    showCommentId === item.id ? (
                      <MessageFilled className={styles.iconActive} />
                    ) : (
                      <MessageOutlined />
                    )
                  }
                  text={item.comments}
                  key="list-vertical-message"
                  onClick={() => commentHandle(item)}
                />,
              ]}
            >
              <List.Item.Meta description={'发布时间：' + item.updatedAt} />
              <span>{item.content}</span>
            </List.Item>
            {item.id === showCommentId ? <CommentList /> : null}
          </>
        )}
      />
    </div>
  );
};

type P = {
  prefile: ModalState;
  home: any;
};

export default connect(({ prefile, home }: P) => ({
  userInfo: prefile.userInfo,
  currentUser: home.currentUser,
  likeArticles: home.likeArticles,
}))(TucaoList);
