import React, { FC, useEffect, useState, useRef } from 'react';
import { Card, List, Button, message } from 'antd';
import { Link, connect, Dispatch, useParams } from 'umi';
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
import { CurrentUser, ArticleType } from '@/models/gloal';
import { CommentType } from '@/pages/home/data';
import { queryTucao } from '../service';
import { like, queryComment } from '@/pages/home/service';

// interface ArticleType {
//   title?: string | undefined;
//   content: string;
//   owner_name: string;
//   owner: number;
//   create_date: string;
//   id: number;
//   cancelFlag?: boolean;
// }

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

interface IProps {
  dispatch: Dispatch;
  currentUser: CurrentUser;
  user_id: number;
}

const TucaoList: FC<IProps> = ({ dispatch, currentUser, user_id }) => {
  const [dataList, setDataList] = useState<ArticleType[]>([]);
  const [likeArticles, setLikeArticles] = useState<number[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initLoading, setInitLoading] = useState<boolean>(false);
  const pageRef = useRef(1);
  const [page, setPage] = useState<number>(pageRef.current);
  const [size, setSize] = useState<number>(10);
  const [showCommentId, setShowCommentId] = useState<number | undefined>(0);
  const params = useParams();

  const getData = (size: Number, page: number) => {
    queryTucao({ ...params, size, page }).then(res => {
      setDataList(res.data);
    });
  };

  useEffect(() => {
    getData(size, page);
  }, []);

  // 点击更多按钮，无法获取最新page，故使用useRef方法
  const onLoadMore = () => {
    setLoading(true);
    pageRef.current = page + 1;
    setPage(pageRef.current);
    queryTucao({ ...params, size, page: pageRef.current }).then(res => {
      const old = dataList;
      setDataList([...dataList, ...res.data]);
      setLoading(false);
    });
  };

  // 收藏此条文章，
  const collectHandle = (item: ArticleType) => {
    console.log(item);

    dispatch({
      type: 'home/collect',
      payload: { id: item.id },
      callback: () => {
        getData(page * size, 1);
      },
    });
  };

  // 给文章点赞
  const likeHandle = async (item: ArticleType) => {
    if (likeArticles.includes(item.id)) {
      return message.info('已经点赞，不可重复点赞！');
    }
    const old = likeArticles;
    setLikeArticles([...old, item.id]);

    const res = await like({ id: item.id });
    if (res.code === 'success') {
      message.success(res.message || '成功');
      getData(page * size, 1);
    }
  };

  // 点开评论
  const commentHandle = async (item: ArticleType) => {
    console.log(item);
    if (showCommentId !== item.id) {
      const { data } = await queryComment({ articleId: item.id });
      setComments(data);

      setShowCommentId(item.id);
    } else {
      setShowCommentId(undefined);
    }
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
    <div>
      <List
        itemLayout="vertical"
        loadMore={loadMore}
        loading={initLoading}
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
                <IconText
                  icon={
                    likeArticles.indexOf(item.id) === -1 ? (
                      <LikeOutlined />
                    ) : (
                      <LikeFilled className={styles.iconActive} />
                    )
                  }
                  text={item.likes}
                  key="list-vertical-like-o"
                  onClick={() => likeHandle(item)}
                />,
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
              <span>{item.content}</span>
              <div>{'发布时间：' + item.updatedAt || ''} </div>
            </List.Item>
            {item.id === showCommentId ? (
              <CommentList
                _comments={comments as CommentType[]}
                activeArticleId={showCommentId}
              />
            ) : null}
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
  user_id: prefile.userInfo.user_id,
  currentUser: home.currentUser,
  likeArticles: home.likeArticles,
}))(TucaoList);
