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
    replies: object[];
};

export type Reply = {
    _id: string;
    writtenTime: string;
    nickname: string;
    body: string;
    replies: Reply[];
};
