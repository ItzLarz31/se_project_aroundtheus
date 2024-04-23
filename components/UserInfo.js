export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._name.textContent,
      description: this._job.textContent,
    };
    return this._userData;
  }

  setUserInfo({ name, description }) {
    console.log("setUserInfo name =", name);
    console.log("setUserInfo description =", description);

    this._name.textContent = name;
    this._job.textContent = description;
  }
}
