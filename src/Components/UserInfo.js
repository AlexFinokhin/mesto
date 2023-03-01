export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
      avatar: this._avatar.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name || this._profileName.textContent;
    this._profileJob.textContent = data.about || this._profileJob.textContent;
    this._avatar.src = data.avatar || this._avatar.src;
  }
  
}
