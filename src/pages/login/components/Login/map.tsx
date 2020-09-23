import React from 'react';
import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import styles from './index.less';

// 把表单里每项得属性抽离出来，单独文件维护
export default {
  UserName: {
    props: {
      size: 'large',
      id: 'username',
      prefix: (
        <UserOutlined
          style={{ color: '#1890ff' }}
          className={styles.prefixIcon}
        />
      ),
      placeholder: 'admin',
    },

    rules: [{ required: true, message: '请输入用户名' }],
  },

  Password: {
    props: {
      size: 'large',
      prefix: <LockTwoTone className={styles.prefixIcon} />,
      type: 'password',
      id: 'password',
      placeholder: '888888',
    },
    rules: [{ required: true, message: 'Please enter password!' }],
  },

  Mobile: {
    props: {
      size: 'large',
      prefix: <MobileTwoTone className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: 'Please enter mobile number!',
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!',
      },
    ],
  },

  Captcha: {
    props: {
      size: 'large',
      prefix: <MailTwoTone className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!',
      },
    ],
  },
};
