import React from 'react';
import { Card, Avatar } from 'antd';
import styles from './fans.less';

const gridStyle: React.CSSProperties = {
  width: '50px ',
  textAlign: 'center',
};

export default () => {
  return (
    <div>
      <Card title="Card Title">
        <Card.Grid style={gridStyle}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <div>董爱锋</div>
        </Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
      </Card>
    </div>
  );
};
