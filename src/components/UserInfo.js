export default class UserInfo {
  constructor(nameSelector, subtitleSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(subtitleSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
