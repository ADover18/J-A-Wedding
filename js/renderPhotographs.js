const photoGroupSection = document.querySelector("#photo-group");

for (let i = 1; i < 546; i++) {
  let photoElement = document.createElement("a");
  photoElement.setAttribute("href", `img/photographs/Image-${i}.jpg`);

  photoElement.setAttribute("data-fancybox", "gallery");
  photoElement.setAttribute("data-src", `img/photographs/Image-${i}.jpg`);
  photoElement.setAttribute(
    "data-download-src",
    `img/photographs/Image-${i}.jpg`
  );
  photoElement.setAttribute("class", "card card--photo");
  photoElement.setAttribute("id", `photo-${i}`);
  photoElement.innerHTML = `<img
                                data-src="img/photographs/Image-${i}.jpg"
                                src="img/photographs-small/Image-${i}.jpg"
                                class="card__img card__img--photo lazy-image"
                                download
                            />`;
  photoGroupSection.appendChild(photoElement);
}
