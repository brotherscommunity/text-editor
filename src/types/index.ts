export enum BlogType {
  Blog,
  VBlog,
}

export interface BlogData {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  blogType?: BlogType;
  tags: string[];
  references: { link: string; index: number; count: number }[];
  image?: string;
  videoLink?: string;
  author: {
    id: string;
    nickName: string;
    image: string | null;
    userName: string;
  };
  _count: {
    BlogReaction: number;
    Comments: number;
  };
}
