class Urls {
    constructor() {
        this.api = 'http://localhost:8000';
    }

    getUserInfo(userId) {
        return `${this.api}/users.get/${userId}`;
    }

    getGroupMembers(filter = '') {
        const filterPart = filter ? `?filter=${filter}` : '';
        return `${this.api}/groups.getMembers${filterPart}`;
    }
}

export const urls = new Urls();