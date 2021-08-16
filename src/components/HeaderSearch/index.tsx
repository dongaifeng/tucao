import React, { FC, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, AutoComplete, message } from 'antd';
import styles from './index.less';

export interface PropsType {}

const options = [{ lable: 'aaa', value: 'aaa' }];

const HeaderSearch: FC<PropsType> = () => {
  const onSearch = () => {
    message.info('此功能暂未开放');
  };

  return (
    <div className={styles.headerSearch}>
      {/* <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      /> */}

      <AutoComplete
        className={styles.autoInput}
        dropdownMatchSelectWidth={250}
        style={{ width: 250 }}
        options={options}
      >
        <Input.Search onSearch={onSearch} placeholder="功能暂未开放" />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
