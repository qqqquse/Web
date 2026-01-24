
import { accessToken, version, useMockData } from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method';
        this.commonInfo = `access_token=${accessToken}&v=${version}`;
    }

    getUserInfo(userId) {
        if (useMockData) {
            console.log('📱 Запрос URL для пользователя (mock режим)');
            return null; // В mock режиме URL не используется
        }
        
        // ВСЕ возможные поля с фото
        const fields = [
            'photo_400_orig',
            'photo_max_orig',
            'photo_200',
            'photo_100', 
            'photo_max',
            'photo_50',
            'city',
            'bdate',
            'online',
            'domain',
            'sex',
            'screen_name'
        ].join(',');
        
        return `${this.url}/users.get?user_ids=${userId}&fields=${fields}&${this.commonInfo}`;
    }

    getGroupMembers(groupId, sort = 'id_asc') {
        if (useMockData) {
            console.log('📱 Запрос URL для группы (mock режим)');
            return null; // В mock режиме URL не используется
        }
        
        // Те же поля для главной страницы
        const fields = [
            'photo_400_orig',
            'photo_200',
            'photo_100'
        ].join(',');
        
        return `${this.url}/groups.getMembers?group_id=${groupId}&sort=${sort}&fields=${fields}&${this.commonInfo}`;
    }
}

export const urls = new Urls();