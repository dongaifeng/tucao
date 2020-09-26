import React, { FC } from 'react';
import { connect, Dispatch } from 'umi';
import { Row, Col, Card, List, Avatar } from 'antd';
import {
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
}
interface PropsType {
  dispatch: Dispatch;
  list: ListItemDataType[];
  fecommend: ListItemDataType[];
}

interface TPType {
  icon: React.ReactNode;
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

class ContentList extends React.Component<PropsType, TStateType> {
  state: TStateType = {
    loading: false,
  };

  loadMore = () => {
    return <div>jiaz</div>;
  };

  fetchData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchData',
      payload: { size: 10, page: 1 },
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
            {item.subDescription}
          </p>
        ))}
      </Card>
    </div>
  );

  componentDidMount() {
    this.fetchData();
    this.fetchRecommend();
  }

  render() {
    const { loading } = this.state;
    const { list, recommend } = this.props;

    console.log(this.props, '<---------------');

    return (
      <div>
        <Row>
          <Col className={styles.contLeft} span={4}>
            <LeftContent />
          </Col>

          <Col className={styles.content} span={16}>
            <div style={{ width: '100%', padding: 10 }}>
              <Card style={{ width: '100%', marginTop: 16 }} loading={loading}>
                <List
                  itemLayout="vertical"
                  // loadMore={this.loadMore}
                  header={<div>头部</div>}
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
                          text={item.like}
                          key="list-vertical-message"
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={item.title}
                        description="发布时间：2002-22-2-1"
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
