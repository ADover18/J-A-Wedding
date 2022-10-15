import { Fancybox } from "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.esm.js";

Fancybox.bind("[data-fancybox]", {
  Toolbar: {
    display: [
      { id: "counter", position: "center" },
      { id: "download", position: "right" },
      { id: "zoom", position: "right" },
      { id: "slideshow", position: "right" },
      { id: "fullscreen", position: "right" },
      { id: "thumbs", position: "right" },
      { id: "close", position: "right" },
    ],
  },
});

