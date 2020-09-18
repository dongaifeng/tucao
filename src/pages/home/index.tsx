import React, { FC } from 'react';
import { connect, Dispatch } from 'umi';
import { Row, Col, Card, List, Avatar } from 'antd';
import {
  LoadingOutlined,
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import styles from './index.less';

import { StateType } from './model';
import { ListItemDataType } from './data.d';

interface TStateType {
  loading: boolean;
}
interface PropsType {
  dispatch: Dispatch<any>;
  list: ListItemDataType[];
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

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'home/fetchData',
      payload: { size: 10, page: 1 },
    });
  }

  render() {
    const { loading } = this.state;
    const { list } = this.props;

    console.log(list);

    return (
      <>
        <Row>
          <Col className={styles.contLeft} span={4}>
            left
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
                          text={item.star}
                          key="list-vertical-like-o"
                        />,
                        <IconText
                          icon={MessageOutlined}
                          text={item.star}
                          key="list-vertical-message"
                        />,
                      ]}
                      extra={
                        <img
                          width={272}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      }
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={item.title}
                        description="时间：2002-22-2-1"
                      />
                      <span>文章内容</span>
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>

          <Col className={styles.contRight} span={4}>
            col
          </Col>
        </Row>
      </>
    );
  }
}

export default connect(({ home }: { home: StateType }) => ({
  list: home.list,
}))(ContentList);
