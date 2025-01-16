import VanillaTilt from "../node_modules/vanilla-tilt/dist/vanilla-tilt.js";

export default function initTiltAnimation() {
  const elements = document.querySelectorAll(".js-tilt");
  VanillaTilt.init(elements);
}
