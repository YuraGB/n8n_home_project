export type TPostData = {postUrl:string, postId: number, lastVisited: string}
export type TChapterData = {
  title: string;
  date: string;
  postId: number;
  lastVisited: string;
};
export type TGetLatestResourceDataParams =   {
    url: string, 
    chapterClassName: string, 
    titleClassName: string,
    dateClassName: string,
    tabSelector?: string,
    postId: number,
    lastVisited: string
  }