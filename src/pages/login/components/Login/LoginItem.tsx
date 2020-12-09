import React, { FC, useState, useCallback, useEffect } from 'react';
import { Button, Col, Input, Row, Form, message } from 'antd';
import { FormItemProps } from 'antd/es/form/FormItem';
import { ButtonProps } from 'antd/es/button';

import itemMap from './loginItemMap';
import { LoginContext } from './index';
import styles from './index.less';

export type MapKey = keyof typeof itemMap;

export interface ItemType extends Partial<FormItemProps> {
  name?: string;
  placeholder?: string;
  buttonText?: React.ReactNode;
  defaultValue?: string;

  countDown?: number;
  type?: string;
  getCaptchaButtonText?: string;
  getCaptchaSecondText?: string;
  subProp?: { [key: string]: unknown };
  tabUtil?: {};
}

export type WrappedItemType = ItemType;

export type LoginItemsType = {
  UserName: FC<WrappedItemType>;
  Password: FC<WrappedItemType>;
  Mobile: FC<WrappedItemType>;
  Captcha: FC<WrappedItemType>;
  LoginSubmit: FC<LoginSubmitType>;
};

const LoginItem: FC<ItemType> = props => {
  const {
    rules,
    type,
    name,
    subProp,
    placeholder,
    tabUtil,
    ...restProps
  } = props;

  console.log(props, 'bi-----------------');

  if (type === 'Captcha') {
    return (
      <Form.Item>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item name={name} rules={rules}>
              <Input {...subProp} placeholder={placeholder} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button className={styles.getCaptcha} size="large">
              获取验证码
            </Button>
          </Col>
        </Row>
      </Form.Item>
    );
  }

  return (
    <Form.Item name={name} rules={rules}>
      <Input {...subProp} placeholder={placeholder} />
    </Form.Item>
  );
};

const LoginItems: Partial<LoginItemsType> = {};

Object.keys(itemMap).forEach(key => {
  const item = itemMap[key];

  LoginItems[key] = (props: ItemType) => {
    console.log(props, item, '<---------------ai');
    return (
      <LoginContext.Consumer>
        {context => (
          <LoginItem
            type={key}
            rules={item.rules}
            subProp={item.props}
            {...props}
            {...context}
          />
        )}
      </LoginContext.Consumer>
    );
  };
});

export interface LoginSubmitType extends ButtonProps {
  className?: string;
}

const LoginSubmit: FC<LoginSubmitType> = props => {
  const { className, ...rest } = props;
  return (
    <Form.Item>
      <Button
        size="large"
        className={`${styles.submit} ${className}`}
        type="primary"
        htmlType="submit"
        {...rest}
      />
    </Form.Item>
  );
};

LoginItems.LoginSubmit = LoginSubmit;

export default LoginItems as LoginItemsType;
