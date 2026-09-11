/* NicoMach — shared navigation behavior
   Sidebar collapse, mobile menu, active-page highlight. No dependencies. */
(function(){
  "use strict";

  document.documentElement.classList.remove("no-js");

  var path = (location.pathname.split("/").pop() || "index.html");
  if (path === "") path = "index.html";

  function markActive(root){
    if(!root) return;
    var links = root.querySelectorAll("a[href]");
    links.forEach(function(a){
      var href = a.getAttribute("href").split("/").pop();
      if (href === path){
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }
    });
  }
  markActive(document.querySelector(".sidebar__nav"));
  markActive(document.querySelector(".mobile-panel nav"));

  /* ---- desktop sidebar collapse ---- */
  var sidebar = document.querySelector(".sidebar");
  var toggle = document.querySelector(".sidebar__toggle");
  if (sidebar && toggle){
    var stored = null;
    try { stored = window.localStorage.getItem("nicomach-sidebar"); } catch(e) {}
    if (stored === "collapsed"){
      sidebar.classList.add("is-collapsed");
      toggle.textContent = "»";
      toggle.setAttribute("aria-label","Expand sidebar");
    }
    toggle.addEventListener("click", function(){
      var collapsed = sidebar.classList.toggle("is-collapsed");
      toggle.textContent = collapsed ? "»" : "«";
      toggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
      try { window.localStorage.setItem("nicomach-sidebar", collapsed ? "collapsed" : "expanded"); } catch(e) {}
    });
  }

  /* ---- mobile menu ---- */
  var menuBtn = document.querySelector(".mobile-bar button");
  var panel = document.querySelector(".mobile-panel");
  var scrim = document.querySelector(".mobile-scrim");
  var closeBtn = document.querySelector(".mobile-panel__close");

  function openPanel(){
    if(!panel) return;
    panel.classList.add("is-open");
    if(scrim) scrim.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden";
    if(closeBtn) closeBtn.focus();
  }
  function closePanel(){
    if(!panel) return;
    panel.classList.remove("is-open");
    if(scrim) scrim.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
    menuBtn.focus();
  }
  if (menuBtn && panel){
    menuBtn.setAttribute("aria-expanded","false");
    menuBtn.setAttribute("aria-controls", panel.id || "mobile-nav-panel");
    menuBtn.addEventListener("click", function(){
      panel.classList.contains("is-open") ? closePanel() : openPanel();
    });
    if(closeBtn) closeBtn.addEventListener("click", closePanel);
    if(scrim) scrim.addEventListener("click", closePanel);
    panel.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", closePanel);
    });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel();
    });
  }
})();
