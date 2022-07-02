"use strict";

const dietBtn = document.querySelector(".open-modal-btn");
const dietModal = document.querySelector(".modal");
const dietModalContent = document.querySelector(".modal__content--dietary");
const dietModalClose = document.querySelector(".modal__close");

//////////////////////////////

const formBlock = document.querySelector(".modal__form-block");
const form = document.querySelector(".dietary-form");

const formSubmitBtn = document.querySelector(".dietary-form__btn");

const modalConfirmBlock = document.querySelector(".modal__confirm-block");

const modalConfirmTextEl = document.querySelector(".modal__text--confirm");

dietBtn.addEventListener("click", function (event) {
  event.preventDefault();
  dietModal.style.display = "block";
});

dietModalClose.addEventListener("click", function () {
  dietModal.style.display = "none";
});

let dietaryData = {};

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
  formBlock.style.display = "none";
  modalConfirmBlock.style.display = "block";

  modalConfirmTextEl.innerHTML = `
      Thank you ${
        Object.entries(dietaryData)[0][0]
      } for letting us know about your dietary requirement: <em>${
    Object.entries(dietaryData)[0][1]
  }</em>
    `;
  const dietaryFormNewEntryBtn = document.querySelector(
    ".dietary-form__btn--new-entry"
  );
  dietaryFormNewEntryBtn.addEventListener("click", function () {
    formNameInput.value = "";
    formDietaryInfoInput.value = "";
    formBlock.style.display = "block";
    modalConfirmBlock.style.display = "none";
    dietaryData = {};
  });
});
