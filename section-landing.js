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

  window.SiteSections.landing = function (content) {
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

    const cards = (content.highlights || [])
      .map(
        (item, index) => `
          <article class="view-card reveal-card accent-${(index % 3) + 1}">
            <div>
              <em>${escapeHTML(item.label)}</em>
              <h3>${escapeHTML(item.title)}</h3>
              <p>${escapeHTML(item.description)}</p>
            </div>
            <a class="card-link" href="${escapeHTML(item.href || "#")}">${escapeHTML(item.cta || "Open")}</a>
          </article>
        `
      )
      .join("");

    return `
      <section id="landing" class="page-section">
        <section class="hero">
          <div class="hero-copy">
            <span class="eyebrow">${escapeHTML(content.eyebrow)}</span>
            <h1>${escapeHTML(content.title)}</h1>
            <p>${escapeHTML(content.description)}</p>
            <div class="button-row">
              <a class="button primary" href="${escapeHTML(content.primaryHref || "#")}">${escapeHTML(content.primaryLabel)}</a>
              <a class="button secondary" href="${escapeHTML(content.secondaryHref || "#")}">${escapeHTML(content.secondaryLabel)}</a>
            </div>
            <div class="mini-stat-grid">${stats}</div>
          </div>

          <aside class="hero-side">
            <section class="panel">
              <div class="panel-title">
                <h3>Profile Snapshot</h3>
                <span class="muted">career focus</span>
              </div>
              <ul class="list-clean">
                <li>Computer Science Engineering graduate</li>
                <li>Interested in analyst and PMO-support roles</li>
                <li>Focused on reporting, coordination, and follow-through</li>
              </ul>
            </section>

            <section class="panel">
              <div class="panel-title">
                <h3>What Stands Out</h3>
                <span class="muted">${new Date().getFullYear()}</span>
              </div>
              <p>
                Academic projects, event coordination, and documentation-heavy responsibilities have shaped a practical, delivery-focused working style.
              </p>
            </section>
          </aside>
          <div class="hero-orbit" aria-hidden="true">
            <div class="orbit-chip">reporting</div>
            <div class="orbit-chip">coordination</div>
            <div class="orbit-chip">delivery support</div>
          </div>
        </section>

        <section class="section grid-3">
          ${cards}
        </section>
      </section>
    `;
  };
})();
