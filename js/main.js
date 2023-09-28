const box = document.querySelector(".box");
const searchInput = document.querySelector(".input");

function boxFun(el) {
  return `
    <div class="card border border p-3 mb-2" style="width: 17rem; background-color: transparent;">
      <img src="${el.avatar_url}" class="card-img-top border rounded-circle" >
      <span class="position-absolute start-0 mx-2 my-1 border rounded-5 px-2 py-1" style="left: 0; font-size: 10px; background-color: transparent; color: slategrey;">${el.id}</span>
      <div class="card-body border rounded-4 mt-2 text-center">
        <h5 class="card-title mb-3" style="color: white">${el.login}</h5>
        <a href="info.html?name=${el.login}" class="btn btn-success">See account</a>
      </div>
    </div>
  `;
}

async function getPosts() {
  try {
    let inp = searchInput.value;
    let res;
    if (inp === "") {
      res = await fetch(`https://api.github.com/users`);
    } else {
      const searchValue = searchInput.value;
      res = await fetch(`https://api.github.com/search/users?q=${searchValue}`);
    }
    if (res.ok === false) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    let data = await res.json();

    box.innerHTML = "";

    let posts = inp === "" ? data : data.items;
    posts.map((item) => {
      box.innerHTML += boxFun(item);
    });
  } catch (err) {
    console.log("Error:", err);
  }
}

searchInput.addEventListener("keyup", getPosts);

getPosts();
