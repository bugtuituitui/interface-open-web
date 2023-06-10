

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// 账号校验
export function validAccount(rule, value, callback) {
  // let reg = /^[a-zA-Z]$/
  // if (!value) {
  //   return callback(new Error("不能为空"));
  // }
  // if (!reg.test(value)) {
  //   return callback(new Error("格式不正确"));
  // }

  return true;
}

// 手机号码校验
export function validatePhone(rule, value, callback) {
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

  if (!value) {
    return callback(new Error("手机号不能为空"));
  }
  if (!reg.test(value)) {
    return callback(new Error("手机号不符合格式"));
  }
  return callback();
}

// 邮箱格式校验
export function validateEmail(rule, value, callback) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  if (!value) {
    return callback(new Error("邮箱不能为空"));
  }
  if (!reg.test(value)) {
    return callback(new Error("邮箱不符合格式"));
  }
  return callback();
}


// 密码格式校验
export function validPassword(rule, value, callback) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!value) {
    return callback(new Error("不能为空"));
  }
  if (!reg.test(value)) {
    return callback(new Error("格式不正确"));
  }
  return callback();
}