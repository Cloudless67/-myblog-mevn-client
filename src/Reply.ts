type Reply = {
    _id: string;
    writtenTime: string;
    nickname: string;
    body: string;
    password: string;
    replies: Reply[];
};

export default Reply;
