import React, { createContext, useState } from 'react';
import useMergeValue from 'use-merge-value';
import { Form, Tabs } from 'antd';

export const LoginContext = createContext({});

import LoginTab from './LoginTab';

const LoginForm = props => {
  const [tabs, setTabs] = useState<string[]>([]);
  const [active, setActive] = useState();
  const [type, setType] = useMergeValue('', {
    value: props.activeKey,
    onChange: props.onTabChange,
  });

  const children = props.children;
  const TabChildren = [];
  const OtherChildren = [];

  React.Children.map(children, (child, i) => {
    if (!child) {
      return;
    }

    console.log(child, '<------child');

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
          addTab: id => {
            setTabs([...tabs, id]);
          },
          removeTab: id => {
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
      <div>
        <Form>
          <Tabs
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

export default LoginForm;
