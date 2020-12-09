import React, { FC } from 'react';
import { connect, Dispatch } from 'umi';
import { Row, Col, Card, List, Avatar, Input } from 'antd';
import {
  UploadOutlined,
  LoadingOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';

import LeftContent from './conponents/LeftContent';
import styles from './index.less';

import { StateType } from './model';
import { ListItemDataType } from './data.d';

interface TStateType {
  loading: boolean;
  key: string;
  pubVal: undefined | string;
}
interface PropsType {
  dispatch: Dispatch;
  list: ListItemDataType[];
  recommend: ListItemDataType[];
}

interface TPType {
  icon: React.ReactNode | any;
  text: string | number;
}

const IconText: FC<TPType> = ({ icon, text }) => {
  return (
    <span>
      {React.createElement(icon)}
      {text}
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
    loading: false,
    key: 'tab1',
    pubVal: undefined,
  };

  loadMore = () => {
    return <div>jiaz</div>;
  };

  fetchData = (size: number) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchData',
      payload: { size, page: 1 },
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

  componentDidMount() {
    this.fetchData(10);
    this.fetchRecommend();
  }

  render() {
    const { loading, key } = this.state;
    const { list, recommend } = this.props;

    console.log(this.props, '<---------------');

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
                    placeholder="发表心情"
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
                loading={loading}
              >
                <List
                  itemLayout="vertical"
                  // loadMore={this.loadMore}
                  // header={<div>头部</div>}
                  footer={<div>底部</div>}
                  dataSource={list}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <IconText
                          icon={StarOutlined}
                          text={item.star}
                          key="list-vertical-star-o"
                        />,
                        <IconText
                          icon={LikeOutlined}
                          text={item.activeUser}
                          key="list-vertical-like-o"
                        />,
                        <IconText
                          icon={MessageOutlined}
                          text={item.likes}
                          key="list-vertical-message"
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={item.title}
                        description={'发布时间：' + item.updatedAt}
                      />
                      <span>{item.content}</span>
                    </List.Item>
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
}))(ContentList);
