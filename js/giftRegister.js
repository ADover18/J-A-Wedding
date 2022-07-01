///////////////////////////// TO RESET DATA

// const resetData = {};
// [...document.querySelectorAll(".card")].forEach((item) => {
//   resetData[item.id] = false;
// });

// const request = new XMLHttpRequest();
// request.open("PUT", "https://json.extendsclass.com/bin/239602f58061", true);
// request.setRequestHeader(
//   "Security-key",
//   "7a6ecf3e-aa96-11ec-b95c-0242ac110002"
// );
// request.onreadystatechange = () => {};
// request.send(JSON.stringify(resetData));

//////////////////////// END ///////////////////////////////////////

window.onload = function () {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

const getPurchaseData = async function () {
  try {
    const res = await fetch("https://json.extendsclass.com/bin/239602f58061", {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Security-key": "7a6ecf3e-aa96-11ec-b95c-0242ac110002",
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

let purchaseData = await getPurchaseData();
let newPurchaseData = {};

Object.entries(purchaseData).forEach((item, index) => {
  item[1]
    ? document
        .querySelector(`#${item[0]}`)
        .lastElementChild.insertAdjacentHTML(
          "afterend",
          "<p class='card__purchased'>Purchased</p>"
        )
    : document
        .querySelector(`#${item[0]}`)
        .firstElementChild.insertAdjacentHTML(
          "beforebegin",
          `<input
    class="checkbox"
    id="gift-checkbox--${index}"
    type="checkbox"
    name="gift-checkbox"
    id=""
  />
  <label class="gift-checkbox" for="gift-checkbox--${index}" id="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="gift-checkbox__tick"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#52525b"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
    </svg>
  </label>`
        );
});

[...document.querySelectorAll(".checkbox")].forEach((input) => {
  input.addEventListener("change", function () {
    let item = input.parentElement.id;
    let itemCard = input.parentElement.cloneNode(true);
    itemCard.querySelector("input").remove();
    itemCard.querySelector("label").remove();

    input.checked
      ? document.querySelector(".modal__cards").appendChild(itemCard)
      : document.querySelector(".modal").querySelector(`#${item}`).remove();
  });
});

document
  .querySelector(".btn--submit")
  .addEventListener("click", function (event) {
    if (document.querySelector(".modal__text--msg"))
      document
        .querySelector(".modal__content")
        .removeChild(document.querySelector(".modal__text--msg"));
    fetch("https://json.extendsclass.com/bin/239602f58061", {
      cache: "no-store",
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Security-key": "7a6ecf3e-aa96-11ec-b95c-0242ac110002",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`${response.status}`);
        return response.json();
      })
      .then((data) => {
        [...document.querySelector(".modal__cards").children].forEach(
          (item) => {
            if (data[item.id] === true) {
              document
                .querySelector(".modal__text--last")
                .insertAdjacentHTML(
                  "afterend",
                  `<p class="modal__text modal__text--msg">Sorry, ${
                    item.querySelector(".card__text--item").textContent
                  } has just been marked as purchased by another user.</p>`
                );
              document.querySelector(".modal__cards").removeChild(item);
            }
          }
        );
        if (document.querySelector(".modal__cards").children.length === 0) {
          document.querySelector(".modal__text--top").textContent =
            "You have not yet checked any items to mark them as purchased. ";
          document.querySelector(".modal__text--last").textContent =
            "First check an item by clicking the box in the top left hand corner of the item. Then click the 'Mark as Purchased' button at the bottom of the page.";
          document.querySelector(".modal__btn").style.display = "none";
        } else {
          document.querySelector(".modal__text--top").textContent =
            "You are about to mark the following as purchased:";
          document.querySelector(".modal__text--last").textContent =
            "This will notify others that this (or something similar) has been bought as a gift. Are you sure you wish to continue?";
          document.querySelector(".modal__btn").style.display = "block";
        }
        document.querySelector(".modal").style.display = "block";
      });
  });

document
  .querySelector(".modal__close")
  .addEventListener("click", function (event) {
    document.querySelector(".modal").style.display = "none";
  });

document.querySelector(".modal__btn").addEventListener("click", function () {
  [
    ...document.querySelector(".modal__content").querySelectorAll(".card"),
  ].forEach((item) => {
    newPurchaseData[item.id] = true;
  });
  console.log(newPurchaseData);
  const request = new XMLHttpRequest();
  request.open("PATCH", "https://json.extendsclass.com/bin/239602f58061", true);
  request.setRequestHeader("Content-type", "application/merge-patch+json");
  request.setRequestHeader(
    "Security-key",
    "7a6ecf3e-aa96-11ec-b95c-0242ac110002"
  );
  request.onreadystatechange = () => {};
  request.send(JSON.stringify(newPurchaseData));
  newPurchaseData = {};
  setTimeout(function () {
    location.reload(true);
  }, 300);
});
