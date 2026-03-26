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

  window.SiteSections.experience = function (content) {
    const roles = (content.roles || [])
      .map(
        (item, index) => `
          <article class="timeline-card reveal-card accent-${(index % 3) + 1}">
            <div class="timeline-head">
              <div>
                <em>${escapeHTML(item.organization)}</em>
                <h3>${escapeHTML(item.role)}</h3>
                <p class="timeline-meta">${escapeHTML(item.location)}</p>
              </div>
              <span class="date-chip">${escapeHTML(item.dates)}</span>
            </div>
            <ul class="bullet-stack">
              ${(item.bullets || []).map((bullet) => `<li>${escapeHTML(bullet)}</li>`).join("")}
            </ul>
          </article>
        `
      )
      .join("");

    return `
      <section id="experience" class="page-section">
        <div class="section-intro">
          <span class="eyebrow">${escapeHTML(content.eyebrow)}</span>
          <h2>${escapeHTML(content.title)}</h2>
          <p>${escapeHTML(content.description)}</p>
        </div>
        <section class="section timeline-list">
          ${roles}
        </section>
      </section>
    `;
  };
})();
