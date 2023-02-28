// Для работы с API создайте класс Api.
// Все запросы должны быть методами этого класса.
export class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Err: ${res.status}`);
    }
  
    // Загрузка информации о пользователе с сервера
    async getCurrentUserInfo() {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      });
      return this._handleResponse(res);
    }
  
    // Загрузка карточек с сервера
    async getInitialCards() {
      const res = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      });
      return this._handleResponse(res);
    }
  
    // Редактирование профиля
    async editUserInfo(data) {
      const res = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      });
      return this._handleResponse(res);
    }
  
    // Добавление новой карточки
    async addCard(data) {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      });
      return this._handleResponse(res);
    }
  
    // Удаление карточки с сервера
    async deleteCard(cardId) {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
      return this._handleResponse(res);
    }
  
    // Постановка и снятие лайка
    async addLike(cardId) {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
      return this._handleResponse(res);
    }
  
    async removeLike(cardId) {
      const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
      return this._handleResponse(res);
    }
  
    // Обновление аватара пользователя:
    async updateUserAvatar(data) {
      const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      });
      return this._handleResponse(res);
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