import { Post, PostPostData, PutPostData } from '@/types/post';
import Category from '@/types/category';

const bearerToken = () => `Bearer ${localStorage.getItem('token')}`;

function postCategory(category: string) {
    return fetch('/api/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken(),
        },
        body: JSON.stringify({ name: category }),
    });
}

function putCategory(category: string, parent?: string) {
    return fetch(`/api/category/${category}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken(),
        },
        body: JSON.stringify({ parent }),
    }).then<Category[]>((res) => res.json());
}

function forceDeleteReply(postUrl: string, replyID: string) {
    return fetch(`/api/post/${postUrl}/reply/${replyID}`, {
        method: 'DELETE',
        headers: { Authorization: bearerToken() },
    });
}

function deleteReply(postUrl: string, replyID: string, password: string) {
    return fetch(`/api/post/${postUrl}/reply/${replyID}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
}

function postLoginData(id: string, password: string) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
    }).then<{ token: string }>((res) => res.json());
}

function getPost(url: string) {
    return fetch(`/api/post/${url}`, {
        headers: { Authorization: bearerToken() },
    }).then<Post>((res) => res.json());
}

function postPost(body: PostPostData) {
    return fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
    }).then<{ url: string }>((res) => res.json());
}

function putPost(url: string, body: PutPostData) {
    return fetch(`/api/post/${url}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken(),
        },
        body: JSON.stringify(body),
    }).then<{ url: string }>((res) => res.json());
}

function deletePost(url: string) {
    return fetch(`/api/post/${url}`, {
        method: 'DELETE',
        headers: { Authorization: bearerToken() },
    });
}

export {
    postCategory,
    putCategory,
    forceDeleteReply,
    deleteReply,
    postLoginData,
    getPost,
    postPost,
    putPost,
    deletePost,
};
