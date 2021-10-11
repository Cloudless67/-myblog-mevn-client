import { Reply } from './reply';

type Post = {
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

type PostPreview = {
    _id: string;
    writtenTime: string;
    views: number;
    repliesNum: number;
    title: string;
    url: string;
    preview: string;
};
type PostPostData = {
    category: string;
    title: string;
    url: string;
    body: string;
    tags: string;
};

type PutPostData = {
    category: string;
    body: string;
    tags: string;
};

export { Post, PostPreview, PostPostData, PutPostData };
