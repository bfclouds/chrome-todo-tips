// function dec2hex(dec) {
//   return (`0${dec.toString(16)}`).substr(-2);
// }
// function randomStr(len = 32) {
//   const arr = new Uint8Array(len);
//   window.crypto.getRandomValues(arr);
//   const result = Array.from(arr, dec2hex).join('');
//   return result;
// }

// const saveToLocalStorage = function (typeKey, dateKey, value) {
//   let data = localStorage.getItem(typeKey);
//   if (data) {
//     data = JSON.parse(data)
//   } else {
//     data = {}
//   }

//   if (!data[dateKey]) {
//     data[dateKey] = []
//   }

//   if (value.id) {
//     // 消息的更新
//     const oldValue = data.find(item => item.id === value.id)
//     oldValue.dataArray = value.dataArray
//   } else {
//     value.id = randomStr() // 随机生成一条id
//     data[dateKey].unshift(value);
//   }

//   localStorage.setItem(typeKey, data)
// }

const saveToLocalStorage = function (typeKey, data) {
  if (!data || !typeKey) {
    return
  }
  let saveData = data
  if (typeof data === 'object') {
    saveData = JSON.stringify(data)
  }
  localStorage.setItem(typeKey, saveData)
}

const getToLocalStorage = function(typeKey) {
  if (!typeKey) {
    return
  }
  let localData = localStorage.getItem(typeKey)
  try {
    return JSON.parse(localData)
  } catch(err) {
    return localData
  }
}

export {
  saveToLocalStorage,
  getToLocalStorage
}