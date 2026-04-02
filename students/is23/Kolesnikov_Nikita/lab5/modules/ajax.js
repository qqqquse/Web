class Ajax {
    async get(url, callback) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();
            callback(data);
        } catch (error) {
            console.error('API error:', error);
        }
    }
}

export const ajax = new Ajax();