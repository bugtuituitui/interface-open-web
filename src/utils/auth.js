import Cookies from 'js-cookie'

const TokenKey = 'token'
const SessionId = "open_token"
let isFirst = true;

export function getToken() {
  // 从缓存中读取token
  if (isFirst) {

    if (localStorage.getItem(SessionId)) {
      setToken(localStorage.getItem(SessionId));
    }
  }

  return Cookies.get(TokenKey)
}

export function setToken(token) {
  localStorage.setItem(SessionId, token);
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  localStorage.clear();
  return Cookies.remove(TokenKey)
}
