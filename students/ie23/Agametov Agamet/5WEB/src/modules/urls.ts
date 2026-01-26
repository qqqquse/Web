import { ACCESS_TOKEN, API_VERSION, GROUP_ID } from './consts.js';

class Urls {
  private baseUrl = 'https://api.vk.com/method';
  private commonParams = `access_token=${ACCESS_TOKEN}&v=${API_VERSION}`;

  getGroupMembers(sort?: string): string {
    let url = `${this.baseUrl}/groups.getMembers?group_id=${GROUP_ID}&fields=photo_200,photo_400_orig,photo_max_orig&${this.commonParams}`;
    if (sort) {
      url += `&sort=${sort}`;
    }
    return url;
  }

  getUserInfo(userId: number | string): string {
    return `${this.baseUrl}/users.get?user_ids=${userId}&fields=photo_200,photo_400_orig,photo_max_orig,city,online&${this.commonParams}`;
  }
}


export const urls = new Urls();