/* NicoMach — homepage worked-example animation
   Three obligations, sixty dollars moved, zero-dollar net position. */
(function(){
  "use strict";
  var root = document.getElementById("worked-example");
  if (!root) return;

  var runBtn = root.querySelector("#we-run");
  var resetBtn = root.querySelector("#we-reset");
  var invoices = Array.prototype.slice.call(root.querySelectorAll(".we-invoice"));
  var paths = {
    ab: root.querySelector("#we-path-ab"),
    bc: root.querySelector("#we-path-bc"),
    ca: root.querySelector("#we-path-ca")
  };
  var tokens = {
    ab: root.querySelector("#we-token-ab"),
    bc: root.querySelector("#we-token-bc"),
    ca: root.querySelector("#we-token-ca")
  };
  var nodes = Array.prototype.slice.call(root.querySelectorAll(".diagram .node"));
  var centerLabel = root.querySelector("#we-center-label");
  var grossValue = root.querySelector("#we-gross-value");
  var auditList = root.querySelector("#we-audit");
  var statusLine = root.querySelector("#we-status");

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timers = [];
  function after(ms, fn){ timers.push(setTimeout(fn, reduced ? 0 : ms)); }
  function clearTimers(){ timers.forEach(clearTimeout); timers = []; }

  function timeNow(){
    var d = new Date();
    return d.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", second:"2-digit"});
  }
  function logEntry(text){
    var li = document.createElement("li");
    var t = document.createElement("time");
    t.textContent = timeNow();
    var e = document.createElement("span");
    e.className = "evt";
    e.textContent = text;
    li.appendChild(t); li.appendChild(e);
    auditList.appendChild(li);
  }

  function animateGross(from, to, ms){
    if (reduced){ grossValue.textContent = "$" + to; return; }
    var start = null;
    function step(ts){
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / ms);
      var val = Math.round(from + (to - from) * p);
      grossValue.textContent = "$" + val.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function run(){
    runBtn.setAttribute("disabled", "disabled");
    statusLine.textContent = "";
    logEntry("Dataset loaded — 3 invoices, $60 gross obligation");

    after(500, function(){
      tokens.ab.classList.add("is-moving");
      tokens.bc.classList.add("is-moving");
      tokens.ca.classList.add("is-moving");
      tokens.ab.style.transform = "translate(280px,210px)";
      tokens.bc.style.transform = "translate(40px,210px)";
      tokens.ca.style.transform = "translate(160px,40px)";
      logEntry("Evaluating payment paths A → B → C → A");
    });

    after(1600, function(){
      nodes.forEach(function(n){ n.classList.add("is-active"); });
      paths.ab.classList.add("is-cycle");
      paths.bc.classList.add("is-cycle");
      paths.ca.classList.add("is-cycle");
      logEntry("Circular obligation identified: A → B → C → A");
    });

    after(2500, function(){
      invoices.forEach(function(card){
        card.classList.add("is-included");
        var badge = card.querySelector(".badge");
        badge.className = "badge badge--gold";
        badge.textContent = "Included";
      });
      logEntry("Eligibility confirmed — 3 of 3 invoices included");
    });

    after(3300, function(){
      paths.ab.classList.remove("is-cycle"); paths.ab.classList.add("is-settled");
      paths.bc.classList.remove("is-cycle"); paths.bc.classList.add("is-settled");
      paths.ca.classList.remove("is-cycle"); paths.ca.classList.add("is-settled");
      tokens.ab.style.opacity = "0"; tokens.bc.style.opacity = "0"; tokens.ca.style.opacity = "0";
      centerLabel.classList.add("is-shown");
      statusLine.textContent = "No external payment required.";
      animateGross(60, 0, reduced ? 1 : 700);
      logEntry("Net positions calculated — A: $0, B: $0, C: $0");
    });

    after(4200, function(){
      logEntry("Optimization completed — recommendation generated");
      resetBtn.removeAttribute("disabled");
    });
  }

  function reset(){
    clearTimers();
    runBtn.removeAttribute("disabled");
    resetBtn.setAttribute("disabled", "disabled");
    statusLine.textContent = "";
    auditList.innerHTML = "";
    grossValue.textContent = "$60";
    centerLabel.classList.remove("is-shown");
    nodes.forEach(function(n){ n.classList.remove("is-active"); });
    Object.keys(paths).forEach(function(k){
      paths[k].classList.remove("is-cycle","is-settled");
    });
    var starts = {
      ab: "translate(160px,40px)",
      bc: "translate(280px,210px)",
      ca: "translate(40px,210px)"
    };
    Object.keys(tokens).forEach(function(k){
      tokens[k].classList.remove("is-moving");
      tokens[k].style.opacity = "";
      tokens[k].style.transform = starts[k];
    });
    invoices.forEach(function(card){
      card.classList.remove("is-included");
      var badge = card.querySelector(".badge");
      badge.className = "badge badge--pending";
      badge.textContent = "Pending";
    });
  }

  reset();
  if (runBtn) runBtn.addEventListener("click", run);
  if (resetBtn) resetBtn.addEventListener("click", reset);
})();
