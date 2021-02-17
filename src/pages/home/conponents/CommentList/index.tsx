import React, { FC, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { Comment, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import nouser from '@/assets/nouser.png';
import styles from './index.less';
import { StateType } from '../../model';

moment.locale('zh-cn');
const { TextArea } = Input;

interface Iprops {
  comments: StateType['comments'];
  loading: boolean;
  userDetail: (id: number) => void;
}
const CommentComp = ({ comments, loading, userDetail }: Iprops) => (
  <List
    dataSource={comments}
    loading={loading}
    locale={{ emptyText: '暂无评论' }}
    itemLayout="horizontal"
    renderItem={item => (
      <Comment
        avatar={item.avatar || nouser}
        content={item.content}
        author={
          <Button
            style={{ border: 0 }}
            onClick={() => userDetail(item.userId as number)}
          >
            {item.author || 'TA不想有名字'}
          </Button>
        }
        datetime={
          <Tooltip
            title={moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')}
          >
            <span>{moment(item.updateTime).fromNow()}</span>
          </Tooltip>
        }
      />
    )}
  />
);

interface EditorPropType {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string | undefined;
}

const Editor: FC<EditorPropType> = ({
  onChange,
  onSubmit,
  submitting,
  value,
}) => (
  <>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
        size="small"
      >
        评论
      </Button>
    </Form.Item>
  </>
);

interface PropType {
  list: StateType['comments'];
  activeArticleId: StateType['activeArticleId'];
  loading: boolean;
  dispatch: Dispatch;
  userDetail: (id: number) => void;
}

const CommentList: FC<PropType> = ({
  list,
  loading,
  activeArticleId,
  dispatch,
  userDetail,
}) => {
  // const [comments, setComments] = useState(data);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [val, setVal] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    if (!val) {
      return;
    }

    setSubmitting(true);

    dispatch({
      type: 'home/createComment',
      payload: { comment: val, articleId: activeArticleId },
      callback: () => {
        setSubmitting(false);
        setVal('');
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setVal(e.target.value);
  };

  return (
    <div className={styles.commentBox}>
      {12 && (
        <CommentComp
          comments={list}
          loading={loading}
          userDetail={userDetail}
        />
      )}

      <Comment
        content={
          <Editor
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleChange(e)
            }
            onSubmit={handleSubmit}
            submitting={submitting}
            value={val}
          />
        }
      />
    </div>
  );
};

export default connect(
  ({
    home,
    loading,
  }: {
    home: StateType;
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    activeArticleId: home.activeArticleId,
    loading: loading.effects['home/featchComment'], // 使用dva-loading 监听异步请求
  }),
)(CommentList);
