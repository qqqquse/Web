class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API error:', error);
            return null;
        }
    }
}

export const ajax = new Ajax();