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

  function status(message) {
    $("admin-status").textContent = message;
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
              `${item.imageMeta.width}x${item.imageMeta.height} • ${item.imageMeta.format.replace("image/", "").toUpperCase()} • ${formatBytes(item.imageMeta.outputSize)}`;
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
    $("landing-eyebrow-input").addEventListener("input", (e) => (content.landing.eyebrow = e.target.value));
    $("landing-title-input").addEventListener("input", (e) => (content.landing.title = e.target.value));
    $("landing-description-input").addEventListener("input", (e) => (content.landing.description = e.target.value));
    $("landing-primary-label-input").addEventListener("input", (e) => (content.landing.primaryLabel = e.target.value));
    $("landing-primary-href-input").addEventListener("input", (e) => (content.landing.primaryHref = e.target.value));
    $("landing-secondary-label-input").addEventListener("input", (e) => (content.landing.secondaryLabel = e.target.value));
    $("landing-secondary-href-input").addEventListener("input", (e) => (content.landing.secondaryHref = e.target.value));

    $("about-eyebrow-input").addEventListener("input", (e) => (content.about.eyebrow = e.target.value));
    $("about-title-input").addEventListener("input", (e) => (content.about.title = e.target.value));
    $("about-description-input").addEventListener("input", (e) => (content.about.description = e.target.value));

    $("work-eyebrow-input").addEventListener("input", (e) => (content.work.eyebrow = e.target.value));
    $("work-title-input").addEventListener("input", (e) => (content.work.title = e.target.value));
    $("work-description-input").addEventListener("input", (e) => (content.work.description = e.target.value));

    $("contact-eyebrow-input").addEventListener("input", (e) => (content.contact.eyebrow = e.target.value));
    $("contact-title-input").addEventListener("input", (e) => (content.contact.title = e.target.value));
    $("contact-description-input").addEventListener("input", (e) => (content.contact.description = e.target.value));
    $("contact-email-input").addEventListener("input", (e) => (content.contact.email = e.target.value));
    $("contact-linkedin-input").addEventListener("input", (e) => (content.contact.linkedin = e.target.value));
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
  }

  function loadData() {
    content = window.SiteData.clone(window.SiteData.getContent());
    imageSettings = getImageSettings();
    fillSimpleFields();
    syncImageSettingsUI();
    renderLists();
    status("Loaded current saved content.");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!window.SiteData) {
      return;
    }

    loadData();
    bindSimpleFields();
    bindImageSettings();

    $("add-gallery-item").addEventListener("click", function () {
      content.work.gallery.push({
        label: `Case ${String(content.work.gallery.length + 1).padStart(2, "0")}`,
        title: "New Gallery Item",
        description: "Write a short explanation here.",
        image: "",
        imageMeta: null
      });
      renderLists();
      status("New gallery item added.");
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
