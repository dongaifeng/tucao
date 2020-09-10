import React, { useState } from 'react';
import { IRouteComponentProps } from 'umi';

import GlobalHeader from '@/components/GlobalHeader';
import PageLoading from '@/components/PageLoading';

const Layout: React.FC<IRouteComponentProps> = props => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div>
      <GlobalHeader />
      {props.children}
    </div>
  );
};

export default Layout;
