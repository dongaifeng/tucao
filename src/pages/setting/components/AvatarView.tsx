import React, { useState } from 'react';
import { Upload, Button, Avatar } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import styles from '../index.less';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import { uploadFile } from '@/service/user';

function getBase64(
  img: File,
  callback: (imageUrl: string | ArrayBuffer | null) => void,
) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener('load', () => callback(reader.result));
}

const AvatarView = ({ avatar }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>(null);
  const [file, setFileList] = useState<string | Blob>('');

  const handleUpload = () => {
    const formData = new FormData();
    debugger;

    formData.append('sss', '333');
    formData.append('file', file);
    formData.append('aaa', 'aaaa');

    uploadFile(formData);

    // You can use any AJAX library you like
    // reqwest({
    //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  };

  const onChange = ({ file }: any) => {
    console.log('change', file);

    if (file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (file.status === 'done') {
      setFileList(file);
      handleUpload();
      getBase64(file.originFileObj, (imageUrl: string | ArrayBuffer | null) => {
        setLoading(false);
        setImgUrl(imageUrl);
      });
    }
  };

  const onPreview = async file => {
    console.log('onPreview', file);
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div className={styles.avatarBox}>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <Avatar src={imgUrl || avatar} size={64} icon={<UserOutlined />} />
      )}

      <div style={{ marginTop: '20px' }}>
        <ImgCrop
          grid
          rotate
          shape="round"
          modalTitle="编辑头像"
          modalOk="保存头像"
          modalCancel="取消"
        >
          <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            showUploadList={false}
            onChange={onChange}
            onPreview={onPreview}
          >
            <Button type="primary" ghost icon={<UploadOutlined />}>
              上传头像
            </Button>
          </Upload>
        </ImgCrop>
      </div>
    </div>
  );
};

export default AvatarView;
