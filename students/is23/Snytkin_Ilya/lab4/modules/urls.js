// modules/urls.js
import { accessToken, version } from "./consts.js";

export class Urls {
  constructor() {
    this.baseUrl = 'https://api.vk.com/method';
    this.common = `access_token=${accessToken}&v=${version}`;
  }

  getGroupMembers(groupId, filter = 'managers') {
    // Запрашиваем role — чтобы различать владельца и админов
    return `${this.baseUrl}/groups.getMembers?group_id=${groupId}&fields=role&filter=${filter}&${this.common}`;
  }

  getUserInfo(userId) {
    return `${this.baseUrl}/users.get?user_ids=${userId}&fields=photo_400,city,mobile_phone,sex,last_seen&${this.common}`;
  }
}

export const urls = new Urls();