(function () {
  function updateProgress(bar) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    bar.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
  }

  function updateActiveSection(sectionLinks) {
    if (!sectionLinks.length) {
      return;
    }

    const anchorPoint = window.scrollY + window.innerHeight * 0.32;
    let currentId = sectionLinks[0].id;

    sectionLinks.forEach(function (item) {
      if (item.section.offsetTop <= anchorPoint) {
        currentId = item.id;
      }
    });

    sectionLinks.forEach(function (item) {
      item.link.classList.toggle("active", item.id === currentId);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.body.classList.contains("portfolio-page")) {
      return;
    }

    const progressBar = document.querySelector("[data-scroll-progress]");
    const nav = document.querySelector("[data-portfolio-nav]");
    const links = nav
      ? Array.from(nav.querySelectorAll('a[href^="#"]'))
      : [];

    const sectionLinks = links
      .map(function (link) {
        const id = link.getAttribute("href");
        const section = document.querySelector(id);
        return section ? { id, section, link } : null;
      })
      .filter(Boolean);

    function refresh() {
      if (progressBar) {
        updateProgress(progressBar);
      }
      updateActiveSection(sectionLinks);
    }

    window.addEventListener("scroll", refresh, { passive: true });
    window.addEventListener("resize", refresh);
    refresh();
  });
})();
