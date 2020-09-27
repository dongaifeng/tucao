import React, { FC, useEffect, useState } from 'react';
import { Link, Dispatch, connect } from 'umi';
import { Form, Input, Button, Row, Col } from 'antd';
import styles from './index.less';

let timer: number | undefined;
interface PageType {
  dispatch: Dispatch;
}

interface ValuesType {
  password: string;
  username: string;
  captcha: string;
  email: string;
  passwordAgain: string;
}

const Captcha = ({
  getCaptCha,
  num,
}: {
  getCaptCha: () => void;
  num: number;
}) => (
  <Row gutter={8}>
    <Col span={16}>
      <Form.Item name="captcha">
        <Input placeholder="验证码" />
      </Form.Item>
    </Col>
    <Col span={8}>
      <Button
        disabled={!!num}
        type="primary"
        className={styles.getCaptcha}
        onClick={getCaptCha}
      >
        {num ? `${num} s` : '获取验证码'}
      </Button>
    </Col>
  </Row>
);

const Register: FC<PageType> = ({ dispatch }) => {
  const [form] = Form.useForm();
  const [num, setNum] = useState<number | undefined>();

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);

  const onFinish = (values: ValuesType) => {
    dispatch({
      type: 'register',
      payload: values,
    });
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const getCaptCha = () => {
    let a = 60;
    timer = window.setInterval(() => {
      setNum(--a);

      if (a === 0) {
        clearInterval(timer);
      }
    }, 1000);
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
            // { type: 'email', message: '邮箱不合法'}
          ]}
        >
          <Input placeholder="请输入合法邮箱" />
        </Form.Item>

        <Captcha num={num} getCaptCha={getCaptCha} />

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

export default connect(
  //mapStatetoProps
  () => ({}),
)(Register);
