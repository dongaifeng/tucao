import React, { useState } from 'react';
import { IRouteComponentProps } from 'umi';
import styles from './index.less';

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import GlobalHeader from '@/components/GlobalHeader';
import PageLoading from '@/components/PageLoading';

const BasicLayout: React.FC<IRouteComponentProps> = props => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div>
      <Layout>
        <Header className={styles.pageHeader}>
          <GlobalHeader />
        </Header>
        <Content className={styles.cont}> {props.children}</Content>
        <Footer className={styles.footer}>
          www.tucaoba.com by: dongaifeng
        </Footer>
      </Layout>
    </div>
  );
};

export default BasicLayout;
