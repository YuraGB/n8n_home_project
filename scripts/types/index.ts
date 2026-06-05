export type TPostData = {
  postUrl: string;
  postId: number;
  lastVisited: string | null;
};

export type TChapterData = {
  title: string;
  date: string;
  postId: number;
  lastVisited: string | null;
};

export type TGetLatestResourceDataParams = {
  url: string;
  chapterClassName: string;
  titleClassName: string;
  dateClassName: string;
  tabSelector?: string;
  postId: number;
  lastVisited: string | null;
};

export type ApiPost = {
  url?: unknown;
  id?: unknown;
  lastVisited?: unknown;
};
