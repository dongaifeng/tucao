export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  // tags?: {
  //   key: string;
  //   label: string;
  // }[];
  user_id?: number;
  fansCount?: number;
  followCount?: number;
  articleCount?: number;
  followStatus?: boolean;
  email: string;
  phone: string;
  country: string;
  address: string;
  province: String | undefined;
  city: String | undefined;
  introduce?: String | undefined;
  tags?: String | undefined;
}

export interface ArticleType {
  id: number;
  owner: number;
  title: string;
  avatar: string;
  owner_name: string;
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
