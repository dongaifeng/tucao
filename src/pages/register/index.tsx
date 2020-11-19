import React, { FC, useEffect, useState } from 'react';
import { Link, Dispatch, connect, history } from 'umi';
import { Form, Input, Button, Row, Col, message } from 'antd';
import styles from './index.less';
import { StateType } from '../../models/user';
import { CurrentUser } from '@/models/gloal.d';

import { sendCode } from '@/service/user';

let timer: number | undefined;
interface PageType {
  dispatch: Dispatch;
  status: string | undefined;
  userInfo?: CurrentUser | null;
}

interface ValuesType {
  password: string;
  username: string;
  emailCode: string;
  email: string;
  passwordAgain?: string;
}

const EmailCaptcha = ({
  getEmailCaptcha,
  num,
}: {
  getEmailCaptcha: () => void;
  num: number | undefined;
}) => (
  <Row gutter={8}>
    <Col span={16}>
      <Form.Item
        name="emailCode"
        rules={[{ required: true, message: '请输入邮箱的验证码' }]}
      >
        <Input placeholder="请输入邮箱的验证码" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Button
        disabled={!!num}
        type="primary"
        className={styles.getCaptcha}
        onClick={getEmailCaptcha}
      >
        {num ? `${num} s` : '验证邮箱'}
      </Button>
    </Col>
  </Row>
);

const SvgCode = ({
  refreshSvg,
  flag,
}: {
  refreshSvg: () => void;
  flag: Number;
}) => (
  <Row gutter={8}>
    <Col span={14}>
      <Form.Item
        name="svgCode"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Input placeholder="请输入图片中的验证码" />
      </Form.Item>
    </Col>
    <Col span={10}>
      <img
        onClick={refreshSvg}
        className={styles.svgImg}
        src={'/api/captcha/?code=' + flag}
        alt="点击刷新图片"
      />
    </Col>
  </Row>
);

const Register: FC<PageType> = ({ dispatch, status, userInfo }) => {
  const [form] = Form.useForm();
  const [num, setNum] = useState<number | undefined>();
  const [flag, setFlag] = useState<number>(0);

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   if (status === 'ok') {
  //     message.success('注册成功！');
  //     history.push({
  //       pathname: '/user/login',
  //       query: {
  //         a: 'b',
  //       },
  //     });
  //   }

  //   return () => dispatch({
  //     type: 'user/saveRegister',
  //     payload: undefined,
  //   })
  // }, [status]);

  const refreshSvg = () => {
    setFlag(Math.random());
  };

  const onFinish = (values: ValuesType) => {
    dispatch({
      type: 'user/register',
      payload: values,
    });

    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // 邮箱验证码
  const getEmailCaptcha = () => {
    let a = 60;
    timer = window.setInterval(() => {
      setNum(--a);

      if (a === 0) {
        clearInterval(timer);
      }
    }, 1000);
    const email = form.getFieldValue('email'); // '864857106@qq.com'
    sendCode({ email }).then(res => {
      message.success(res.message);
    });
  };

  const checkPwd = (rule: [], value: string) => {
    console.log(value, form.getFieldValue('password'));

    if (value && form.getFieldValue('password') !== value) {
      return Promise.reject('两次输入的密码不同');
    }
    return Promise.resolve();
  };

  return (
    <div className={styles.box}>
      <Form
        form={form}
        name="basic"
        size="large"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="设置一个昵称" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          name="passwordAgain"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: '请再次输入密码' },
            { validator: checkPwd },
          ]}
        >
          <Input.Password placeholder="请再次输入密码" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入合法邮箱' },
            { type: 'email', message: '邮箱不合法' },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <EmailCaptcha num={num} getEmailCaptcha={getEmailCaptcha} />

        <SvgCode flag={flag} refreshSvg={refreshSvg} />

        <Form.Item>
          <Button style={{ width: '100%' }} type="primary" htmlType="submit">
            注 册
          </Button>
        </Form.Item>
        <Link className={styles.login} to="/user/login">
          返回登录
        </Link>
      </Form>
    </div>
  );
};

type P = {
  user: StateType;
};

export default connect(
  //mapStatetoProps
  ({ user }: P) => ({
    status: user.status,
    userInfo: user.userInfo,
  }),
)(Register);
