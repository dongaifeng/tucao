import React, { FC, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, AutoComplete } from 'antd';
import styles from './index.less';

export interface PropsType {}

const options = [{ lable: 'aaa', value: 'aaa' }];

const HeaderSearch: FC<PropsType> = () => {
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
        <Input addonAfter={<SearchOutlined />} placeholder="input here" />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
