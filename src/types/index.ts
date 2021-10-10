export type Post = {
    tags: string[];
    writtenTime: string;
    views: number;
    repliesNum: number;
    title: string;
    url: string;
    category: string;
    body: string;
    formattedBody: string;
    replies: Reply[];
};

export type PostPreview = {
    writtenTime: string;
    views: number;
    repliesNum: number;
    title: string;
    url: string;
    preview: string;
};

export type Reply = {
    _id: string;
    writtenTime: string;
    nickname: string;
    body: string;
    replies: Reply[];
};

export type postPostData = {
    category: string;
    title: string;
    url: string;
    body: string;
    tags: string;
};

export type putPostData = {
    category: string;
    body: string;
    tags: string;
};
