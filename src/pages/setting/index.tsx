import React, { Component, useRef, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { Form, Input, Button, Select, Row, Col } from 'antd';
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

class Setting extends Component<PropsType & IStateType> {
  state: IStateType = {
    cities: {},
    provinces: undefined,
    city: undefined,
  };

  onFinish = (values: any) => {
    console.log('Success:', values);
    const { dispatch } = this.props;
    const { provinces = '', city = '' } = this.state;
    const country = `${provinces}-${city}`;
    dispatch({
      type: 'user/modifyUser',
      payload: { country, ...values },
    });
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  delTag = (tag: string) => {
    console.log(tag, '<-----tag');
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

    // this.setState({
    //   cities: provinces[this.props.userInfo?.province].citys,
    // });
  }

  // componentDidUpdate中必须比较 props 否则会产生死循环
  componentDidUpdate(prevProps: PropsType) {
    console.log(this.props?.userInfo, 'componentDidUpdate');

    if (this.props.userInfo && this.props.userInfo !== prevProps.userInfo) {
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
                <TagList delFlag delTagHandle={this.delTag} />
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
