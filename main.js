const currentTimeAsMilliseconds = 0
const oneMinuteAsMilliseconds = 4000
const NOTIFICATION_TEMPLATE_TYPE = {
  BASIC: "basic",
  IMAGE: "image",
  LIST: "list",
  PROGRESS: "progress"
};
const TIPS_LIST = 'tips_list'
const BASE_TIME = 6
const ADD_BASE_INTERVAL_TIME = 300 // 5分钟

const button1 = {
  title: '延迟5分钟提醒'
}
const button2 = {
  title: '已经写了'
}

let isLock = false
let timer = null // 定时器
let intervalTime = BASE_TIME
let tipsList = []

chrome.runtime.onInstalled.addListener(() => {
  setTips()
  tipsinterval()
});

chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
  const idArr = notificationId.split('-')
  if (idArr.length > 1) {
    const item = tipsList[idArr[1]]
    if (item) {
      console.log(buttonIndex);
      if (buttonIndex === 0) { // 延迟5分钟
        console.log(item.nextTipTime);
        
        item.nextTipTime = new Date().getTime() + 5 * 60 * 1000
        console.log(item.nextTipTime);
      } else if(buttonIndex === 1) { // 已经写了
        if (item.count !== -1) {
          item.count--
        }
        item.item += 24 * 60 * 60 * 1000
        item.nextTipTime = item.time
      }
      saveToLocalStorage(TIPS_LIST, tipsList)
    }
    return
  }

  // todo事件
  if (buttonIndex === 0) { // 延迟5分钟
    intervalTime = ADD_BASE_INTERVAL_TIME
  } else if(buttonIndex === 1) { // 已经写了
    isLock = true
  }
})

function strToJson(data) {
  try {
    return JSON.parse(data)
  } catch(err) {
    return data || null
  }
}

function tipTodo() {
  chrome.notifications.create({
    type: NOTIFICATION_TEMPLATE_TYPE.BASIC,
    title: 'todo todo',
    message: '写todo写todo，不写就扣钱！',
    buttons: [button1, button2],
    iconUrl: "/images/todo.jpeg",
    isClickable: true
  });
}

function setTips () {
  timer = setTimeout(() => {
    const date = new Date()
    date.setHours(18, 20, 0) // 时间设置为18:20:00

    if ([3,4].includes(date.getDay())) {
      date.setHours(21, 20, 0) // 周三周四加班，时间设置为21:20:00
    }
    const isThan = new Date().getTime() >= date.getTime()

    if (isThan && !isLock) {
      tipTodo()
    }

    if (!isThan && isLock) {
      isLock = false
    }
    // 超过5分钟提醒后重新按原来的时间间隔提醒
    setTips()
    if (intervalTime !== BASE_TIME) {
      intervalTime = BASE_TIME
    }
  }, 1000 * intervalTime)
}

// --------------------------- 自定义tipslist -------------------------

function saveToLocalStorage (typeKey, data) {
  if (!data || !typeKey) {
    return
  }
  let saveData = data
  if (typeof data === 'object') {
    saveData = JSON.stringify(data)
  }
  const params = {}
  params[typeKey] = saveData
  chrome.storage.local.set(params, function() {
    console.log('保存' + saveData)
  });
}
function getToLocalStorage (typeKey, cb) {
  if (!typeKey) {
    return
  }
  chrome.storage.local.get([typeKey], function(result) {
    localData = result[typeKey]
    cb && cb(strToJson(localData) || [])
  });
}

function tipsinterval () {
  getToLocalStorage(TIPS_LIST, (list) => {
    tipsList = list
    setTimeout(() => {
      const time = (new Date()).getTime()
      for (let index = 0; index < tipsList.length; index++) {
        const item = tipsList[index];
        if (item.count == 0) {
          tipsList.splice(index, 1)
          index -= 1
          continue
        }
        console.log(time, item.nextTipTime);
        if (time > item.nextTipTime) {
          craeteNotication(index, item)
          item.nextTipTime = time + 30 * 1000  // 30秒以后再提醒
        }
      }
      tipsinterval()
    }, 10000) // 10秒一次
  })
}

function craeteNotication(id, info) {
  chrome.notifications.create(`${TIPS_LIST}-${id}-${new Date().getTime()}`, {
    type: NOTIFICATION_TEMPLATE_TYPE.BASIC,
    title: '起来办事啦',
    message: info.message,
    buttons: [button1, button2],
    iconUrl: "/images/todo.jpeg",
    isClickable: true
  });
}