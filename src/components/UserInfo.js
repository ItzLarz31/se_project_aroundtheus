export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      description: this._job.textContent,
    };
    return this._userData;
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._job.textContent = description;
  }

  setAvatarImage({ avatar }) {
    this._profileAvatar.src = avatar;
  }
}
