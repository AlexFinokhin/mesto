// Для работы с API создайте класс Api.
// Все запросы должны быть методами этого класса.
export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _fetch(path, options = {}) {
    const res = await fetch(`${this._baseUrl}${path}`, {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }

  // Загрузка информации о пользователе с сервера
  getCurrentUserInfo() {
    return this._fetch('/users/me');
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return this._fetch('/cards');
  }

  // Редактирование профиля
  editUserInfo(data) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  // Добавление новой карточки
  addCard(data) {
    return this._fetch('/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Удаление карточки с сервера
  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  // Постановка и снятие лайка
  addLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: 'PUT',
    });
  }

  removeLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: 'DELETE',
    });
  }

  // Обновление аватара пользователя:
  updateUserAvatar(data) {
    return this._fetch('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}
  
  /*
  // Для работы с API создайте класс Api.
// Все запросы должны быть методами этого класса.
export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _fetch(path, options = {}) {
    const res = await fetch(`${this._baseUrl}${path}`, {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    return res.json();
  }

  // Загрузка информации о пользователе с сервера
  getCurrentUserInfo() {
    return this._fetch('/users/me');
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return this._fetch('/cards');
  }

  // Редактирование профиля
  editUserInfo(data) {
    return this._fetch('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  // Добавление новой карточки
  addCard(data) {
    return this._fetch('/cards', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Удаление карточки с сервера
  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  // Постановка и снятие лайка
  addLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: 'PUT',
    });
  }

  removeLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: 'DELETE',
    });
  }

  // Обновление аватара пользователя:
  updateUserAvatar(data) {
    return this._fetch('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}
*/