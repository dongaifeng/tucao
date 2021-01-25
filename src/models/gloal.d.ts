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
  province?: String | undefined;
  city?: String | undefined;
  introduce?: String | undefined;
  tags?: String | undefined;
}
