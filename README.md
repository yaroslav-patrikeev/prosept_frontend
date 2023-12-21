# Система разметки товаров 🪩

Проектное участие в кросс-функциональном хакатоне по разработке ML-продукта и интерфейса модели сопоставления товаров ООО “Просепт”

Цель проекта: создание онлайн-сервиса автоматизации процесса сопоставления товаров.

## Результаты

- Создал проект, используя Vite
- Подготовил дизайн интерфейса приложения
- Сверстал дизайн при помощи модульных стилей и SCSS, разделил интерфейс на layout (header, footer), screens (Главная, Результаты, Статистика) и ui (кнопки, прелоадеры, модальные окна и т. д.)
- Подключил API, используя axios. Все запросы к api делаются в компоненте Home и хранятся в стейт-переменных, которые передаются другим компонентам.
- Помимо технического задания: реализовал блокирование всех кнопок при отправке запроса на сервер, логику исправления ошибок из Результатов или возврат к предыдущей позиции стрелочками, добавил модальное окно для отображения ошибок, предусмотрел отдельные прелоадеры для компонентов, выбор даты в модальном окне с результатами сохраняется на время работы в окне браузера.
- Провел демо для команды
- Пушил изменения в докер

Проект занял 2-е место среди 15-ти команд.

<img src="https://github.com/yaroslav-patrikeev/prosept_frontend/blob/main/diploma.png" style="width: 500px">

## Демонстрация

- Основной интерфейс сервиса
![Основной интерфейс сервиса](https://github.com/yaroslav-patrikeev/prosept_frontend/blob/main/Main.PNG)

- Модальное окно с результатами
![Модальное окно с результатами](https://github.com/yaroslav-patrikeev/prosept_frontend/blob/main/Results.PNG)

- Модальное окно со статистикой
![Модальное окно со статистикой](https://github.com/yaroslav-patrikeev/prosept_frontend/blob/main/Statistic.PNG)
  
## Инструкция по сборке и запуску

- Клонировать репозиторий и перейти в него

```sh
git clone git@github.com:yaroslav-patrikeev/prosept_frontend.git
cd prosept_frontend
```

- Установить зависимости

```sh
npm ci
```

### Для запуска в прод-режиме

- Создать оптимизированную сборку в папке dist

```sh
npm run build
```

- Запустить приложение из папки dist

```sh
npm run start
```

### Для запуска в дев-режиме

- Запустить приложение в дев-режиме

```sh
npm run dev
```

## Стэк технологий

- HTML, CSS, TypeScript, React
- Препроцессор SCSS, модульные стили
- Сборщик Vite

## Ссылки

- [React](https://react.dev/)
- [Vite](https://vite-docs-ru.vercel.app/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Select](https://react-select.com/)
- [React Date Picker](https://reactdatepicker.com/)
- [Axios](https://axios-http.com/ru/docs/intro)
- [SCSS](https://www.npmjs.com/package/scss)
- [Normalize.css](https://necolas.github.io/normalize.css/)
- [Lato font](https://fonts.google.com/specimen/Lato)

- [Ссылка на репозиторий бэкенда](https://github.com/Anastasia7Si/project_backend)
- [Ссылка на репозиторий датасаенс](https://github.com/BAR2LEHI/prosept_competition_2023)
