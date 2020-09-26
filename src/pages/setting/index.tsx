import React, { Component } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Avatar,
  Upload,
  message,
} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

import styles from './index.less';

interface PropsType {}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class Setting extends Component<PropsType> {
  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div className={styles.box}>
        <Row justify="center">
          <Col span={10}>
            <div className={styles.avatarBox}>
              <Avatar size={64} icon={<UserOutlined />} />

              <div
                style={{
                  marginTop: '20px',
                }}
              >
                <Upload {...props}>
                  <Button type="primary" ghost icon={<UploadOutlined />}>
                    上传头像
                  </Button>
                </Upload>
              </div>
            </div>

            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="昵称"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="邮箱"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="个人介绍"
                name="detail"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Setting;
