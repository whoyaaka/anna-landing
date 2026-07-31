const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealEverything = () => {
  revealItems.forEach((item) => item.classList.add("is-visible"));
};

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealEverything();
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -4% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
