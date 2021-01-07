import React, { FC } from 'react';
import { connect, Dispatch } from 'umi';
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
import { ListItemDataType } from './data.d';
import { CurrentUser } from '@/models/gloal';

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
  list: ListItemDataType[];
  recommend: ListItemDataType[];
  currentUser: CurrentUser;
  likeArticles: StateType['likeArticles'];
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
      payload: { size, page },
    });

    this.setState({
      initLoading: false,
      page: page + 1,
    });
  };

  fetchRecommend = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchRecommend',
      payload: { size: 7, page: 1 },
    });
  };

  renderRight = (recommend: ListItemDataType[]) => (
    <div>
      <Card
        title="推荐阅读"
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
    this.setState({ key: key });
    const a = key === 'tab2' ? 1 : 10;
    this.fetchData(a);
  };

  publish = () => {
    console.log(this.state.pubVal);
    const { dispatch } = this.props;
    dispatch({
      type: 'home/publish',
      payload: { content: this.state.pubVal },
    });
  };

  pubChange = (value: string) => {
    this.setState({
      pubVal: value,
    });
  };

  collectHandle = (item: ListItemDataType) => {
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

  likeHandle = (item: ListItemDataType) => {
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

  commentHandle = (item: ListItemDataType) => {
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

  componentDidMount() {
    const { page, size } = this.state;
    this.fetchData(size, page);
    this.fetchRecommend();
  }

  render() {
    const { initLoading, loading, key, showCommentId } = this.state;
    const { list, recommend, currentUser, likeArticles } = this.props;

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

    // console.log(this.props, '<---------------');

    return (
      <div>
        <Row>
          <Col className={styles.contLeft} span={4}>
            <LeftContent />
          </Col>

          <Col className={styles.content} span={16}>
            <div style={{ margin: '10px' }}>
              <Row>
                <Col span={22}>
                  <Input.TextArea
                    style={{ resize: 'none' }}
                    onChange={e => this.pubChange(e.target.value)}
                    // value={pubVal}
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
            <div style={{ width: '100%', padding: 10 }}>
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
                  loading={initLoading}
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
                          avatar={<Avatar src={item.avatar} />}
                          title={item.ownerName || 'TA不想有名字'}
                          description={'发布时间：' + item.updatedAt}
                        />
                        <span>{item.content}</span>
                      </List.Item>
                      {item.id === showCommentId ? <CommentList /> : null}
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

export default connect(({ home }: { home: StateType }) => ({
  list: home.list,
  recommend: home.recommend,
  currentUser: home.currentUser,
  likeArticles: home.likeArticles,
}))(ContentList);
