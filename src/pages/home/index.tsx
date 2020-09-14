import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <div>
      <Row>
        <Col className={styles.contLeft} span={4}>
          left
        </Col>
        <Col className={styles.content} span={16}>
          <div style={{ width: '100%', height: '1200px' }}>
            qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
          </div>
        </Col>
        <Col className={styles.contRight} span={4}>
          col
        </Col>
      </Row>
    </div>
  );
};
