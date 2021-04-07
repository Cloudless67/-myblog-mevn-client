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
    replies: object[];
};

export default Post;
