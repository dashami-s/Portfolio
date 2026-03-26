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

  window.SiteSections.about = function (content) {
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

    const softSkills = (content.softSkills || [])
      .map((item) => `<span class="skill-pill">${escapeHTML(item)}</span>`)
      .join("");

    const technicalGroups = (content.technicalGroups || [])
      .map(
        (group) => `
          <article class="skill-group-card">
            <strong>${escapeHTML(group.label)}</strong>
            <div class="tag-cloud">
              ${(group.items || []).map((item) => `<span class="skill-pill">${escapeHTML(item)}</span>`).join("")}
            </div>
          </article>
        `
      )
      .join("");

    return `
      <section id="about" class="page-section">
        <div class="section-intro">
          <span class="eyebrow">${escapeHTML(content.eyebrow)}</span>
          <h2>${escapeHTML(content.title)}</h2>
          <p>${escapeHTML(content.description)}</p>
        </div>
        <section class="section grid-3">
          ${cards}
        </section>
        <section id="skills" class="section grid-2">
          <article class="panel detail-panel reveal-card accent-1">
            <em>Education</em>
            <h3>${escapeHTML(content.education ? content.education.degree : "")}</h3>
            <p>${escapeHTML(content.education ? content.education.institution : "")}</p>
            <div class="meta-chip-row">
              <span class="meta-chip">${escapeHTML(content.education ? content.education.dates : "")}</span>
              <span class="meta-chip">${escapeHTML(content.education ? content.education.location : "")}</span>
            </div>
          </article>
          <article class="panel detail-panel reveal-card accent-2">
            <em>Soft Skills</em>
            <h3>Soft Skills</h3>
            <div class="tag-cloud">
              ${softSkills}
            </div>
          </article>
          <article class="panel detail-panel reveal-card accent-3 full-span">
            <em>Technical Skills</em>
            <h3>Technical Skills</h3>
            <div class="skill-group-grid">
              ${technicalGroups}
            </div>
          </article>
        </section>
      </section>
    `;
  };
})();
