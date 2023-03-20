"use strict";
const title = document.getElementById("title");
const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const bodyContainer = document.getElementById("task-container");
const notificationContainer = document.querySelector(".body__left-slider");
const notificationBody = document.querySelector(
  ".body__left-slider-notification"
);
const closeNotification = document.getElementById("close-notification");
const notification = document.getElementById("notification__count");

const url =
  "https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json";
const getApiData = async (url) => {
  try {
    const callApi = await fetch(url);
    console.log("hi20");
    console.log(await callApi.blob());
    const responce = await callApi.json();
    console.log("hi21");
    return responce;
  } catch (error) {
    console.log(error);
  }
};

const populateApi = async () => {
  const ApiData = await getApiData(url);
  console.log("hi22");
  const taskArray = ApiData.tasks[0];
  const taskList = taskArray.assets;
  title.innerText = ApiData.title;

  [taskArray].map((task) => {
    projectTitle.innerText = task.task_title;
    projectDescription.innerText = task.task_description;
  });
  // onclick show task notification

  closeNotification.addEventListener("click", () => {
    notificationContainer.classList.remove("notice-on");
    notificationBody.innerHTML = `<p id="notification__count">1</p>`;
  });
  let li = `<li>${taskArray.task_title}</li>`;

  notification.addEventListener("click", () => {
    notificationContainer.classList.add("notice-on");
    notificationBody.innerHTML = `<ul class="notification-ul">${li}</ul>`;
  });
  for (const list of taskList) {
    li += `<li>${list.asset_title}</li>`;
  }
  let box = taskList.map((list, i) => {
    return `
    <div class="task-container-box ${list.asset_content_type + i}">
              <div class="task-head">
                <div class="task-title" id="task-title">${
                  list.asset_title
                }</div>
                <div class="task-icon">i</div>
              </div>
              <div class="task-body-desc">
                <div class="task-description" id="task-description"><p><span>Description:</span>${
                  list.asset_description
                }</p></div>
              </div>
              ${
                list.asset_title === "Threadbuild"
                  ? `
                <div class="content-box__thread">
                <p>
                  <span><img src="./asset/up-arrow.svg" alt="up-arrow" /></span>
                  Thread A
                </p>
                
              </div>
                <div class="content-box__thread-close">
            <div class="thread--one one">
              <p>Sub thread 1</p>
              <input
                type="text"
                name="threadOne"
                placeholder="Enter text here"
              />
            </div>
            <div class="thread--one two">
              <p>Sub Interpretation 1</p>
              <input
                type="text"
                name="threadOne"
                placeholder="Enter text here"
              />
            </div>
          </div>
          <div class="content__box-message">
            <ul>
              <li><img src="./asset/buld.svg" /></li>
              <li><img src="./asset/message.svg" /></li>
              <li><img src="./asset/question.svg" /></li>
              <li><img src="./asset/flower.svg" /></li>
            </ul>
            <div class="select-option">
              <select id="details" name="contact">
                <option>Select Category</option>
              </select>
              <select id="details" name="contact">
                <option>Select Process</option>
              </select>
            </div>
            <div class="thread-btn">
              <button class="two-sub-thread-btn">
                <span>+</span>Sub-thread
              </button>

              <div class="two-summary">
                <p>Summary of thread</p>
                <input type="text" name="summary" />
              </div>
            </div>
          </div>`
                  : ""
              }
              ${
                list.asset_title == "Structure you pointers "
                  ? `
                  <div class="structure-title">
                  <p>Title</p>
                  <input type="text" name="title" />
                </div>
                  <div class="structure-content">
                    <p>Content</p>
                    <div class="content-edit-options">
                      <p>File</p>
                      <p>Edit</p>
                      <p>View</p>
                      <p>Insert</p>
                      <p>Format</p>
                      <p>Tools</p>
                      <p>Table</p>
                      <p>Help</p>
                      <p>
                        <img src="./asset/undo.svg" />
                      </p>
                      <p>
                        <img src="./asset/redo.svg" />
                      </p>
                      <p>
                        <img src="./asset/expand.svg" />
                      </p>
                      <p>paragraph</p>
                      <p>...</p>
                    </div>
                    <input type="text" name="content" />
                  </div>`
                  : ""
              }
               ${
                 list.asset_content_type == "video"
                   ? `<iframe class="iframe" src=${list.asset_content} ></iframe>`
                   : ``
               }
               ${
                 list.asset_title == "4SA Method"
                   ? `<iframe class="article-frame" id="article-frame" src=${list.asset_content} ></iframe>`
                   : ``
               }
            </div>   
    `;
  });
  bodyContainer.innerHTML += box;
};

populateApi();
