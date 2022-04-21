class User {
  constructor(name, username, password, email, role) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
  }
  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
  xuatThongTin() {
    console.log(`Name: ${this.name}`);
    console.log(`Username: ${this.username}`);
    console.log(`Password: ${this.password}`);
    console.log(`Email: ${this.email}`);
    console.log(`Role: ${this.role}`);
  }

}

class StoreUser {
  constructor() {
    this.users = [];
  }
  addUser(user) {
    let check = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].getUsername() === user.getUsername()) {
        return false;
      }
      this.users.push(user);
      return true;
    }
    if (!check) {
      this.users.push(user);
    }
  }
  login(username, password) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].getUsername() === username &&
        this.users[i].getPassword() === password) {
        return true;
      }
    }
    return false;
  }
  getListUsers() {
    return this.users
  }
  save() {
    if (this.users.length > 0) {
      const convertArrayToObj = JSON.stringify(this.users)
      localStorage.setItem('users', convertArrayToObj)
    }
  }
  getData() {
    const data = localStorage.getItem('users')
    if (data) {
      const arrUser = JSON.parse(data)
      const listUser = []
      for (let i = 0; i < arrUser.length; i++) {
        const userTemp = new User(arrUser[i].name, arrUser[i].username, arrUser[i].password, arrUser[i].email, arrUser[i].role)
        listUser.push(userTemp);
      }
      this.users = listUser
    }
  }
}

const store = new StoreUser();
store.getData();
console.log(store)
document.getElementById('frmDangKy') && document.getElementById('frmDangKy').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('name').value
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value
  const role = document.getElementById('role').value

  if (name == '' || username == '' || password == '' || email == '' || role == '') {
    alert('invalid value')
  } else {
    const user = new User(name, username, password, email, role)
    const isCreate = store.addUser(user);
    if (isCreate) {
      alert('Đăng kí thành công')
      store.save();
      window.location = "./login.html"
    } else {
      alert('User name đã tồn tại')
    }
  }
})

document.getElementById('frmLogin') && document.getElementById('frmLogin').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const role = document.getElementById('role').value
  if (username == '' || password == '' || role == '') {
    alert('invalid value')
  }
  const isCreate = store.login(username, password);
  const check_admin = "admin";
  if (isCreate && role == check_admin) {
    alert('Đăng nhập thành công')
    window.location = "./admin/product.html";
  } else if (isCreate) {
    alert('Đăng nhập thành công')
    window.location = "./user/product.html";
  }
  else {
    alert('Đăng nhập thất bại')
  }
})

