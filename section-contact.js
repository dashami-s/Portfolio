(function () {
  window.SiteSections = window.SiteSections || {};

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  window.SiteSections.contact = function (content) {
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

    return `
      <section id="contact" class="page-section">
        <div class="section-intro">
          <span class="eyebrow">${escapeHTML(content.eyebrow)}</span>
          <h2>${escapeHTML(content.title)}</h2>
          <p>${escapeHTML(content.description)}</p>
        </div>
        <section class="section grid-2">
          <article class="contact-card reveal-card accent-1">
            <em>Reach Out</em>
            <h3>Direct contact</h3>
            <p>Available for internships, analyst roles, PMO-support opportunities, and collaborative early-career work.</p>
            <div class="contact-stack">
              <a class="profile-link" href="mailto:${escapeHTML(content.email || "")}">${escapeHTML(content.email || "")}</a>
              <a class="profile-link" href="tel:${escapeHTML(content.phone || "")}">${escapeHTML(content.phone || "")}</a>
              <div class="profile-link static">${escapeHTML(content.location || "")}</div>
              <a class="profile-link" href="${escapeHTML(content.linkedin || "#")}" target="_blank" rel="noreferrer">LinkedIn Profile</a>
              <a class="profile-link" href="${escapeHTML(content.github || "#")}" target="_blank" rel="noreferrer">GitHub Portfolio</a>
            </div>
          </article>
          ${notes}
        </section>
      </section>
    `;
  };
})();
