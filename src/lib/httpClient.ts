const bearerToken = `Bearer ${localStorage.getItem('token')}`;

export async function postCategory(category: string) {
    return await fetch('/api/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken,
        },
        body: JSON.stringify({ name: category }),
    });
}

export async function putCategory(category: string, parent?: string) {
    return await fetch(`/api/category/${category}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: bearerToken,
        },
        body: JSON.stringify({ parent }),
    }).then(res => res.json());
}
