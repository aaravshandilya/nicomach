/* NicoMach — interactive demonstration page controller
   Sonoran Precision Components · Mesa Industrial Coatings · Copper State Assembly */
(function(){
  "use strict";
  var root = document.getElementById("demo-root");
  if (!root) return;

  var runBtn = root.querySelector("#dm-run");
  var resetBtn = root.querySelector("#dm-reset");
  var viewBtns = Array.prototype.slice.call(root.querySelectorAll(".segmented button"));
  var panel = root.querySelector(".diagram-panel");
  var cards = Array.prototype.slice.call(root.querySelectorAll(".inv-card"));
  var grossOriginal = root.querySelector("#dm-gross-original");
  var grossOptimized = root.querySelector("#dm-gross-optimized");
  var paymentCount = root.querySelector("#dm-payment-count");
  var reduction = root.querySelector("#dm-reduction");
  var approvalBadge = root.querySelector("#dm-approval");
  var auditList = root.querySelector("#dm-audit");
  var viewAuditBtn = root.querySelector("#dm-view-audit");
  var statusLine = root.querySelector("#dm-status");

  var origEdges = ["spc-mic","mic-csa","csa-spc"];
  var optEdges = ["mic-spc-opt","mic-csa-opt"];
  var hasRun = false;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];
  function after(ms, fn){ timers.push(setTimeout(fn, reduced ? 0 : ms)); }
  function clearTimers(){ timers.forEach(clearTimeout); timers = []; }

  function timeNow(){
    return new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", second:"2-digit"});
  }
  function logEntry(text){
    var li = document.createElement("li");
    var t = document.createElement("time"); t.textContent = timeNow();
    var e = document.createElement("span"); e.className = "evt"; e.textContent = text;
    li.appendChild(t); li.appendChild(e);
    auditList.appendChild(li);
    auditList.scrollTop = auditList.scrollHeight;
  }

  function setView(view){
    panel.setAttribute("data-view", view);
    viewBtns.forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.view === view ? "true" : "false"); });
  }

  viewBtns.forEach(function(b){
    b.addEventListener("click", function(){ setView(b.dataset.view); });
  });

  /* ---- inspect invoices via edge hit-areas and card buttons ---- */
  function inspect(edgeId){
    root.querySelectorAll(".edge-group").forEach(function(g){ g.classList.remove("is-focused"); });
    cards.forEach(function(c){ c.classList.remove("is-inspected"); });
    var group = root.querySelector('[data-edge="' + edgeId + '"]');
    if (group) group.classList.add("is-focused");
    var card = root.querySelector('.inv-card[data-edge="' + edgeId + '"]');
    if (card) card.classList.add("is-inspected");
  }
  root.querySelectorAll(".flow-hit").forEach(function(hit){
    var edgeId = hit.closest(".edge-group").dataset.edge;
    hit.addEventListener("mouseenter", function(){ inspect(edgeId); });
    hit.addEventListener("focus", function(){ inspect(edgeId); });
    hit.addEventListener("keydown", function(e){
      if (e.key === "Enter" || e.key === " "){ e.preventDefault(); inspect(edgeId); }
    });
  });
  cards.forEach(function(card){
    card.addEventListener("mouseenter", function(){ inspect(card.dataset.edge); });
    var whyBtn = card.querySelector(".inv-card__why");
    var detail = card.querySelector(".inv-card__detail");
    if (whyBtn && detail){
      whyBtn.addEventListener("click", function(){
        var open = detail.classList.toggle("is-open");
        whyBtn.setAttribute("aria-expanded", open ? "true" : "false");
        inspect(card.dataset.edge);
      });
    }
  });

  if (viewAuditBtn){
    viewAuditBtn.addEventListener("click", function(){
      auditList.closest(".card").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  }

  /* ---- run / reset ---- */
  function tokenTravel(edgeId){
    var g = root.querySelector('.edge-group[data-edge="' + edgeId + '"]');
    if (!g) return;
    var token = g.querySelector(".token");
    if (!token) return;
    var end = g.dataset.end.split(",");
    token.classList.add("is-moving");
    token.style.transform = "translate(" + end[0] + "px," + end[1] + "px)";
  }

  function run(){
    if (hasRun) return;
    runBtn.setAttribute("disabled","disabled");
    statusLine.textContent = "";
    logEntry("Dataset loaded — 3 invoices, $66,450.00 gross obligation");

    after(450, function(){
      logEntry("Duplicate check passed — 0 duplicates found");
    });

    after(950, function(){
      origEdges.forEach(function(id){ tokenTravel(id); });
      logEntry("Eligibility rules applied — 3 of 3 invoices eligible");
    });

    after(2000, function(){
      cards.forEach(function(c){
        var b = c.querySelector(".badge--eligibility");
        if (b){ b.className = "badge badge--gold badge--eligibility"; b.textContent = "Included"; }
      });
      logEntry("Net positions calculated — sum verified at $0.00");
    });

    after(2800, function(){
      setView("optimized");
      optEdges.forEach(function(id){ tokenTravel(id); });
      grossOptimized.textContent = "$7,750.00";
      paymentCount.textContent = "3 → 2";
      reduction.textContent = "88.3%";
      statusLine.textContent = "Recommendation: 2 payments replace 3 original obligations.";
      logEntry("Optimization completed — 3 payments reduced to 2");
    });

    after(3500, function(){
      approvalBadge.className = "badge badge--pending";
      approvalBadge.textContent = "Pending participant approval";
      logEntry("Reconciliation passed — optimized positions match original");
    });

    after(4100, function(){
      logEntry("Recommendation generated — evidence package ready");
      hasRun = true;
      resetBtn.removeAttribute("disabled");
    });
  }

  function reset(){
    clearTimers();
    hasRun = false;
    runBtn.removeAttribute("disabled");
    resetBtn.setAttribute("disabled","disabled");
    statusLine.textContent = "";
    auditList.innerHTML = "";
    grossOptimized.textContent = "$66,450.00";
    paymentCount.textContent = "3 → 3";
    reduction.textContent = "0%";
    approvalBadge.className = "badge badge--pending";
    approvalBadge.textContent = "Not yet generated";
    setView("original");
    root.querySelectorAll(".edge-group").forEach(function(g){ g.classList.remove("is-focused"); });
    cards.forEach(function(c){
      c.classList.remove("is-inspected");
      var b = c.querySelector(".badge--eligibility");
      if (b){ b.className = "badge badge--pending badge--eligibility"; b.textContent = "Pending"; }
      var detail = c.querySelector(".inv-card__detail");
      var whyBtn = c.querySelector(".inv-card__why");
      if (detail) detail.classList.remove("is-open");
      if (whyBtn) whyBtn.setAttribute("aria-expanded","false");
    });
    root.querySelectorAll(".token").forEach(function(t){
      t.classList.remove("is-moving");
      var g = t.closest(".edge-group");
      var start = g ? g.dataset.start.split(",") : ["0","0"];
      t.style.transform = "translate(" + start[0] + "px," + start[1] + "px)";
    });
  }

  reset();
  if (runBtn) runBtn.addEventListener("click", run);
  if (resetBtn) resetBtn.addEventListener("click", reset);
})();
