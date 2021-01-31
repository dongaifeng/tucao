import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'umi';
import { Input, Tag } from 'antd';
import { PlusOutlined, CloseCircleFilled } from '@ant-design/icons';
import { CurrentUser } from '@/models/gloal';
import { StateType } from '@/models/user';
import styles from '../index.less';

// export interface TagType {
//   key: string;
//   label: string;
// }

interface PropsType {
  onChange?: (val: string) => any;
  // delTagHandle?: (val: string) => any;
  value?: CurrentUser['tags'];
  delFlag?: boolean;
}

// 标签组件
const TagList: React.FC<PropsType> = ({
  value,
  onChange,
  // delTagHandle,
  delFlag,
}) => {
  // 可以直接 对象类型的接口里面的某一个属性
  const ref = useRef<Input | null>(null);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const arr = value?.split(',');
    if (arr) setNewTags(arr);
  }, [value]);

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
      tempsTags.filter(tag => tag === inputValue).length === 0
    ) {
      tempsTags = [...tempsTags, inputValue];
    }
    // setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
    onChange && onChange([...tempsTags].join(','));
  };

  const delTagHandle = (tag: string) => {
    let tempsTags = [...newTags];

    tempsTags.splice(tempsTags.indexOf(tag), 1);

    onChange && onChange([...tempsTags].join(','));
  };

  return (
    <div className={styles.tags}>
      {newTags.length > 0 &&
        newTags.map((item: string, ind: number) => (
          <Tag color="#f50" key={ind}>
            {item}
            {delFlag && (
              <div className={styles.delTag}>
                <CloseCircleFilled onClick={() => delTagHandle(item)} />
              </div>
            )}
          </Tag>
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

export default TagList;
