"use strict";

const dietBtn = document.querySelector(".food-menu__btn");
const dietModal = document.querySelector(".modal");
const dietModalClose = document.querySelector(".modal__close");

dietBtn.addEventListener("click", function () {
  dietModal.style.display = "block";
});

dietModalClose.addEventListener("click", function () {
  dietModal.style.display = "none";
});

//////////////////////////////

const form = document.querySelector(".dietary-form");

const formSubmitBtn = document.querySelector(".dietary-form__btn");

let dietaryData = {};

const getDietData = async function () {
  try {
    const res = await fetch("https://json.extendsclass.com/bin/0346217c98ef", {
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

let dietData = await getDietData();
console.log(dietData);

form.addEventListener("submit", function (event) {
  const formNameInput = document.querySelector(".dietary-form__input--text");
  const formDietaryInfoInput = document.querySelector(
    ".dietary-form__input--textarea"
  );
  event.preventDefault();
  dietaryData[formNameInput.value] = formDietaryInfoInput.value;
  const request = new XMLHttpRequest();
  request.open("PATCH", "https://json.extendsclass.com/bin/0346217c98ef", true);
  request.setRequestHeader("Content-type", "application/merge-patch+json");
  request.setRequestHeader(
    "Security-key",
    "7a6ecf3e-aa96-11ec-b95c-0242ac110002"
  );
  request.onreadystatechange = () => {};
  request.send(JSON.stringify(dietaryData));
  dietaryData = {};
  setTimeout(function () {
    location.reload(true);
  }, 300);
});
