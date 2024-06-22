import { Fancybox } from "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.esm.js";

Fancybox.bind("[data-fancybox]", {
  Toolbar: {
    display: [
      { id: "counter", position: "center" },
      { id: "slideshow", position: "left" },
      { id: "fullscreen", position: "left" },
      { id: "thumbs", position: "left" },
      { id: "zoom", position: "left" },
      { id: "download", position: "left" },
      { id: "close", position: "right" },
    ],
  },
});
