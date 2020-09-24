import React, { useContext, useEffect } from 'react';
import { Tabs } from 'antd';
import { LoginContext } from './index';
import { connect } from 'umi';

const { TabPane } = Tabs;

// 利用闭包 缓存了 i
const generateId = (() => {
  let i = 1;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

const LoginTab = props => {
  const { children } = props;
  const context = useContext(LoginContext);

  useEffect(() => {
    const uniqueId = generateId('login-tab-');
    const { tabUtil } = context;
    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, []);

  // console.log(props, context, '<-----props');

  return <TabPane {...props}>{props.active && children}</TabPane>;
};

LoginTab.typeName = 'LoginTab';
export default LoginTab;
