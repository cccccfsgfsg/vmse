Будут дополнения к проекту (в процессе)
Этот проект демонстрирует создание RESTful API для управления заметками с использованием Node.js, Express и MongoDB.

Структура проекта
```
note-app/
│
├── app.js             # Главный файл сервера Express
├── models/
│   └── note.js        # Mongoose-схема и модель заметки
├── routes/
│   └── notes.js       # Все API-маршруты (GET, POST, DELETE)
└── public/
    ├── index.html     # HTML-интерфейс
    ├── style.css      # Минимальные стили
    └── app.js         # Логика клиента (запросы к API)
```

 1. `app.js`

Этот файл является основным файлом приложения. Он настраивает сервер, подключается к MongoDB и определяет маршруты.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/notes');

const app = express();
const port = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost/note-app');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Подключено к базе данных'));

app.use(bodyParser.json());
app.use('/notes', noteRoutes);

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
```

 Объяснение:

- Импорт модулей Импортируются необходимые модули, такие как `express`, `body-parser`, `mongoose` и маршруты для заметок.
- Подключение к MongoDB: Используется `mongoose.connect` для подключения к базе данных MongoDB.
- Обработка событий подключения**: Обработка ошибок подключения и сообщение об успешном подключении.
- Настройка Express: Используется `body-parser` для обработки JSON-данных в запросах.
- Маршруты: Подключаются маршруты для заметок.
- Запуск сервера: Сервер запускается на порту 3000.

 2. `models/note.js`

Этот файл определяет схему и модель для заметок, которые будут храниться в MongoDB.

```javascript
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
```

Объяснение:

- Схема: Определяется схема для заметок с полями `title`, `content` и `createdAt`.
- Модель: Создается модель `Note` на основе схемы, которая используется для взаимодействия с коллекцией в MongoDB.

3. `routes/notes.js`

Этот файл определяет маршруты для работы с заметками, такие как получение, создание и удаление заметок.

```javascript
const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// Получение всех заметок
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Создание новой заметки
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


});

module.exports = router;
```
 `public/index.html`

Интерфейс с формой для создания заметки и списком существующих заметок.

---

`public/appp.js`

Клиентская логика:
- Отправка POST-запроса при добавлении заметки
- Загрузка списка заметок с сервера
- Удаление заметок

---

`public/style.css`

Базовая стилизация интерфейса (центровка, отступы, кнопки).
Объяснение:

API-маршруты

| Метод | Путь          | Описание                    |
|-------|---------------|-----------------------------|
| GET   | `/notes`      | Получить все заметки        |
| POST  | `/notes`      | Создать новую               |
| DELETE| `/notes/:id`  | Удалить по ID               |

