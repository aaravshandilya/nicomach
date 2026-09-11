(function(){
  var sidebar = document.querySelector('.sidebar');
  var content = document.querySelector('.content');
  var collapseBtn = document.querySelector('.sidebar__toggle');
  var mobileBtn = document.querySelector('.mobile-bar button');

  function isMobile(){ return window.matchMedia('(max-width: 860px)').matches; }

  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      sidebar.classList.toggle('is-collapsed');
      if (content) content.classList.toggle('is-collapsed');
      collapseBtn.textContent = sidebar.classList.contains('is-collapsed') ? '»' : '«';
    });
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', function () {
      sidebar.classList.toggle('is-open');
    });
  }

  document.addEventListener('click', function (e) {
    if (!isMobile()) return;
    if (!sidebar.classList.contains('is-open')) return;
    if (sidebar.contains(e.target) || (mobileBtn && mobileBtn.contains(e.target))) return;
    sidebar.classList.remove('is-open');
  });
})();
