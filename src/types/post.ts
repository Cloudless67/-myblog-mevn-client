import { Reply } from './reply';

type Thumbnail = {
    url: string;
    aspectRatio: number;
};

type Post = {
    tags: string[];
    writtenTime: string;
    views: number;
    repliesNum: number;
    category: string;
    title: string;
    url: string;
    thumbnail?: Thumbnail;
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
    thumbnail?: Thumbnail;
    preview: string;
};

type PostPostData = {
    category: string;
    title: string;
    url: string;
    thumbnail?: Thumbnail;
    body: string;
    tags: string;
};

type PutPostData = Omit<PostPostData, 'url'>;

export type { Post, PostPreview, PostPostData, PutPostData };
