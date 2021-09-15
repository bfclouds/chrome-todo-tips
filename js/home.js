// import { saveToLocalStorage } from './utils'

// const boxItems = document.querySelectorAll('.box-item')

// boxItems.forEach(box => {
//   box.addEventListener('click', function() {
//     this.classList.toggle('show')
//   })
// })

// const things = document.getElementsByClassName('things-list')[0]
// things.addEventListener('click', function (event) {
//   event.stopPropagation()
// })

// const bookmarks = document.getElementsByClassName('bookmarks-list')[0]
// bookmarks.addEventListener('click', function (event) {
//   event.stopPropagation()
// })

// const tips = document.getElementsByClassName('tips-list')[0]
// tips.addEventListener('click', function (event) {
//   event.stopPropagation()
// })

// const getTodoStrBtn = document.getElementsByClassName('get-todo_btn')[0]
// getTodoStrBtn.onclick = function() {
//   console.log(1);
// }
// // 添加每日事项
// const addThingsBtn = document.getElementsByClassName('add-things')[0]
// addThingsBtn.onclick = function(event) {
//   event.stopPropagation()
//   const mask = document.getElementsByClassName('mask')[0]
//   mask.style = 'display:flex;'
//   mask.innerHTML = `
//   <div class="mask-form">
//     <div class="title">添加每日事项</div>
//     <form action="#" onsubmit="return onsubmitForm(this)" autocomplete="off">
//       <div class="form-item">
//         <span class="label">类别</span>
//         <input class="base-input" type="text">
//       </div>
//       <div class="form-item">
//         <span class="label">内容</span>
//         <textarea class="base-input" type="text" aria-disabled="true"></textarea>
//       </div>
//       <div class="form-item">
//         <span class="label">时间</span>
//         <input class="base-input" type="datetime">
//       </div>
//       <button class="form-submit" type="submit">确认</button>
//     </form>
//   </div>
//   `
// }
// // 添加书签
// const addBookmarksBtn = document.getElementsByClassName('add-bookmarks')[0]
// addBookmarksBtn.onclick = function(event) {
//   event.stopPropagation()
//   const mask = document.getElementsByClassName('mask')[0]
//   mask.style = 'display:flex;'
//   mask.innerHTML = `
//   <div class="mask-form">
//     <div class="title">添加书签</div>
//     <form action="#" onsubmit="return onsubmitForm(this)" autocomplete="off">
//       <div class="form-item">
//         <span class="label">标题</span>
//         <input class="base-input" type="text">
//       </div>
//       <div class="form-item">
//         <span class="label">备注</span>
//         <input class="base-input" type="text">
//       </div>
//       <div class="form-item">
//         <span class="label">url</span>
//         <input class="base-input" type="text" aria-disabled="true"></input>
//       </div>
//       <button class="form-submit" type="submit">确认</button>
//     </form>
//   </div>
//   `
// }

// // 添加提醒
// const addTipsBtn = document.getElementsByClassName('add-tips')[0]
// addTipsBtn.onclick = function(event) {
//   event.stopPropagation()
//   const mask = document.getElementsByClassName('mask')[0]
//   mask.style = 'display:flex;'
//   mask.innerHTML = `
//   <div class="mask-form">
//     <div class="title">添加提醒</div>
//     <form action="#" onsubmit="return onsubmitForm(this)" autocomplete="off" date-value="就是离开对方家里舒服">
//       <div class="form-item">
//         <span class="label">标题</span>
//         <input class="base-input" type="text">
//       </div>
//       <div class="form-item">
//         <span class="label">提醒内容</span>
//         <input class="base-input" id="content" type="text">
//       </div>
//       <div class="form-item">
//         <span class="label">提醒时间</span>
//         <input class="base-input" type="text"></input>
//       </div>
//       <div class="form-item">
//         <span class="label">提醒间隔</span>
//         <input class="base-input" type="datetime">
//       </div>
//       <button class="form-submit" type="submit">确认</button>
//     </form>
//   </div>
//   `
// }

// function onsubmitForm(form) {
//   let dataObj = {}
//   const dataArray = []
//   const formItems = form.getElementsByClassName('form-item')
//   console.log(formItems);
//   if (form.dataset.value) {
//     dataObj= form.dataset.value
//   }
//   [].forEach.call(formItems, (item) => {
//     const obj = {}
//     const label = item.getElementsByClassName('label')[0]
//     const input = item.getElementsByTagName('input')[0]
//     const textarea = item.getElementsByTagName('textarea')[0]

//     obj.key = label.innerText;
//     let value = ''
//     let type = ''
//     if (input) {
//       value = input.value
//       type = 'input'
//     }
//     if (textarea) {
//       value = textarea.value
//       type = 'textarea'
//     }
//     obj.value = value
//     obj.type = type
//     dataArray.push(obj)
//   })
//   dataObj.dataArray = dataArray
//   const dateKey = new Date().toLocaleDateString()
//   saveToLocalStorage(typeKey, dateKey, dataObj)
//   return false
// }

// function closeDialog() {
//   const target = event.target
//   if (target.id === 'home-mask') {
//     target.style = 'display: none;'
//   }
// }