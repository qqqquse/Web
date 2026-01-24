
export const groupId = 123456; 

export const accessToken = ''; 

export const version = '5.131';

export const useMockData = !accessToken || accessToken.trim() === '';

console.log(`🔧 Режим работы: ${useMockData ? 'ТЕСТОВЫЕ ДАННЫЕ' : 'РЕАЛЬНЫЙ VK API'}`);