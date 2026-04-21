const header = document.getElementById("site-header");
const revealTargets = document.querySelectorAll(".reveal");
const motionStatus = document.getElementById("motion-status");
const replayButton = document.getElementById("replay-animation");
const animationContainer = document.getElementById("logo-animation");

let logoAnimation = null;

function syncHeader() {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setMotionStatus(message, isError = false) {
  if (!motionStatus) {
    return;
  }

  motionStatus.textContent = message;
  motionStatus.classList.toggle("is-error", isError);
}

function setupRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealTargets.forEach((target) => observer.observe(target));
}

function setupLogoAnimation() {
  if (!animationContainer) {
    return;
  }

  if (!window.lottie) {
    setMotionStatus("The Lottie runtime could not load. Download the JSON source below.", true);
    return;
  }

  logoAnimation = window.lottie.loadAnimation({
    container: animationContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "anarix-logo-loader.json",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  });

  logoAnimation.addEventListener("DOMLoaded", () => {
    setMotionStatus("Official Lottie source loaded unchanged.");
  });

  logoAnimation.addEventListener("data_failed", () => {
    setMotionStatus("The official animation JSON could not be rendered.", true);
  });
}

if (replayButton) {
  replayButton.addEventListener("click", () => {
    if (!logoAnimation) {
      setMotionStatus("Animation runtime is still loading.", true);
      return;
    }

    logoAnimation.goToAndPlay(0, true);
    setMotionStatus("Replaying the official source animation.");
  });
}

window.addEventListener("scroll", syncHeader, { passive: true });

syncHeader();
setupRevealObserver();
setupLogoAnimation();
