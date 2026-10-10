"use strict";

// Add a short, gentle transition before navigating between the two pages.
document.querySelectorAll('a[href="invitation.html"], a[href="index.html"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    // Keep normal browser behavior for new tabs, modified clicks, and downloads.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === "_blank") {
      return;
    }

    const destination = link.getAttribute("href");
    if (!destination) return;

    event.preventDefault();
    document.body.classList.add("page-leaving");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      window.location.href = destination;
    }, prefersReducedMotion ? 0 : 260);
  });
});

// Live countdown to the Nikah date. The invitation date is 10 December 2026.
const countdown = document.querySelector("[data-countdown]");
if (countdown) {
  // India Standard Time (UTC+05:30), matching the location of the invitation.
  const weddingDate = new Date("2026-12-10T11:30:00+05:30").getTime();
  const fields = {
    days: countdown.querySelector("[data-days]"),
    hours: countdown.querySelector("[data-hours]"),
    minutes: countdown.querySelector("[data-minutes]"),
    seconds: countdown.querySelector("[data-seconds]")
  };

  const updateCountdown = () => {
    const remaining = weddingDate - Date.now();
    if (remaining <= 0) {
      Object.values(fields).forEach((field) => {
        if (field) field.textContent = "00";
      });
      const heading = document.querySelector(".countdown-heading");
      if (heading) heading.textContent = "The celebration day is here";
      return;
    }

    const days = Math.floor(remaining / 86_400_000);
    const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
    const minutes = Math.floor((remaining % 3_600_000) / 60_000);
    const seconds = Math.floor((remaining % 60_000) / 1_000);

    if (fields.days) fields.days.textContent = String(days).padStart(2, "0");
    if (fields.hours) fields.hours.textContent = String(hours).padStart(2, "0");
    if (fields.minutes) fields.minutes.textContent = String(minutes).padStart(2, "0");
    if (fields.seconds) fields.seconds.textContent = String(seconds).padStart(2, "0");
  };

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
}
