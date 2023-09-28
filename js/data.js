const info = new URLSearchParams(location.search).get("name");

const boxs = document.querySelector(".boxs");
const innerBox = document.querySelector(".inner-box");

function boxFun(element, folLength, folData, repoLength) {
  return `
    <div class="card border p-4 mb-2" style="width: 25rem; color: white; background-color: transparent;">
      <img src="${element.avatar_url}" class="card-img-top border rounded-circle" >
      <span class="position-absolute start-0 mx-3 my-1 border rounded-5 px-2 py-1" style=" background-color: transparent; left: 0; font-size: 10px; color: slategrey;">${element.id}</span>
        <div class="card-body border rounded-4 mt-2 text-center">
          <a href="${element.html_url}" class="card-title fw-bold fs-4" style="text-decoration: none;">${element.login}</a>
          <div class="flowers-box d-flex justify-content-evenly align-items-center mt-3">
            <p class="flowers-texts" style="font-size: 16px;">${folLength.length} Followers</p>
            <p class="flowers-texts" style="font-size: 16px;">${folData.length} Followings</p>
            <p class="flowers-texts" style="font-size: 16px;">${repoLength.length} Repositories</p>
          </div>
        </div>
    </div>
  `;
}

function reposFun(item) {
  return `
    <a style="text-decoration: none;" class="repo-as" href="${item.html_url}">${item.name}</a>
  `;
}

async function getPosts() {
  try {
    let res = await fetch(`https://api.github.com/search/users?q=${info}`);
    let flow = await fetch(`https://api.github.com/users/${info}/followers`);
    let flows = await fetch(`https://api.github.com/users/${info}/following`);
    let repos = await fetch(`https://api.github.com/users/${info}/repos`);

    if (flow.ok === false) {
      throw new Error(`Error: ${flow.status} ${flow.statusText}`);
    }
    if (flows.ok === false) {
      throw new Error(`Error: ${flows.status} ${flows.statusText}`);
    }
    if (repos.ok === false) {
      throw new Error(`Error: ${repos.status} ${repos.statusText}`);
    }
    if (res.ok === false) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    let folData = await flows.json();
    let flowData = await flow.json();
    let repoLength = await repos.json();
    let data = await res.json();

    repoLength.map((item) => {
      innerBox.innerHTML += reposFun(item);
    });

    let posts = data.items;

    let filt = posts.filter((item) => item.login === info);

    filt.map((item) => {
      console.log(item);
      boxs.innerHTML += boxFun(item, flowData, folData, repoLength);
    });
  } catch (err) {
    console.log("Error:", err);
  }
}

getPosts();
