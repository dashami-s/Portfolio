(function () {
  document.addEventListener("DOMContentLoaded", function () {
    if (!window.SiteData || !window.SiteSections) {
      return;
    }

    const content = window.SiteData.getContent();
    const target = document.getElementById("merged-sections");
    if (!target) {
      return;
    }

    target.innerHTML = [
      window.SiteSections.landing(content.landing),
      window.SiteSections.about(content.about),
      window.SiteSections.experience(content.experience),
      window.SiteSections.work(content.work),
      window.SiteSections.recognition(content.recognition),
      window.SiteSections.contact(content.contact)
    ].join("");
  });
})();
