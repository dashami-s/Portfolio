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

  function renderBlocks(items, type) {
    return (items || [])
      .map(
        (item) => `
          <article class="list-block">
            <div class="list-block-top">
              <strong>${escapeHTML(item.title || item.name || "")}</strong>
              ${item.date ? `<span class="meta-chip">${escapeHTML(item.date)}</span>` : ""}
            </div>
            ${type === "language"
              ? `<p>${escapeHTML(item.level || "")}</p>`
              : `<p>${escapeHTML(item.description || "")}</p>`}
          </article>
        `
      )
      .join("");
  }

  window.SiteSections.recognition = function (content) {
    const certifications = (content.certifications || [])
      .map((item) => `<li>${escapeHTML(item)}</li>`)
      .join("");

    return `
      <section id="recognition" class="page-section">
        <div class="section-intro">
          <span class="eyebrow">${escapeHTML(content.eyebrow)}</span>
          <h2>${escapeHTML(content.title)}</h2>
          <p>${escapeHTML(content.description)}</p>
        </div>
        <section class="section grid-2">
          <article class="panel detail-panel reveal-card accent-1">
            <em>Certifications</em>
            <h3>Certifications</h3>
            <ul class="bullet-stack compact">
              ${certifications}
            </ul>
          </article>
          <article class="panel detail-panel reveal-card accent-2">
            <em>Achievements</em>
            <h3>Achievements</h3>
            <div class="list-blocks">
              ${renderBlocks(content.achievements)}
            </div>
          </article>
          <article class="panel detail-panel reveal-card accent-3">
            <em>Organizations</em>
            <h3>Organizations</h3>
            <div class="list-blocks">
              ${renderBlocks(content.organizations)}
            </div>
          </article>
          <article class="panel detail-panel reveal-card accent-1">
            <em>Languages</em>
            <h3>Languages</h3>
            <div class="list-blocks">
              ${renderBlocks(content.languages, "language")}
            </div>
          </article>
        </section>
      </section>
    `;
  };
})();
