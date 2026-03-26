(function () {
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value || "";
    }
  }

  function setHTML(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = value || "";
    }
  }

  function setHref(id, value) {
    const el = document.getElementById(id);
    if (el && value) {
      el.setAttribute("href", value);
    }
  }

  function setAttrs(id, attrs) {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    Object.entries(attrs || {}).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderLanding(content) {
    setText("landing-eyebrow", content.eyebrow);
    setText("landing-title", content.title);
    setText("landing-description", content.description);
    setText("landing-primary-label", content.primaryLabel);
    setHref("landing-primary-link", content.primaryHref);
    setText("landing-secondary-label", content.secondaryLabel);
    setHref("landing-secondary-link", content.secondaryHref);
    setText("landing-profile-title", content.profilePanel ? content.profilePanel.title : "");
    setText("landing-profile-meta", content.profilePanel ? content.profilePanel.meta : "");
    setText("landing-contact-title", content.contactPanel ? content.contactPanel.title : "");
    setText("landing-contact-meta", content.contactPanel ? content.contactPanel.meta : "");
    setText("landing-contact-description", content.contactPanel ? content.contactPanel.description : "");

    const stats = (content.stats || [])
      .map(
        (item) => `
          <div class="mini-stat">
            <strong>${escapeHTML(item.value)}</strong>
            <span>${escapeHTML(item.label)}</span>
          </div>
        `
      )
      .join("");

    setHTML("landing-stats", stats);

    const cards = (content.highlights || [])
      .map(
        (item, index) => `
          <article class="view-card reveal-card accent-${(index % 3) + 1}">
            <div>
              <em>${escapeHTML(item.label)}</em>
              <h3>${escapeHTML(item.title)}</h3>
              <p>${escapeHTML(item.description)}</p>
            </div>
            <a class="card-link" href="${escapeHTML(item.href || "#")}">${escapeHTML(item.cta || "View")}</a>
          </article>
        `
      )
      .join("");

    setHTML("landing-highlights", cards);

    const profileLines = ((content.profilePanel && content.profilePanel.lines) || [])
      .map((item) => `<li>${escapeHTML(item)}</li>`)
      .join("");
    setHTML("landing-profile-list", profileLines);

    const chips = (content.chips || [])
      .map((item) => `<div class="orbit-chip">${escapeHTML(item)}</div>`)
      .join("");
    setHTML("landing-hero-orbit", chips);
  }

  function renderAbout(content) {
    setText("about-eyebrow", content.eyebrow);
    setText("about-title", content.title);
    setText("about-description", content.description);

    const cards = (content.cards || [])
      .map(
        (item, index) => `
          <article class="stack-card reveal-card accent-${(index % 3) + 1}">
            <em>${escapeHTML(item.label)}</em>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.description)}</p>
          </article>
        `
      )
      .join("");

    setHTML("about-cards", cards);
  }

  function renderWork(content) {
    setText("work-eyebrow", content.eyebrow);
    setText("work-title", content.title);
    setText("work-description", content.description);

    const cards = (content.gallery || [])
      .map((item) => {
        const imageBlock = item.image
          ? `<div class="gallery-image-wrap"><img class="gallery-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}"></div>`
          : "";
        return `
          <article class="view-card gallery-card reveal-card">
            <div>
              <em>${escapeHTML(item.label)}</em>
              ${imageBlock}
              <h3>${escapeHTML(item.title)}</h3>
              <p>${escapeHTML(item.description)}</p>
            </div>
          </article>
        `;
      })
      .join("");

    setHTML("work-gallery", cards);
  }

  function renderContact(content) {
    setText("contact-eyebrow", content.eyebrow);
    setText("contact-title", content.title);
    setText("contact-description", content.description);
    setText("contact-email-label", content.email);
    setHref("contact-email-link", `mailto:${content.email || ""}`);
    setHref("contact-linkedin-link", content.linkedin || "#");

    const notes = (content.notes || [])
      .map(
        (item, index) => `
          <article class="note-card reveal-card accent-${(index % 3) + 1}">
            <em>${escapeHTML(item.label)}</em>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.description)}</p>
          </article>
        `
      )
      .join("");

    setHTML("contact-notes", notes);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.SiteData) {
      return;
    }

    const content = window.SiteData.getContent();
    const page = document.body.getAttribute("data-page");

    if (page === "landing") {
      renderLanding(content.landing);
    }

    if (page === "about") {
      renderAbout(content.about);
    }

    if (page === "work") {
      renderWork(content.work);
    }

    if (page === "contact") {
      renderContact(content.contact);
    }
    const pulse = document.querySelector("[data-live-pulse]");
    if (pulse) {
      setAttrs(pulse.id, { "aria-label": "Live site status" });
    }
  });
})();
