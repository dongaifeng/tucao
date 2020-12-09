import React, { Component, useRef, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  Avatar,
  Upload,
  message,
  Tag,
} from 'antd';
import { UserOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { CurrentUser } from '@/models/gloal';
import styles from './index.less';
const { Option } = Select;

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

export interface TagType {
  key: string;
  label: string;
}

// 标签组件
const TagList: React.FC<{ tags: CurrentUser['tags'] }> = ({ tags }) => {
  // 可以直接 对象类型的接口里面的某一个属性
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<TagType[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const showInput = () => {
    setInputVisible(true);
    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];
    if (
      inputValue &&
      tempsTags.filter(tag => tag.label === inputValue).length === 0
    ) {
      tempsTags = [
        ...tempsTags,
        { key: `new-${tempsTags.length}`, label: inputValue },
      ];
    }
    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      {(tags || []).concat(newTags).map(item => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} style={{ borderStyle: 'dashed' }}>
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class Setting extends Component<PropsType> {
  state = {
    provinceData,
    cityData,
  };

  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  handleProvinceChange = value => {};

  onSecondCityChange = value => {};

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
                label="手机号"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="我的标签" name="tags">
                <TagList tags={[]} />
              </Form.Item>

              <Form.Item label="居住地">
                <Select defaultValue={provinceData[0]} style={{ width: 120 }}>
                  {provinceData.map(province => (
                    <Option key={province} value={province}>
                      {province}
                    </Option>
                  ))}
                </Select>
                <Select style={{ width: 120 }}>
                  {cityData.Jiangsu.map(city => (
                    <Option key={city}>{city}</Option>
                  ))}
                </Select>
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
