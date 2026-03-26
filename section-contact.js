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

  function normalizeUrl(raw) {
    const value = String(raw || "").trim();
    if (!value) {
      return "#";
    }
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }
    if (value.startsWith("www.")) {
      return `https://${value}`;
    }
    return value;
  }

  function linkifyText(text) {
    const source = String(text || "");
    const urlPattern = /(https?:\/\/[^\s|]+|www\.[^\s|]+)/g;
    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = urlPattern.exec(source)) !== null) {
      const [rawMatch] = match;
      result += escapeHTML(source.slice(lastIndex, match.index));
      const href = normalizeUrl(rawMatch);
      result += `<a href="${escapeHTML(href)}" target="_blank" rel="noreferrer">${escapeHTML(rawMatch)}</a>`;
      lastIndex = match.index + rawMatch.length;
    }

    result += escapeHTML(source.slice(lastIndex));
    return result;
  }

  function extractFirstUrl(text) {
    const source = String(text || "");
    const match = source.match(/(https?:\/\/[^\s|]+|www\.[^\s|]+)/);
    return match ? match[0] : "";
  }

  function renderCopyButton(value, label) {
    const copyValue = String(value || "").trim();
    if (!copyValue) {
      return "";
    }

    const buttonLabel = label || "Copy";
    return `
      <button
        class="link-copy"
        type="button"
        data-copy-value="${escapeHTML(copyValue)}"
        data-copy-label="${escapeHTML(buttonLabel)}"
        aria-label="${escapeHTML(buttonLabel)}"
      >${escapeHTML(buttonLabel)}</button>
    `;
  }

  function renderContactEntry(kind, rawValue) {
    const value = String(rawValue || "").trim();
    if (!value) {
      return "";
    }

    if (kind === "email") {
      return `
        <div class="contact-link-row">
          <a class="profile-link" href="mailto:${escapeHTML(value)}">${escapeHTML(value)}</a>
          ${renderCopyButton(value, "Copy Email")}
        </div>
      `;
    }

    if (kind === "phone") {
      const phoneHref = value.replace(/[^+\d]/g, "");
      return `
        <div class="contact-link-row">
          <a class="profile-link" href="tel:${escapeHTML(phoneHref)}">${escapeHTML(value)}</a>
          ${renderCopyButton(value, "Copy Phone")}
        </div>
      `;
    }

    if (kind === "location") {
      return `<div class="profile-link static">${escapeHTML(value)}</div>`;
    }

    if (kind === "url") {
      const href = normalizeUrl(value);
      return `
        <div class="contact-link-row">
          <a class="profile-link" href="${escapeHTML(href)}" target="_blank" rel="noreferrer">${escapeHTML(value)}</a>
          ${renderCopyButton(href, "Copy Link")}
        </div>
      `;
    }

    return "";
  }

  async function copyText(value) {
    if (!value) {
      return false;
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(value);
        return true;
      } catch (error) {
        // Continue to fallback copy.
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "readonly");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  }

  function bindCopyButtons() {
    if (window.__siteCopyButtonsBound) {
      return;
    }

    window.__siteCopyButtonsBound = true;
    document.addEventListener("click", async function (event) {
      const button = event.target.closest(".link-copy[data-copy-value]");
      if (!button) {
        return;
      }

      event.preventDefault();
      const value = button.getAttribute("data-copy-value") || "";
      const defaultLabel = button.getAttribute("data-copy-label") || "Copy";
      const copied = await copyText(value);

      button.textContent = copied ? "Copied" : "Retry";
      button.classList.toggle("copied", copied);

      window.clearTimeout(button.__copyTimer);
      button.__copyTimer = window.setTimeout(function () {
        button.textContent = defaultLabel;
        button.classList.remove("copied");
      }, 1400);
    });
  }

  bindCopyButtons();

  window.SiteSections.contact = function (content) {
    const notes = (content.notes || [])
      .map(function (item, index) {
        const noteUrl = normalizeUrl(extractFirstUrl(item.description || ""));
        const noteCopy = noteUrl && noteUrl !== "#"
          ? `<div class="note-actions">${renderCopyButton(noteUrl, "Copy Link")}</div>`
          : "";

        return `
          <article class="note-card reveal-card accent-${(index % 3) + 1}">
            <em>${escapeHTML(item.label)}</em>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${linkifyText(item.description)}</p>
            ${noteCopy}
          </article>
        `
      })
      .join("");

    return `
      <section id="contact" class="page-section">
        <div class="section-intro">
          <span class="eyebrow">${escapeHTML(content.eyebrow)}</span>
          <h2>${escapeHTML(content.title)}</h2>
          <p>${linkifyText(content.description)}</p>
        </div>
        <section class="section grid-2">
          <article class="contact-card reveal-card accent-1">
            <em>Contact</em>
            <h3>Dashami S</h3>
            <p>${escapeHTML(content.directNote || content.description || "")}</p>
            <div class="contact-stack">
              ${renderContactEntry("email", content.email)}
              ${renderContactEntry("phone", content.phone)}
              ${renderContactEntry("location", content.location)}
              ${renderContactEntry("url", content.linkedin)}
              ${renderContactEntry("url", content.github)}
            </div>
          </article>
          ${notes}
        </section>
      </section>
    `;
  };
})();
