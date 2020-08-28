export default class Api {
  constructor(group, id, serverUrl) {
    this.group = group;
    this.id = id;
    this.serverUrl = serverUrl;
  }

  apiRespond = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
  };

  getUser() {
    /* Можно лучше: адрес сервера https://praktikum.tk так же передавать как параметр конструктора */
    return fetch(`${this.serverUrl}/${this.group}/users/me`, {
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  }

  studentsCards() {
    return fetch(`${this.serverUrl}/cohort12/cards`, {
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  }

  profile = (profileName, profileAbout) => {
    return fetch(`${this.serverUrl}/${this.group}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: profileName,
        about: profileAbout,
      }),
    }).then((res) => this.apiRespond(res));
  };

  cardSubmit = (description, image) => {
    return fetch(`${this.serverUrl}/${this.group}/cards`, {
      method: "POST",
      headers: {
        authorization: this.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: description,
        link: image,
      }),
    }).then((res) => this.apiRespond(res));
  };

  cardDelete = (cardId) => {
    return fetch(`${this.serverUrl}/${this.group}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  };

  likeSubmit = (cardId) => {
    return fetch(`${this.serverUrl}/${this.group}/cards/like/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  };

  likeDeleteSubmit = (cardId) => {
    return fetch(`${this.serverUrl}/${this.group}/cards/like/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.id,
      },
    }).then((res) => this.apiRespond(res));
  };

  avatarSubmit = (avatar) => {
    return fetch(`${this.serverUrl}/${this.group}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this.apiRespond(res));
  };
}
