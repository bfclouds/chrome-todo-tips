const TIPS_LIST = 'tips_list'
let tipsList = []

const saveToLocalStorage = function (typeKey, data) {
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
    alert('保存' + saveData)
  });
}
const getToLocalStorage = function(typeKey) {
  if (!typeKey) {
    return
  }
  let localData
  chrome.storage.local.get([typeKey], function(result) {
    localData = result[typeKey]
    alert(JSON.stringify(localData))
  });
  try {
    return JSON.parse(localData)
  } catch(err) {
    return localData || null
  }
}

function getInputVal(id) {
  const input = document.querySelector(`#${id}`)
  return input && (input.value || null)
}

function sunbmitForm() {
  const date = getInputVal("tip-date")
  const time = getInputVal("tip-time")
  const tipText = getInputVal("tip-desc")
  const count = getInputVal("tip-count")

  if (!tipText) {
    return
  }
  const DateStr = `${date||''} ${time||''}`.trim()
  const timeStr = DateStr ? (new Date(DateStr)).getTime() : (new Date()).getTime()

  const notificationItem = {
    message: tipText, // 提醒文案
    time: timeStr, // 提醒时间
    nextTipTime: timeStr,  // 下次提醒时间
    tipCount: count || -1 // -1 无数次
  }
  tipsList.push(notificationItem)
  saveToLocalStorage(TIPS_LIST, tipsList)  // 保存在本地
}

function init () {
  tipsList = getToLocalStorage(TIPS_LIST) ?? []
  submitbtn.addEventListener('click', sunbmitForm)
}

init()
