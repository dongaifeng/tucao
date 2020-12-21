import React, { Component, useRef, useState } from 'react';
import { connect, Dispatch } from 'umi';
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Avatar,
  Upload,
  message,
  Tag,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { UserOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { CurrentUser } from '@/models/gloal';
import { StateType } from '@/models/user';
import areaData from './areaData';
import PageLoading from '@/components/PageLoading';
import TagList from './components/TagList';
import AvatarView from './components/AvatarView';
import styles from './index.less';
const { Option } = Select;

interface PropsType {
  dispatch: Dispatch;
  userInfo: StateType['userInfo'];
}
interface IStateType {
  cities: { [propName: string]: any };
  provinces: string | undefined;
  city: string | undefined;
}

const provinces = areaData.provinces;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// const props = {
//   name: 'file',
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   headers: {
//     authorization: 'authorization-text',
//   },
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

// 头像组件
// const AvatarView = ({ avatar }: { avatar: string }) => (
//   <div className={styles.avatarBox}>
//     <Avatar src={avatar} size={64} icon={<UserOutlined />} />

//     <div style={{ marginTop: '20px', }} >
//       <ImgCrop rotate>
//         <Upload

//         >
//           <Button type="primary" ghost icon={<UploadOutlined />}>
//             上传头像
//           </Button>
//         </Upload>
//       </ImgCrop>
//     </div>
//   </div>
// );

class Setting extends Component<PropsType & IStateType> {
  state: IStateType = {
    cities: {},
    provinces: undefined,
    city: undefined,
  };

  onFinish = (values: any) => {
    console.log('Success:', values);
    const { dispatch } = this.props;
    const country = `${this.state.provinces}-${this.state.city}`;
    dispatch({
      type: 'user/modifyUser',
      payload: { country, ...values },
    });
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  ProvinceChange = (value: string) => {
    console.log(value);
    this.setState({
      cities: provinces[value].citys,
      provinces: provinces[value].name,
    });
  };

  CityChange = (value: string) => {
    console.log(value);
    this.setState((state: IStateType, props) => ({
      city: state.cities[value].name,
    }));
  };

  componentDidMount() {
    console.log(this.props?.userInfo, 'did mount');
  }

  // componentDidUpdate中必须比较 props 否则会产生死循环
  componentDidUpdate(prevProps: PropsType) {
    console.log(this.props?.userInfo, 'componentDidUpdate');

    if (this.props.userInfo !== prevProps.userInfo && this.props.userInfo) {
      this.setState({
        cities: provinces[this.props.userInfo.province].citys,
      });
    }
  }

  render() {
    const { cities } = this.state;
    const { userInfo } = this.props;
    if (!userInfo) {
      return (
        <div className={styles.box}>
          <PageLoading />
        </div>
      );
    }

    return (
      <div className={styles.box}>
        <Row justify="center">
          <Col span={10}>
            <AvatarView avatar={userInfo.avatar || ''} />

            <Form
              {...layout}
              name="basic"
              initialValues={userInfo}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="昵称"
                name="name"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="email" label="邮箱">
                <Input />
              </Form.Item>

              <Form.Item
                label="手机号"
                name="phone"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="我的标签" name="tags">
                <TagList />
              </Form.Item>

              <Form.Item label="居住地">
                <Form.Item noStyle name="province">
                  <Select
                    placeholder="选择省份"
                    style={{ width: 200 }}
                    onChange={this.ProvinceChange}
                  >
                    {Object.keys(provinces).map(item => (
                      <Option key={item} value={item}>
                        {provinces[item].name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <span style={{ padding: '0px 20px' }}>--</span>

                <Form.Item noStyle name="city">
                  <Select
                    placeholder="选择城市"
                    style={{ width: 200 }}
                    onChange={this.CityChange}
                  >
                    {Object.keys(cities).map(item => (
                      <Option value={item} key={item}>
                        {cities[item].name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form.Item>

              <Form.Item
                label="个人介绍"
                name="introduce"
                rules={[
                  { required: true, message: '用一段文字来描述自己吧！' },
                ]}
              >
                <Input.TextArea autoSize={{ minRows: 5, maxRows: 5 }} />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

type P = {
  user: StateType;
};

export default connect(({ user }: P) => ({
  userInfo: user.userInfo,
}))(Setting);
