import React, { useState } from 'react';
import { Upload, Button, Avatar, message } from 'antd';
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
import { uploadFile, uploadBuffer } from '@/service/user';
import sparkND5 from 'spark-md5'; // 自动生成文件MD5码
const CHUNK_SIZE = 0.5 * 1024 * 1024;

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

  // arrayBuffer 方式上传
  // 用umi-request 不成功 传到后台 二进制文件可能被修改了
  // 故用xhr 成功 后台通过 ctx.req.readableBuffer.head.data; 接受arrayBuffer
  const bufferUpload = (file: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file.originFileObj);
    reader.onload = function(e) {
      const res = e.target?.result;
      console.log('将文件读成 arrayBuffer', res);

      // uploadBuffer({arrayBuf: res})

      const xhr: any = new XMLHttpRequest();
      xhr.open('POST', '/api/uploadBuffer');
      xhr.overrideMimeType('application/octet-stream');
      if (xhr.sendAsBinary) {
        xhr.sendAsBinary(res);
      } else {
        xhr.send(res);
      }
    };
  };

  const hashIdle = (chunks: any[]) => {
    return new Promise((resolve, reject) => {
      const spark = new sparkND5.ArrayBuffer();
      let count = 0;

      // 用 FileReader 的 readAsArrayBuffer 方法 把文件读取成ArrayBuffer 并且 存到spark中
      const appendToSpark = (file: File) => {
        return new Promise(resolve => {
          const render = new FileReader();
          render.readAsArrayBuffer(file);
          render.onload = e => {
            spark.append(e.target?.result);
            resolve(e.target?.result);
          };
        });
      };

      // 空余时间回调
      const cb = async (deadline: any) => {
        // 当有空闲时间 并且 有任务
        while (count < chunks.length && deadline.timeRemaining() > 1) {
          // 从 chunks 中 拿出一个 加到 spark里 然后 再下一个
          await appendToSpark(chunks[count].file);

          count++;

          if (count < chunks.length) {
            // this.hashProgress1 = Number(((count / chunks.length) * 100).toFixed(2))
          } else {
            // this.hashProgress1 = 100
            resolve(spark.end());
          }
        }

        // 如果没有空余时间 就放到下一帧 执行
        window.requestIdleCallback(cb);
      };

      // 启动 空余时间
      window.requestIdleCallback(cb);
    });
  };

  const createChunk = (file: File, size = CHUNK_SIZE) => {
    const chunks = [];
    let cur = 0;

    while (cur < file.size) {
      chunks.push({
        index: cur,
        file: file.slice(cur, cur + size),
      });

      cur += size;
    }

    return chunks;
  };

  // formData中插入 ArrayBuffer 用umi-request 传到后台也是 数据产生错误
  const handleUpload = async (file: any) => {
    // 把文件 切片 放到数组里
    const chunks = createChunk(file.originFileObj);

    // 使用时间切片方式 计算出文件的hash名字 （唯一）
    const hashname = (await hashIdle(chunks)) as string;
    // console.log('hash1--------->', hashname)

    const formData = new FormData();
    formData.append('filename', file.name);
    formData.append('hashname', hashname);
    formData.append('file', file.originFileObj);
    return await uploadFile(formData);
  };

  const onChange = ({ file }: any) => {
    // console.log('change', file);

    if (file.status === 'uploading') {
      setLoading(true);
      return;
    }

    // umi-request 上传文件 file会被格式化成字符串，故选择二进制方式上传，或者使用组件自带方式
    // 经过调式 发现 组件Upload 的file对象是它自己包装的对象 真实文件对象是 file.originFileObj
    if (file.status === 'done') {
      setFileList(file);
      handleUpload(file).then(res => {
        if (res.code === 'success') {
          message.success('修改头像成功！');
          getBase64(
            file.originFileObj,
            (imageUrl: string | ArrayBuffer | null) => {
              setLoading(false);
              setImgUrl(imageUrl);
            },
          );
        }
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
            // action="/api/uploadFile"
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
