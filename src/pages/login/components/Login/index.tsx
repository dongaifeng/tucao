import React, {
  FC,
  createContext,
  useState,
  ReactElement,
  ReactComponentElement,
} from 'react';
import useMergeValue from 'use-merge-value';
import { Form, Tabs } from 'antd';
import { FormInstance } from 'antd/es/form';

import LoginTab from './LoginTab';
import LoginItems, { ItemType, LoginSubmitType } from './LoginItem';
import styles from './index.less';
import { LoginData } from '../../index';

export const LoginContext = createContext({});

export interface LoginProps {
  activeKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (values: LoginData) => void;
  className?: string;
  form?: FormInstance;
  children: React.ReactElement<typeof LoginTab>[];
}

interface LoginFormType extends React.FC<LoginProps> {
  LoginTab: typeof LoginTab;
  Submit: React.FunctionComponent<LoginSubmitType>;
  UserName: React.FunctionComponent<ItemType>;
  Password: React.FunctionComponent<ItemType>;
  Mobile: React.FunctionComponent<ItemType>;
  Captcha: React.FunctionComponent<ItemType>;
}

const LoginForm: LoginFormType = props => {
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState();
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });

  const children = props.children;
  const TabChildren: ReactComponentElement<any>[] = [];
  const OtherChildren: ReactComponentElement<any>[] = [];

  React.Children.map(children, (child, i) => {
    if (!child) {
      return;
    }

    // console.log(child, '<------child');

    if (child.type.typeName === 'LoginTab') {
      TabChildren.push(child);
    } else {
      OtherChildren.push(child);
    }
  });

  return (
    <LoginContext.Provider
      value={{
        tabUtil: {
          addTab: (id: string) => {
            setTabs([...tabs, id]);
          },
          removeTab: (id: string) => {
            setTabs(tabs.filter(currentId => currentId !== id));
          },
          updateActive: activeItem => {
            if (active[type]) {
              active[type].push(activeItem);
            } else {
              active[type] = [activeItem];
            }
            setActive(active);
          },
        },
      }}
    >
      <div className={styles.login}>
        <Form
          form={props.form}
          onFinish={values => {
            if (props.onSubmit) {
              props.onSubmit(values as LoginData);
            }
          }}
        >
          <Tabs
            className={styles.tabs}
            activeKey={type}
            onChange={activeKey => {
              setType(activeKey);
            }}
          >
            {TabChildren}
          </Tabs>
          {OtherChildren}
        </Form>
      </div>
    </LoginContext.Provider>
  );
};

LoginForm.LoginTab = LoginTab;
LoginForm.UserName = LoginItems.UserName;
LoginForm.Password = LoginItems.Password;
LoginForm.Mobile = LoginItems.Mobile;
LoginForm.Captcha = LoginItems.Captcha;
LoginForm.Submit = LoginItems.LoginSubmit;

export default LoginForm;
