
export const mockData = {
    // Тестовые пользователи для группы
    groupMembers: {
        count: 5,
        items: [
            {
                id: 1,
                first_name: "Иван",
                last_name: "Иванов",
                photo_400_orig: "https://via.placeholder.com/400x400/3B5998/FFFFFF?text=Ivan+Ivanov",
                photo_200: "https://via.placeholder.com/200x200/3B5998/FFFFFF?text=Ivan+Ivanov",
                photo_100: "https://via.placeholder.com/100x100/3B5998/FFFFFF?text=Ivan+Ivanov",
                online: 1
            },
            {
                id: 2,
                first_name: "Мария",
                last_name: "Петрова",
                photo_400_orig: "https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Maria+Petrova",
                photo_200: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Maria+Petrova",
                photo_100: "https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=Maria+Petrova",
                online: 0
            },
            {
                id: 3,
                first_name: "Алексей",
                last_name: "Сидоров",
                photo_400_orig: "https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=Alex+Sidorov",
                photo_200: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=Alex+Sidorov",
                photo_100: "https://via.placeholder.com/100x100/4ECDC4/FFFFFF?text=Alex+Sidorov",
                online: 1
            },
            {
                id: 4,
                first_name: "Елена",
                last_name: "Кузнецова",
                photo_400_orig: "https://via.placeholder.com/400x400/45B7D1/FFFFFF?text=Elena+Kuznetsova",
                photo_200: "https://via.placeholder.com/200x200/45B7D1/FFFFFF?text=Elena+Kuznetsova",
                photo_100: "https://via.placeholder.com/100x100/45B7D1/FFFFFF?text=Elena+Kuznetsova",
                online: 1
            },
            {
                id: 5,
                first_name: "Дмитрий",
                last_name: "Смирнов",
                photo_400_orig: "https://via.placeholder.com/400x400/96CEB4/FFFFFF?text=Dmitry+Smirnov",
                photo_200: "https://via.placeholder.com/200x200/96CEB4/FFFFFF?text=Dmitry+Smirnov",
                photo_100: "https://via.placeholder.com/100x100/96CEB4/FFFFFF?text=Dmitry+Smirnov",
                online: 0
            }
        ]
    },

    // Подробная информация о пользователях
    userDetails: {
        1: {
            id: 1,
            first_name: "Иван",
            last_name: "Иванов",
            photo_400_orig: "https://via.placeholder.com/400x400/3B5998/FFFFFF?text=Ivan+Ivanov",
            photo_max_orig: "https://via.placeholder.com/400x400/3B5998/FFFFFF?text=Ivan+Ivanov",
            photo_200: "https://via.placeholder.com/200x200/3B5998/FFFFFF?text=Ivan+Ivanov",
            city: { id: 1, title: "Москва" },
            bdate: "15.05.1990",
            online: 1,
            sex: 2
        },
        2: {
            id: 2,
            first_name: "Мария",
            last_name: "Петрова",
            photo_400_orig: "https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Maria+Petrova",
            photo_max_orig: "https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=Maria+Petrova",
            photo_200: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Maria+Petrova",
            city: { id: 2, title: "Санкт-Петербург" },
            bdate: "22.08.1985",
            online: 0,
            sex: 1
        },
        3: {
            id: 3,
            first_name: "Алексей",
            last_name: "Сидоров",
            photo_400_orig: "https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=Alex+Sidorov",
            photo_max_orig: "https://via.placeholder.com/400x400/4ECDC4/FFFFFF?text=Alex+Sidorov",
            photo_200: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=Alex+Sidorov",
            city: { id: 3, title: "Новосибирск" },
            bdate: "10.12.1992",
            online: 1,
            sex: 2
        },
        4: {
            id: 4,
            first_name: "Елена",
            last_name: "Кузнецова",
            photo_400_orig: "https://via.placeholder.com/400x400/45B7D1/FFFFFF?text=Elena+Kuznetsova",
            photo_max_orig: "https://via.placeholder.com/400x400/45B7D1/FFFFFF?text=Elena+Kuznetsova",
            photo_200: "https://via.placeholder.com/200x200/45B7D1/FFFFFF?text=Elena+Kuznetsova",
            city: { id: 1, title: "Москва" },
            bdate: "03.03.1988",
            online: 1,
            sex: 1
        },
        5: {
            id: 5,
            first_name: "Дмитрий",
            last_name: "Смирнов",
            photo_400_orig: "https://via.placeholder.com/400x400/96CEB4/FFFFFF?text=Dmitry+Smirnov",
            photo_max_orig: "https://via.placeholder.com/400x400/96CEB4/FFFFFF?text=Dmitry+Smirnov",
            photo_200: "https://via.placeholder.com/200x200/96CEB4/FFFFFF?text=Dmitry+Smirnov",
            city: { id: 4, title: "Екатеринбург" },
            bdate: "18.11.1995",
            online: 0,
            sex: 2
        }
    },

    // Метод для имитации сортировки
    sortMembers(items, sortType) {
        const sorted = [...items];
        
        switch(sortType) {
            case 'id_asc':
                return sorted.sort((a, b) => a.id - b.id);
            case 'id_desc':
                return sorted.sort((a, b) => b.id - a.id);
            case 'time_asc':
                // имитируем сортировку по времени вступления
                return sorted.sort((a, b) => a.id - b.id);
            case 'time_desc':
                return sorted.sort((a, b) => b.id - a.id);
            default:
                return sorted;
        }
    }
};