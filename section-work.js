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

  window.SiteSections.work = function (content) {
    const cards = (content.gallery || [])
      .map((item) => {
        const imageBlock = item.image
          ? `<div class="gallery-image-wrap"><img class="gallery-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}"></div>`
          : "";
        const bulletBlock = item.bullets && item.bullets.length
          ? `
            <ul class="bullet-stack compact">
              ${item.bullets.map((bullet) => `<li>${escapeHTML(bullet)}</li>`).join("")}
            </ul>
          `
          : "";
        return `
          <article class="view-card gallery-card reveal-card">
            <div>
              <div class="project-meta">${escapeHTML(item.label)}</div>
              ${imageBlock}
              <h3>${escapeHTML(item.title)}</h3>
              <p>${escapeHTML(item.description)}</p>
              ${bulletBlock}
            </div>
          </article>
        `;
      })
      .join("");

    return `
      <section id="work" class="page-section">
        <div class="section-intro">
          <span class="eyebrow">${escapeHTML(content.eyebrow)}</span>
          <h2 id="projects">${escapeHTML(content.title)}</h2>
          <p>${escapeHTML(content.description)}</p>
        </div>
        <section class="section grid-2">
          ${cards}
        </section>
      </section>
    `;
  };
})();
