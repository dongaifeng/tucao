import React from 'react';
import { Row, Col, Card, List } from 'antd';
import styles from './index.less';

class ContentList extends React.Component {
  state = {
    loading: true,
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Row>
          <Col className={styles.contLeft} span={4}>
            left
          </Col>

          <Col className={styles.content} span={16}>
            <div style={{ width: '100%', height: '1200px' }}>
              <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                <List>
                  <List.Item></List.Item>
                </List>
              </Card>
            </div>
          </Col>

          <Col className={styles.contRight} span={4}>
            col
          </Col>
        </Row>
      </div>
    );
  }
}

export default ContentList;
