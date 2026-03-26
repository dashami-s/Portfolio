(function () {
  const $ = (id) => document.getElementById(id);
  const IMAGE_SETTINGS_KEY = "dashami_image_optimizer_v1";

  const defaultImageSettings = {
    maxWidth: 1600,
    maxHeight: 1200,
    quality: 82,
    format: "image/jpeg"
  };

  let content;
  let imageSettings;
  let currentPreviewMode = "landing";
  let previewQueued = false;

  function status(message) {
    $("admin-status").textContent = message;
  }

  function escapeHTML(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getImageSettings() {
    try {
      const raw = localStorage.getItem(IMAGE_SETTINGS_KEY);
      if (!raw) {
        return { ...defaultImageSettings };
      }
      return { ...defaultImageSettings, ...JSON.parse(raw) };
    } catch (error) {
      return { ...defaultImageSettings };
    }
  }

  function saveImageSettings() {
    localStorage.setItem(IMAGE_SETTINGS_KEY, JSON.stringify(imageSettings));
  }

  function formatBytes(bytes) {
    if (!bytes) {
      return "0 KB";
    }
    const units = ["B", "KB", "MB"];
    let value = bytes;
    let unit = units[0];
    for (let i = 0; i < units.length; i += 1) {
      unit = units[i];
      if (value < 1024 || i === units.length - 1) {
        break;
      }
      value /= 1024;
    }
    return `${value.toFixed(value >= 100 ? 0 : 1)} ${unit}`;
  }

  function estimateStorageSize(data) {
    return new Blob([JSON.stringify(data)]).size;
  }

  function updateAdminStats() {
    const stats = [
      { value: String(content.about.cards.length).padStart(2, "0"), label: "About cards" },
      { value: String(content.work.gallery.length).padStart(2, "0"), label: "Gallery items" },
      { value: formatBytes(estimateStorageSize(content)), label: "Stored data" }
    ];

    $("admin-stats").innerHTML = stats
      .map(
        (item) => `
          <div class="mini-stat">
            <strong>${item.value}</strong>
            <span>${item.label}</span>
          </div>
        `
      )
      .join("");
  }

  function renderStatGrid(items) {
    return (items || [])
      .map(
        (item) => `
          <div class="mini-stat">
            <strong>${escapeHTML(item.value)}</strong>
            <span>${escapeHTML(item.label)}</span>
          </div>
        `
      )
      .join("");
  }

  function renderLandingPreview() {
    const landing = content.landing;
    const profilePanel = landing.profilePanel || {};
    const contactPanel = landing.contactPanel || {};
    const profileLines = (profilePanel.lines || [])
      .map((item) => `<li>${escapeHTML(item)}</li>`)
      .join("");
    const chips = (landing.chips || [])
      .map((item) => `<div class="orbit-chip">${escapeHTML(item)}</div>`)
      .join("");
    return `
      <div class="preview-site preview-site-landing">
        <div class="page-shell preview-page-shell">
          <header class="topbar preview-topbar">
            <div class="brand">
              <div class="brand-mark">DS</div>
              <div class="brand-copy">
                <strong>Dashami S</strong>
                <span>B.Tech CSE Student</span>
              </div>
            </div>
            <div class="topbar-actions">
              <nav class="nav" aria-label="Preview navigation">
                <a class="active" href="#">Home</a>
                <a href="#">Portfolio</a>
              </nav>
            </div>
          </header>
          <main>
            <section class="hero">
              <div class="hero-copy">
                <span class="eyebrow">${escapeHTML(landing.eyebrow)}</span>
                <h1>${escapeHTML(landing.title)}</h1>
                <p>${escapeHTML(landing.description)}</p>
                <div class="button-row">
                  <a class="button primary" href="#">${escapeHTML(landing.primaryLabel)}</a>
                  <a class="button secondary" href="#">${escapeHTML(landing.secondaryLabel)}</a>
                </div>
                <div class="mini-stat-grid">${renderStatGrid(landing.stats)}</div>
              </div>
              <aside class="hero-side">
                <section class="panel">
                  <div class="panel-title">
                    <h3>${escapeHTML(profilePanel.title)}</h3>
                    <span class="muted">${escapeHTML(profilePanel.meta)}</span>
                  </div>
                  <ul class="list-clean">${profileLines}</ul>
                </section>
                <section class="panel">
                  <div class="panel-title">
                    <h3>${escapeHTML(contactPanel.title)}</h3>
                    <span class="muted">${escapeHTML(contactPanel.meta)}</span>
                  </div>
                  <p>${escapeHTML(contactPanel.description)}</p>
                </section>
              </aside>
              <div class="hero-orbit" aria-hidden="true">${chips}</div>
            </section>
            <section class="section grid-3">
              ${(landing.highlights || [])
                .map(
                  (item, index) => `
                    <article class="view-card reveal-card accent-${(index % 3) + 1}">
                      <div>
                        <em>${escapeHTML(item.label)}</em>
                        <h3>${escapeHTML(item.title)}</h3>
                        <p>${escapeHTML(item.description)}</p>
                      </div>
                      <a class="card-link" href="#">${escapeHTML(item.cta)}</a>
                    </article>
                  `
                )
                .join("")}
            </section>
            <section class="moving-line" aria-hidden="true">
              <div class="moving-line-track">
                <span class="moving-pill">Python</span>
                <span class="moving-pill">Power BI</span>
                <span class="moving-pill">Project coordination</span>
                <span class="moving-pill">Documentation</span>
                <span class="moving-pill">Cross-functional collaboration</span>
                <span class="moving-pill">Python</span>
                <span class="moving-pill">Power BI</span>
                <span class="moving-pill">Project coordination</span>
                <span class="moving-pill">Documentation</span>
                <span class="moving-pill">Cross-functional collaboration</span>
              </div>
            </section>
          </main>
          <footer class="footer">Dashami S portfolio focused on coordination, reporting, and delivery support.</footer>
        </div>
      </div>
    `;
  }

  function renderPortfolioPreview() {
    const sections = [
      window.SiteSections.landing(content.landing),
      window.SiteSections.about(content.about),
      window.SiteSections.experience(content.experience),
      window.SiteSections.work(content.work),
      window.SiteSections.recognition(content.recognition),
      window.SiteSections.contact(content.contact)
    ].join("");

    return `
      <div class="preview-site preview-site-portfolio portfolio-page">
        <div class="page-shell preview-page-shell">
          <header class="topbar preview-topbar">
            <div class="brand">
              <div class="brand-mark">DS</div>
              <div class="brand-copy">
                <strong>Dashami S</strong>
                <span>B.Tech CSE Student</span>
              </div>
            </div>
            <div class="topbar-actions">
              <nav class="nav" aria-label="Preview navigation">
                <a href="#">Home</a>
                <a class="active" href="#">Portfolio</a>
                <a href="#">Intro</a>
                <a href="#">About</a>
                <a href="#">Skills</a>
                <a href="#">Experience</a>
                <a href="#">Projects</a>
                <a href="#">Recognition</a>
                <a href="#">Contact</a>
              </nav>
            </div>
          </header>
          <main>
            <div class="section-stack">
              ${sections}
            </div>
          </main>
          <footer class="footer">Portfolio of Dashami S featuring objective, skills, experience, projects, and achievements.</footer>
        </div>
      </div>
    `;
  }

  function renderPreview() {
    const canvas = $("admin-preview-canvas");
    if (!canvas || !window.SiteSections) {
      return;
    }

    canvas.innerHTML = currentPreviewMode === "portfolio"
      ? renderPortfolioPreview()
      : renderLandingPreview();

    document.querySelectorAll("[data-preview-mode]").forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-preview-mode") === currentPreviewMode);
    });
  }

  function queuePreviewRender() {
    if (previewQueued) {
      return;
    }

    previewQueued = true;
    requestAnimationFrame(function () {
      previewQueued = false;
      renderPreview();
    });
  }

  function syncImageSettingsUI() {
    $("image-max-width").value = imageSettings.maxWidth;
    $("image-max-height").value = imageSettings.maxHeight;
    $("image-quality").value = imageSettings.quality;
    $("image-quality-value").textContent = `${imageSettings.quality}%`;
    $("image-format").value = imageSettings.format;
    $("optimizer-mode-label").textContent = `${imageSettings.maxWidth}w / ${imageSettings.quality}%`;
  }

  function bindImageSettings() {
    $("image-max-width").addEventListener("input", function (e) {
      imageSettings.maxWidth = Number(e.target.value) || defaultImageSettings.maxWidth;
      syncImageSettingsUI();
      saveImageSettings();
    });

    $("image-max-height").addEventListener("input", function (e) {
      imageSettings.maxHeight = Number(e.target.value) || defaultImageSettings.maxHeight;
      syncImageSettingsUI();
      saveImageSettings();
    });

    $("image-quality").addEventListener("input", function (e) {
      imageSettings.quality = Number(e.target.value) || defaultImageSettings.quality;
      syncImageSettingsUI();
      saveImageSettings();
    });

    $("image-format").addEventListener("change", function (e) {
      imageSettings.format = e.target.value;
      syncImageSettingsUI();
      saveImageSettings();
    });
  }

  function readFileAsDataURL(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function loadImage(source) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.onload = function () {
        resolve(image);
      };
      image.onerror = reject;
      image.src = source;
    });
  }

  async function processImageForWeb(file) {
    const source = await readFileAsDataURL(file);
    const image = await loadImage(source);

    const ratio = Math.min(
      1,
      imageSettings.maxWidth / image.width,
      imageSettings.maxHeight / image.height
    );

    const width = Math.max(1, Math.round(image.width * ratio));
    const height = Math.max(1, Math.round(image.height * ratio));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, width, height);

    const quality = imageSettings.quality / 100;
    const output = canvas.toDataURL(imageSettings.format, quality);

    return {
      dataUrl: output,
      width,
      height,
      originalWidth: image.width,
      originalHeight: image.height,
      originalSize: file.size,
      outputSize: Math.round((output.length * 3) / 4)
    };
  }

  function createField(labelText, value, onInput, tagName) {
    const field = document.createElement("div");
    field.className = "field";

    const label = document.createElement("label");
    label.textContent = labelText;

    const input = document.createElement(tagName || "input");
    if (input.tagName === "INPUT") {
      input.type = "text";
    }
    input.value = value || "";
    input.addEventListener("input", function () {
      onInput(input.value);
      queuePreviewRender();
    });

    field.append(label, input);
    return field;
  }

  function renderRepeatingCards(containerId, items, config) {
    const container = $(containerId);
    container.innerHTML = "";

    items.forEach(function (item, index) {
      const editor = document.createElement("div");
      editor.className = "item-editor";

      const head = document.createElement("div");
      head.className = "item-editor-head";

      const title = document.createElement("strong");
      title.textContent = `${config.itemLabel} ${index + 1}`;

      const remove = document.createElement("button");
      remove.className = "button danger";
      remove.type = "button";
      remove.textContent = "Delete";
      remove.addEventListener("click", function () {
        items.splice(index, 1);
        config.onChange();
      });

      head.append(title, remove);
      editor.append(head);

      config.fields.forEach(function (fieldConfig) {
        editor.append(
          createField(
            fieldConfig.label,
            item[fieldConfig.key],
            function (value) {
              item[fieldConfig.key] = value;
            },
            fieldConfig.multiline ? "textarea" : "input"
          )
        );
      });

      if (config.imageField) {
        const uploadField = document.createElement("div");
        uploadField.className = "field";

        const uploadLabel = document.createElement("label");
        uploadLabel.textContent = "Image";

        const upload = document.createElement("input");
        upload.type = "file";
        upload.accept = "image/*";
        upload.addEventListener("change", async function () {
          const file = upload.files && upload.files[0];
          if (!file) {
            return;
          }

          status(`Processing ${file.name} for web use...`);

          try {
            const processed = await processImageForWeb(file);
            item[config.imageField] = processed.dataUrl;
            item.imageMeta = {
              width: processed.width,
              height: processed.height,
              format: imageSettings.format,
              originalWidth: processed.originalWidth,
              originalHeight: processed.originalHeight,
              originalSize: processed.originalSize,
              outputSize: processed.outputSize
            };
            config.onChange();
            status(
              `Image optimized to ${processed.width}x${processed.height} and reduced from ${formatBytes(processed.originalSize)} to about ${formatBytes(processed.outputSize)}.`
            );
          } catch (error) {
            console.error(error);
            status("Image processing failed. Please try another file.");
          }
        });

        uploadField.append(uploadLabel, upload);
        editor.append(uploadField);

        if (item[config.imageField]) {
          const imageWrap = document.createElement("div");
          imageWrap.className = "gallery-image-wrap";

          const image = document.createElement("img");
          image.className = "gallery-image";
          image.src = item[config.imageField];
          image.alt = item.title || "Gallery image";

          imageWrap.append(image);
          editor.append(imageWrap);

          if (item.imageMeta) {
            const meta = document.createElement("p");
            meta.className = "admin-note";
            meta.textContent =
              `${item.imageMeta.width}x${item.imageMeta.height} - ${item.imageMeta.format.replace("image/", "").toUpperCase()} - ${formatBytes(item.imageMeta.outputSize)}`;
            editor.append(meta);
          }

          const clearImage = document.createElement("button");
          clearImage.type = "button";
          clearImage.className = "button ghost";
          clearImage.textContent = "Remove Image";
          clearImage.addEventListener("click", function () {
            item[config.imageField] = "";
            item.imageMeta = null;
            config.onChange();
          });
          editor.append(clearImage);
        }
      }

      container.append(editor);
    });
  }

  function fillSimpleFields() {
    $("landing-eyebrow-input").value = content.landing.eyebrow;
    $("landing-title-input").value = content.landing.title;
    $("landing-description-input").value = content.landing.description;
    $("landing-primary-label-input").value = content.landing.primaryLabel;
    $("landing-primary-href-input").value = content.landing.primaryHref;
    $("landing-secondary-label-input").value = content.landing.secondaryLabel;
    $("landing-secondary-href-input").value = content.landing.secondaryHref;

    $("about-eyebrow-input").value = content.about.eyebrow;
    $("about-title-input").value = content.about.title;
    $("about-description-input").value = content.about.description;

    $("work-eyebrow-input").value = content.work.eyebrow;
    $("work-title-input").value = content.work.title;
    $("work-description-input").value = content.work.description;

    $("contact-eyebrow-input").value = content.contact.eyebrow;
    $("contact-title-input").value = content.contact.title;
    $("contact-description-input").value = content.contact.description;
    $("contact-email-input").value = content.contact.email;
    $("contact-linkedin-input").value = content.contact.linkedin;
  }

  function bindSimpleFields() {
    function bind(id, setter) {
      $(id).addEventListener("input", function (e) {
        setter(e.target.value);
        queuePreviewRender();
      });
    }

    bind("landing-eyebrow-input", (value) => (content.landing.eyebrow = value));
    bind("landing-title-input", (value) => (content.landing.title = value));
    bind("landing-description-input", (value) => (content.landing.description = value));
    bind("landing-primary-label-input", (value) => (content.landing.primaryLabel = value));
    bind("landing-primary-href-input", (value) => (content.landing.primaryHref = value));
    bind("landing-secondary-label-input", (value) => (content.landing.secondaryLabel = value));
    bind("landing-secondary-href-input", (value) => (content.landing.secondaryHref = value));

    bind("about-eyebrow-input", (value) => (content.about.eyebrow = value));
    bind("about-title-input", (value) => (content.about.title = value));
    bind("about-description-input", (value) => (content.about.description = value));

    bind("work-eyebrow-input", (value) => (content.work.eyebrow = value));
    bind("work-title-input", (value) => (content.work.title = value));
    bind("work-description-input", (value) => (content.work.description = value));

    bind("contact-eyebrow-input", (value) => (content.contact.eyebrow = value));
    bind("contact-title-input", (value) => (content.contact.title = value));
    bind("contact-description-input", (value) => (content.contact.description = value));
    bind("contact-email-input", (value) => (content.contact.email = value));
    bind("contact-linkedin-input", (value) => (content.contact.linkedin = value));
  }

  function renderLists() {
    renderRepeatingCards("about-cards-admin", content.about.cards, {
      itemLabel: "About Card",
      fields: [
        { key: "label", label: "Label" },
        { key: "title", label: "Title" },
        { key: "description", label: "Description", multiline: true }
      ],
      onChange: renderLists
    });

    renderRepeatingCards("gallery-admin", content.work.gallery, {
      itemLabel: "Gallery Item",
      imageField: "image",
      fields: [
        { key: "label", label: "Label" },
        { key: "title", label: "Title" },
        { key: "description", label: "Explanation", multiline: true }
      ],
      onChange: renderLists
    });

    renderRepeatingCards("contact-notes-admin", content.contact.notes, {
      itemLabel: "Contact Note",
      fields: [
        { key: "label", label: "Label" },
        { key: "title", label: "Title" },
        { key: "description", label: "Description", multiline: true }
      ],
      onChange: renderLists
    });

    updateAdminStats();
    queuePreviewRender();
  }

  function loadData() {
    content = window.SiteData.clone(window.SiteData.getContent());
    imageSettings = getImageSettings();
    fillSimpleFields();
    syncImageSettingsUI();
    renderLists();
    renderPreview();
    status("Loaded current saved content.");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.SiteData) {
      return;
    }

    loadData();
    bindSimpleFields();
    bindImageSettings();

    document.querySelectorAll("[data-preview-mode]").forEach(function (button) {
      button.addEventListener("click", function () {
        currentPreviewMode = button.getAttribute("data-preview-mode");
        renderPreview();
      });
    });

    $("add-gallery-item").addEventListener("click", function () {
      content.work.gallery.push({
        label: "",
        title: "",
        description: "",
        image: "",
        imageMeta: null
      });
      renderLists();
      status("New project entry added. Fill in the real date, title, and description.");
    });

    $("save-all").addEventListener("click", function () {
      window.SiteData.saveContent(content);
      status("Saved. Refresh any public page to see the latest content.");
    });

    $("save-all-hero").addEventListener("click", function () {
      window.SiteData.saveContent(content);
      status("Saved. Refresh any public page to see the latest content.");
    });

    $("reload-all").addEventListener("click", function () {
      loadData();
    });

    $("reload-all-hero").addEventListener("click", function () {
      loadData();
    });

    $("reset-all").addEventListener("click", function () {
      content = window.SiteData.resetContent();
      imageSettings = { ...defaultImageSettings };
      saveImageSettings();
      fillSimpleFields();
      syncImageSettingsUI();
      renderLists();
      status("Reset to default content.");
    });
  });
})();
