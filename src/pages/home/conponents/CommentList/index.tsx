import React, { FC, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { Comment, message, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import {} from '@ant-design/icons';
import nouser from '@/assets/nouser.png';
import styles from './index.less';
import { StateType } from '../../model';
import { createComment } from '../../service';

moment.locale('zh-cn');
const { TextArea } = Input;

const CommentComp = ({
  comments,
  loading,
}: {
  comments: StateType['comments'];
  loading: boolean;
}) => (
  <List
    dataSource={comments}
    loading={loading}
    locale={{ emptyText: '暂无评论' }}
    itemLayout="horizontal"
    renderItem={item => (
      <Comment
        avatar={item.avatar || nouser}
        content={item.content}
        author={item.author || 'TA不想有名字'}
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
  _comments: StateType['comments'];
  activeArticleId: StateType['activeArticleId'];
  loading: boolean;
  dispatch: Dispatch;
}

const CommentList: FC<PropType> = ({
  _comments,
  loading,
  activeArticleId,
  dispatch,
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
      {12 && <CommentComp comments={_comments} loading={loading} />}

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
    _comments: home.comments,
    activeArticleId: home.activeArticleId,
    loading: loading.effects['home/featchComment'], // 使用dva-loading 监听异步请求
  }),
)(CommentList);
