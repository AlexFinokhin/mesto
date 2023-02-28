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
    if (data.name) this._profileName.textContent = data.name;
    if (data.about) this._profileJob.textContent = data.about;
    if (data.avatar) this._avatar.src = data.avatar;
  }

// ПЕРЕДЕЛАТЬ ПОТОМ КАК У СВЯТА

/*
  setUserInfo({name, job}) {
    if(name) {
      this._profileName.textContent = name;
    }
    if(job) {
      this._profileJob.textContent = job;
    }
  }
*/

  /* setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
    if (data.name) this._name.textContent = data.name;
    if (data.job) this._about.textContent = data.job;
  }
  */
}
