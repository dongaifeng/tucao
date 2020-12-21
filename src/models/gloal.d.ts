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
  userid?: string;
  unreadCount?: number;
  province?: String | undefined;
  city?: String | undefined;
  introduce?: String | undefined;
  tags?: String | undefined;
}
