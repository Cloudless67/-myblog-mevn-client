import { Reply } from './reply';

type Post = {
    tags: string[];
    writtenTime: string;
    views: number;
    repliesNum: number;
    category: string;
    title: string;
    url: string;
    thumbnail?: string;
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
    thumbnail?: string;
    preview: string;
};

type PostPostData = {
    category: string;
    title: string;
    url: string;
    thumbnail?: string;
    body: string;
    tags: string;
};

type PutPostData = Omit<PostPostData, 'url'>;

export { Post, PostPreview, PostPostData, PutPostData };
