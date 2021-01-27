import React, { FC, useEffect, useRef, useState } from 'react';
import { message } from 'antd';
import { Redirect } from 'umi';

const Auth = (props: any) => {
  console.log('auth----->', props);
  const { userId } = props.match.params;

  if (userId === 'null') {
    message.info('此用户没有注册信息!');
  }

  if (userId !== 'null') {
    return <>{props.children}</>;
  } else {
    return <Redirect to="/" />;
  }
};

export default Auth;
