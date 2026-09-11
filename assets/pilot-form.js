/* NicoMach — pilot request form
   Client-side validation only. This static demonstration has no backend:
   no data is transmitted or stored when the form is submitted. */
(function(){
  "use strict";
  var form = document.getElementById("pilot-form");
  if (!form) return;
  var success = document.getElementById("pilot-success");

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function fieldOf(input){ return input.closest(".field"); }
  function showError(input, msg){
    var field = fieldOf(input);
    field.classList.add("has-error");
    var err = field.querySelector(".err");
    if (err) err.textContent = msg;
    input.setAttribute("aria-invalid","true");
  }
  function clearError(input){
    var field = fieldOf(input);
    field.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
  }

  function validate(){
    var ok = true;
    var required = form.querySelectorAll("[required]");
    required.forEach(function(input){
      var val = (input.value || "").trim();
      if (!val){
        showError(input, "This field is required.");
        ok = false;
      } else if (input.type === "email" && !emailRe.test(val)){
        showError(input, "Enter a valid work email address.");
        ok = false;
      } else {
        clearError(input);
      }
    });
    return ok;
  }

  form.querySelectorAll("input, select, textarea").forEach(function(input){
    input.addEventListener("blur", function(){
      var val = (input.value || "").trim();
      if (input.hasAttribute("required") && !val){
        showError(input, "This field is required.");
      } else if (input.type === "email" && val && !emailRe.test(val)){
        showError(input, "Enter a valid work email address.");
      } else {
        clearError(input);
      }
    });
  });

  form.addEventListener("submit", function(e){
    e.preventDefault();
    if (!validate()){
      var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }
    form.setAttribute("hidden","hidden");
    success.classList.add("is-shown");
    success.setAttribute("tabindex","-1");
    success.focus();
  });
})();
