import express from 'express';
import cors from 'cors';
import { accessToken, version, groupId } from './modules/consts.js';

const app = express();

app.use(cors());
app.use(express.json());

async function vkRequest(method, params = {}) {
    const url = new URL(`https://api.vk.com/method/${method}`);
    url.searchParams.set('access_token', accessToken);
    url.searchParams.set('v', version);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, value);
        }
    });

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.error) {
        const err = new Error(data.error.error_msg || 'VK API error');
        err.vkError = data.error;
        throw err;
    }

    return data;
}

app.get('/groups.getMembers', async (req, res) => {
    try {
        const filter = req.query.filter || '';

        const data = await vkRequest('groups.getMembers', {
            group_id: groupId,
            fields: 'photo_400_orig',
            filter: filter || undefined,
        });

        res.json({
            response: {
                count: data.response.count,
                items: data.response.items,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Error',
            message: error.message,
            vkError: error.vkError || null,
        });
    }
});

app.get('/users.get/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id, 10);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'id must be number',
            });
        }

        const data = await vkRequest('users.get', {
            user_ids: id,
            fields: 'photo_400_orig',
        });

        const user = data.response?.[0];

        if (!user) {
            return res.status(404).json({
                status: 'Not Found',
                message: `not found user with id ${id}`,
            });
        }

        res.json({
            response: [user],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'Error',
            message: error.message,
            vkError: error.vkError || null,
        });
    }
});

app.listen(8000, () => {
    console.log('Server started on http://localhost:8000');
});