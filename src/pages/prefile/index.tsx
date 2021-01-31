import React, { Component, useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Input, Divider, Tag, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, connect, Dispatch } from 'umi';
import styles from './index.less';
import Conllect from '../collect';
import UserCard from './components/UserCard';
import TucaoList from './components/TucaoList';
import TagList from '@/pages/setting/components/TagList';
import { ModalState } from './model';
import { addTags } from './service';

const operationTabList = (userInfo: ModalState['userInfo']) => [
  {
    key: 'tucao',
    tab: (
      <span>
        吐槽{' '}
        <span style={{ fontSize: 14 }}>({userInfo.articleCount || 0})</span>
      </span>
    ),
  },
  {
    key: 'articles',
    tab: (
      <span>
        鸡汤 <span style={{ fontSize: 14 }}>(0)</span>
      </span>
    ),
  },
];

interface PropsType {
  dispatch: Dispatch;
  match: any;
  userInfo: ModalState['userInfo'];
}
interface TStateType {
  tabKey: string;
}

class Prefile extends Component<PropsType, TStateType> {
  state: TStateType = {
    tabKey: 'tucao',
  };

  renderChildrenByTabKey = (tabKey: any['tabKey']) => {
    if (tabKey === 'tucao') {
      return <TucaoList />;
    }
    if (tabKey === 'articles') {
      return '没有鸡汤';
    }
    return null;
  };

  addTag = async (tags: string) => {
    const { user_id, name } = this.props.userInfo;
    const res = await addTags({ tags, tadInUserId: user_id });
    if (res.code === 'success') {
      message.success(`你成功的给${name}添加了标签`);
      this.getUserInfo();
    }
  };

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as string,
    });
  };

  getUserInfo = () => {
    const userId = this.props.match.params.userId;
    const { dispatch } = this.props;

    dispatch({
      type: 'prefile/getUserInfo',
      payload: { userId },
    });
  };

  followHandle = () => {
    const { user_id, followStatus } = this.props.userInfo;
    const { dispatch } = this.props;
    dispatch({
      type: 'prefile/followHandle',
      payload: { beFollowId: user_id, followStatus },
      callback: () => {
        this.getUserInfo();
      },
    });
  };

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    const { tabKey } = this.state;
    const { userInfo } = this.props;
    console.log('----unserinfo', userInfo);
    return (
      <div className={styles.box}>
        <Row gutter={16}>
          <Col lg={7} md={24}>
            <Card className={styles.infoBox}>
              <UserCard info={userInfo} />
              <Divider style={{ marginTop: 16 }} dashed />

              <Row className={styles.followInfo}>
                <Col span={12}>
                  <p className={styles.count}>{userInfo.fansCount}</p>
                  <p className={styles.infoLabel}>关注者</p>
                </Col>

                <Col span={12}>
                  <p className={styles.count}>{userInfo.followCount}</p>
                  <p className={styles.infoLabel}>关注了</p>
                </Col>
              </Row>

              <Button
                onClick={this.followHandle}
                type={userInfo.followStatus ? 'default' : 'primary'}
                block
              >
                {userInfo.followStatus ? '已关注' : '关注TA'}
              </Button>

              <Divider style={{ marginTop: 16 }} dashed />
              <div className={styles.tagsTitle}>TA的标签</div>
              <TagList value={userInfo.tags} onChange={this.addTag} />
            </Card>
          </Col>

          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              tabList={operationTabList(userInfo)}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

type P = {
  prefile: ModalState;
};

export default connect(({ prefile }: P) => ({
  userInfo: prefile.userInfo,
}))(Prefile);
