export class FetchAPI {
    constructor() {
        this.defaultErrorHandler = (error) => {
            console.error('Ошибка выполнения запроса:', error);
        };
    }
    async post(url, callback, onError) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд
            const response = await window.fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            if (data && data.error) {
                const vkError = data.error;
                throw new Error(`VK API Error [${vkError.error_code}]: ${vkError.error_msg}`);
            }
            callback(data);
        }
        catch (error) {
            const errorHandler = onError || this.defaultErrorHandler;
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    errorHandler(new Error('Запрос превысил время ожидания (10 секунд)'));
                }
                else {
                    errorHandler(error);
                }
            }
            else {
                errorHandler(new Error('Неизвестная ошибка'));
            }
        }
    }
}
export const fetch = new FetchAPI();
