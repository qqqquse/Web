import { ACCESS_TOKEN, API_VERSION, GROUP_ID } from './consts.js';
class Urls {
    constructor() {
        this.baseUrl = 'https://api.vk.com/method';
        this.commonParams = `access_token=${ACCESS_TOKEN}&v=${API_VERSION}`;
    }
    getGroupMembers(sort) {
        let url = `${this.baseUrl}/groups.getMembers?group_id=${GROUP_ID}&fields=photo_200,photo_400_orig,photo_max_orig&${this.commonParams}`;
        if (sort) {
            url += `&sort=${sort}`;
        }
        return url;
    }
    getUserInfo(userId) {
        return `${this.baseUrl}/users.get?user_ids=${userId}&fields=photo_200,photo_400_orig,photo_max_orig,city,online&${this.commonParams}`;
    }
}
export const urls = new Urls();
