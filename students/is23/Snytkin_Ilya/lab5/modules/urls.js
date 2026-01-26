// modules/urls.js
import { accessToken, version } from "./consts.js";

export const urls = {
 getGroupMembers: (groupId, filter = 'managers') => {
  // fields=role ТОЛЬКО для managers
  const fields = filter === 'managers' ? 'role' : '';
  let url = `https://api.vk.com/method/groups.getMembers?group_id=${groupId}&access_token=${accessToken}&v=${version}`;
  if (fields) url += `&fields=${fields}`;
  if (filter) url += `&filter=${filter}`;
  return url; // без прокси
    },

  getUserInfo: (userId) => {
    return `https://api.vk.com/method/users.get?user_ids=${userId}&fields=photo_400,city,mobile_phone,sex,last_seen&access_token=${accessToken}&v=${version}`;
    // ← прямой запрос
  }
};