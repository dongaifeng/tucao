import React, { Component, useRef, useState } from 'react';
import { connect, Dispatch, Link } from 'umi';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
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
  provinceName: string | undefined;
  cityName: string | undefined;
  changed: boolean;
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
    provinceName: undefined,
    cityName: undefined,
    changed: false,
  };
  formRef = React.createRef<FormInstance>();

  // 提交数据： 验证有没有修改过资料， 没有则不请求
  // 需要组装 country 字段，方便首页展示
  onFinish = (values: any) => {
    console.log('Success:', values);
    const { provinceName = '', cityName = '', changed } = this.state;
    const { dispatch } = this.props;
    const country = `${provinceName}-${cityName}`;

    if (!changed) {
      return message.info('您并没有修改任何信息');
    }

    dispatch({
      type: 'user/modifyUser',
      payload: { country, ...values },
    });

    this.setState({ changed: false });
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  onFormChange = (changedValues: any) => {
    this.setState({ changed: true });
  };

  delTag = (tag: string) => {
    console.log(tag, '<-----tag');
  };

  // 省份改变时：重置 城市下拉框，清空表单city字段，给provinceName赋值
  ProvinceChange = (value: string) => {
    console.log(value);
    this.formRef.current!.setFieldsValue({
      city: undefined,
    });

    this.setState({
      cities: provinces[value].citys,
      provinceName: provinces[value].name,
    });
  };

  CityChange = (value: string) => {
    console.log(value);
    this.setState((state: IStateType, props) => ({
      cityName: state.cities[value].name,
    }));
  };

  initData = () => {
    if (this.props.userInfo) {
      const { province, city } = this.props.userInfo;
      if (province && city) {
        this.setState({
          cities: provinces[province].citys,
          cityName: provinces[province].citys[city].name,
          provinceName: provinces[province].name,
        });
      }
    }
  };

  // 组件挂在后 根据用户的 省份code 获取 城市的列表
  componentDidMount() {
    console.log(this.props?.userInfo, 'did mount');
    this.initData();
  }

  // componentDidUpdate中必须比较 props 否则会产生死循环
  componentDidUpdate(prevProps: PropsType) {
    console.log(this.props?.userInfo, 'componentDidUpdate');

    if (this.props.userInfo && this.props.userInfo !== prevProps.userInfo) {
      this.initData();
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
              ref={this.formRef}
              {...layout}
              name="basic"
              initialValues={userInfo}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              onValuesChange={this.onFormChange}
            >
              <Form.Item
                label="昵称"
                name="name"
                rules={[{ required: true, message: '请输入你的昵称！' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="email" label="邮箱">
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="手机号"
                name="phone"
                rules={[{ required: true, message: '请输入手机号!' }]}
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
                <Link to="/" style={{ marginLeft: '20px' }}>
                  返回首页
                </Link>
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
