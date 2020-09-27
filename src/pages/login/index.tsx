import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch, Link } from 'umi';
import { Checkbox } from 'antd';
import { WechatOutlined } from '@ant-design/icons';

import LoginForm, { LoginContext } from './components/Login';
const { LoginTab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
import styles from './index.less';

// 封装 LoginForm组件，把要用到得组件全都挂在到它身上
// 通过React.Children.map遍历 LoginForm的 props.children, 通过LoginTab的 type.typeName 区分 是 Tab 还是其他的子组件
// 把input 的参数提取成单独对象，遍历 生成 UserName, Password, Mobile, Captcha, Submit
// createContext

export interface LoginData {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

interface PropsType {
  dispatch: Dispatch;
}

const Login: FC<PropsType> = ({ dispatch }) => {
  const [type, setType] = useState<string>('account');
  const [autoLogin, setAutoLogin] = useState<boolean>(true);

  useEffect(() => {
    dispatch({
      type: 'center/fetchCurrent',
    });
  }, []);

  const handleSubmit = (values: LoginData) => {
    console.log(values);
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <LoginTab key="account" tab="账户密码登录">
          <UserName
            name="userName"
            placeholder="用户名: admin or user"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />

          <Password
            name="password"
            placeholder="密码: ant.design"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </LoginTab>
        <LoginTab key="mobie" tab="手机号登录">
          <Mobile
            name="mobile"
            placeholder="手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </LoginTab>

        <div>
          <Checkbox
            checked={autoLogin}
            onChange={e => setAutoLogin(e.target.value)}
          >
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>

        <Submit>登录</Submit>

        <div className={styles.other}>
          其他登录方式
          <WechatOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

type P = {
  user: any;
  center: any;
};
export default connect(({ user, center }: P) => ({
  status: user.status,
  currentUser: center.currentUser,
}))(Login);
