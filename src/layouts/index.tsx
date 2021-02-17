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
    <div className={styles.indexLayout}>
      <Layout>
        <Header className={styles.pageHeader}>
          <GlobalHeader />
        </Header>
        <Content className={styles.cont}>
          <div className={styles.frostedGlass}></div>
          {props.children}
        </Content>
        <Footer className={styles.footer}>
          www.tucaobawamg.cn by: dongaifeng@qq.com
        </Footer>
      </Layout>
    </div>
  );
};

export default BasicLayout;
