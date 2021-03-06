import React, { FC } from 'react';
import { connect, Dispatch, history } from 'umi';
import { Row, Col, Card, List, Avatar, Input, Button, message } from 'antd';
import {
  UploadOutlined,
  StarOutlined,
  MessageFilled,
  LikeFilled,
  StarFilled,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
// import { CSSTransition } from 'react-transition-group';

import LeftContent from './conponents/LeftContent';
import CommentList from './conponents/CommentList';
import styles from './index.less';

import { StateType } from './model';
import { ArticleType, CurrentUser } from '@/models/gloal';
import { PageLoading } from '@ant-design/pro-layout';
import { open } from '@/utils';

interface TStateType {
  loading: boolean;
  initLoading: boolean;
  key: string;
  pubVal: undefined | string;
  page: number;
  size: number;
  showCommentId: number | undefined;
}
interface PropsType {
  dispatch: Dispatch;
  list: ArticleType[];
  comments: StateType['comments'];
  recommend: ArticleType[];
  currentUser: Partial<CurrentUser>;
  likeArticles: StateType['likeArticles'];
  loadFlag: boolean;
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

const tabList = [
  {
    key: 'tab1',
    tab: '广场',
  },
  {
    key: 'tab2',
    tab: '关注',
  },
];

class ContentList extends React.Component<PropsType, TStateType> {
  state: TStateType = {
    loading: false, // 控制 加载更多按钮的显示
    key: 'tab1',
    pubVal: undefined,
    initLoading: true, // 控制 占位符的显示
    page: 1,
    size: 10,
    showCommentId: undefined,
  };

  fetchData = (size: number, page: number) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'home/fetchData',
      payload: { size, page, key: this.state.key },
    });

    this.setState({
      initLoading: false,
      page: page + 1,
    });
  };

  // 推荐阅读，选取点赞数最多的前7
  fetchRecommend = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchRecommend',
      payload: { size: 7, page: 1 },
    });
  };

  renderRight = (recommend: ArticleType[]) => (
    <div>
      <Card
        title="推荐阅读"
        bordered={false}
        headStyle={{
          height: '10px',
          border: '0px',
        }}
        extra={<a href="#">更多</a>}
        style={{
          width: '100%',
          marginTop: '30px',
        }}
      >
        {recommend.map(item => (
          <p className={styles.recommendItem} key={item.id}>
            {item.content}
          </p>
        ))}
      </Card>
    </div>
  );

  onTabChange = (key: string) => {
    console.log(key);

    this.setState({ key: key, page: 1 }, () => {
      this.fetchData(this.state.size, this.state.page);
    });
  };

  publish = () => {
    console.log(this.state.pubVal);
    const { pubVal, page, size } = this.state;
    const { dispatch } = this.props;
    if (!pubVal || pubVal === '') {
      return message.info('你总得吐槽点东西吧');
    }
    dispatch({
      type: 'home/publish',
      payload: { content: pubVal },
      callback: () => {
        this.fetchData(size, 1);
        this.setState({ pubVal: '' });
        message.success('发布吐槽成功');
      },
    });
  };

  pubChange = (value: string) => {
    this.setState({
      pubVal: value,
    });
  };

  collectHandle = (item: ArticleType) => {
    console.log(item);
    const { page, size } = this.state;
    this.props.dispatch({
      type: 'home/collect',
      payload: { id: item.id },
      callback: () => {
        this.fetchData(page * size, 1);
      },
    });
  };

  // 点赞 只能加赞，不能取消，只能点一次
  likeHandle = (item: ArticleType) => {
    const { page, size } = this.state;

    if (this.props.likeArticles.includes(item.id)) {
      return message.info('已经点赞，不可重复点赞！');
    }

    this.props.dispatch({
      type: 'home/like',
      payload: { id: item.id },
      callback: () => {
        this.fetchData(page * size, 1);
      },
    });
  };

  // 评论
  commentHandle = (item: ArticleType) => {
    const { showCommentId } = this.state;
    const { dispatch } = this.props;
    console.log(item);

    if (showCommentId !== item.id) {
      dispatch({
        type: 'home/featchComment',
        payload: { articleId: item.id },
      });

      this.setState({
        showCommentId: item.id,
      });
    } else {
      this.setState({
        showCommentId: undefined,
      });
    }
  };

  // 加载更多
  onLoadMore = () => {
    const { page, size } = this.state;

    this.setState({
      loading: true,
    });

    this.props.dispatch({
      type: 'home/loadMore',
      payload: { size, page },

      callback: () => {
        this.setState({
          loading: false,
          page: page + 1,
        });
      },
    });
  };

  // 用户详情，判断是不是注册用户，非注册用户不可点击
  userDetail = (userId: number) => {
    console.log(userId);
    if (!userId) {
      return message.info('此用户没有注册信息!');
    }
    // // history.push(`/prefile/${userId}`);
    open(`/prefile/${userId}`);
  };

  componentDidMount() {
    const { page, size } = this.state;
    this.fetchData(size, page);
    this.fetchRecommend();
  }

  render() {
    const { initLoading, loading, key, showCommentId, pubVal } = this.state;
    const {
      list,
      comments,
      recommend,
      currentUser,
      likeArticles,
      loadFlag,
    } = this.props;

    const loadMore = !initLoading && (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button loading={loading} onClick={this.onLoadMore}>
          加载更多
        </Button>
      </div>
    );

    return (
      <div>
        <Row>
          <Col className={styles.contLeft} span={4}>
            <LeftContent />
          </Col>

          <Col className={styles.content} span={16}>
            <div style={{ margin: '10px 0px 10px 10px' }}>
              <Row>
                <Col span={22}>
                  <Input.TextArea
                    style={{ resize: 'none' }}
                    onChange={e => this.pubChange(e.target.value)}
                    value={pubVal}
                    placeholder="吐槽一下今天不开心的事吧..."
                    autoSize={{ minRows: 3, maxRows: 3 }}
                  />
                </Col>
                <Col span={2}>
                  <div onClick={this.publish} className={styles.publish}>
                    <UploadOutlined />
                  </div>
                </Col>
              </Row>
            </div>
            <div style={{ width: '100%' }}>
              <Card
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                  this.onTabChange(key);
                }}
                style={{ width: '100%' }}
                loading={initLoading}
              >
                <List
                  itemLayout="vertical"
                  loadMore={loadMore}
                  loading={loadFlag}
                  // header={<div>头部</div>}
                  footer={<div>底部</div>}
                  dataSource={list}
                  renderItem={item => (
                    <>
                      <List.Item
                        key={item.id}
                        actions={[
                          <IconText
                            icon={
                              item.star.indexOf(
                                currentUser.user_id as number,
                              ) === -1 ? (
                                <StarOutlined />
                              ) : (
                                <StarFilled className={styles.iconActive} />
                              )
                            }
                            text={item.star.length || ''}
                            key="list-vertical-star-o"
                            onClick={() => this.collectHandle(item)}
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
                            onClick={() => this.likeHandle(item)}
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
                            onClick={() => this.commentHandle(item)}
                          />,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size="large"
                              src={item.avatar}
                              alt="没有头像哦"
                            />
                          }
                          title={
                            <Button
                              style={{ border: 0 }}
                              onClick={() => this.userDetail(item.owner)}
                            >
                              {item.owner_name || 'TA不想有名字'}
                            </Button>
                          }
                          description={'发布时间：' + item.updatedAt}
                        />
                        <span>{item.content}</span>
                      </List.Item>
                      {item.id === showCommentId ? (
                        <CommentList
                          list={comments}
                          userDetail={this.userDetail}
                        />
                      ) : null}
                    </>
                  )}
                />
              </Card>
            </div>
          </Col>

          <Col className={styles.contRight} span={4}>
            {this.renderRight(recommend)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  ({
    home,
    loading,
  }: {
    home: StateType;
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    list: home.list,
    comments: home.comments,
    recommend: home.recommend,
    currentUser: home.currentUser,
    likeArticles: home.likeArticles,
    loadFlag: loading.effects['home/fetchData'],
  }),
)(ContentList);
