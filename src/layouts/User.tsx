import React from 'react';
import { IRouteComponentProps } from 'umi';

const User: React.FC<IRouteComponentProps> = props => {
  return (
    <div>
      <h1>登录</h1>
      {props.children}
    </div>
  );
};

export default User;
