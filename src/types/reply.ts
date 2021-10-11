export type Reply = {
    _id: string;
    writtenTime: string;
    nickname: string;
    body: string;
    replies: Reply[];
};
