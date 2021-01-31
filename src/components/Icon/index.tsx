import React, { FC } from 'react';
import { Tooltip } from 'antd';

interface CompProp {
  icon: any;
  alt?: string | undefined;
}

const Icon: FC<CompProp> = ({ icon, alt, ...other }) => {
  return (
    <Tooltip title={alt} color="#2db7f5">
      <span style={{ marginRight: '8px' }}>
        {React.createElement(icon, other)}
      </span>
    </Tooltip>
  );
};

export default Icon;
