class UserMessage {
  username?: String;
  address?: String;
  message?: String;

  constructor(username?: String, address?: String, message?: String) {
    this.username = username;
    this.address = address;
    this.message = message;
  }
}

export default UserMessage;
