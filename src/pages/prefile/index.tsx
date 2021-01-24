import React, { Component, useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  Input,
  Divider,
  List,
  Tag,
  Button,
  message,
} from 'antd';
import {
  PlusOutlined,
  HomeOutlined,
  ContactsOutlined,
  ClusterOutlined,
} from '@ant-design/icons';

import { Link, connect, Dispatch } from 'umi';
import styles from './index.less';
import { queryCollect } from './service';
import Conllect from '../collect';
import UserCard from './components/UserCard';

export interface TagType {
  key: string;
  label: string;
}

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        应用 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
  {
    key: 'projects',
    tab: (
      <span>
        项目 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];

const TagList: React.FC<{ tags: TagType[] }> = ({ tags }) => {
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (
      inputValue &&
      tempsTags.filter(tag => tag.label === inputValue).length === 0
    ) {
      tempsTags = [
        ...tempsTags,
        { key: `new-${tempsTags.length}`, label: inputValue },
      ];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map(item => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

class Prefile extends Component {
  state: any = {
    tabKey: 'articles',
  };

  renderChildrenByTabKey = (tabKey: any['tabKey']) => {
    if (tabKey === 'projects') {
      return <Conllect />;
    }
    if (tabKey === 'applications') {
      return '2222';
    }
    if (tabKey === 'articles') {
      return '3333';
    }
    return null;
  };

  onTabChange = (key: string) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key as CenterState['tabKey'],
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    const { dispatch } = this.props;

    dispatch({
      type: 'prefile/getUserInfo',
      payload: { userId },
    });
  }

  render() {
    const { tabKey } = this.state;

    console.log(this.props.userInfo);

    return (
      <div className={styles.box}>
        <Row gutter={16}>
          <Col lg={7} md={24}>
            <Card className={styles.infoBox}>
              <UserCard />
              <Divider style={{ marginTop: 16 }} dashed />

              <Row className={styles.followInfo}>
                <Col span={12}>
                  <p className={styles.count}>23</p>
                  <p className={styles.infoLabel}>关注者</p>
                </Col>

                <Col span={12}>
                  <p className={styles.count}>23</p>
                  <p className={styles.infoLabel}>关注者</p>
                </Col>
              </Row>

              <Button type="primary" block>
                关注TA
              </Button>

              <Divider style={{ marginTop: 16 }} dashed />

              <TagList
                tags={[
                  { key: '111', label: 'ahah' },
                  { key: '222', label: '222' },
                ]}
              />
            </Card>
          </Col>

          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
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
  follow: StateType;
};

export default connect(({ prefile }: P) => ({
  userInfo: prefile.userInfo,
}))(Prefile);
