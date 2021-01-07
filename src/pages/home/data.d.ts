export interface ListItemDataType {
  id: number;
  owner: number;
  title: string;
  avatar: string;
  ownerName: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: string;
  createdAt: string;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number[];
  likes: number;
  comments: number;
  content: string;
  members: Member[];
}

// export interface User {
//   name: string;
//   avatar: string;
//   userid: string;
//   notice: NoticeType[];
//   email: string;
//   introduce: string;
//   title: string;
//   group: string;
//   tags: TagType[];
//   notifyCount: number;
//   unreadCount: number;
//   country: string;
//   geographic: GeographicType;
//   address: string;
//   phone: string;
// }

export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface TagType {
  key: string;
  label: string;
}

export interface GeographicType {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
}

export interface NoticeType {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface CommentType {
  commentId: string | number;
  author: string;
  avatar: string;
  content: string;
  updateTime: string;
  userId: string | number;
}
