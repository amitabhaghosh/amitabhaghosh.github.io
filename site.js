(function () {
	var toggle = document.querySelector('.quicknav-toggle');
	var panel = document.querySelector('.quicknav-panel');

	document.querySelectorAll('.sidebar-nav a.active, .quicknav-panel a.active').forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	});

	if (!toggle || !panel) return;

	var sidebar = document.querySelector('.sidebar');

	function getShowThreshold() {
		return sidebar ? Math.min(sidebar.offsetHeight, 400) : 300;
	}

	function closePanel() {
		toggle.classList.remove('is-open');
		toggle.setAttribute('aria-expanded', 'false');
		panel.classList.remove('is-open');
	}

	window.addEventListener('scroll', function () {
		if (window.scrollY > getShowThreshold()) {
			toggle.classList.add('is-visible');
		} else {
			toggle.classList.remove('is-visible');
			closePanel();
		}
	});

	toggle.addEventListener('click', function (event) {
		event.stopPropagation();
		var isOpen = toggle.classList.contains('is-open');
		toggle.classList.toggle('is-open');
		toggle.setAttribute('aria-expanded', String(!isOpen));
		panel.classList.toggle('is-open');
	});

	panel.addEventListener('click', function (event) {
		if (event.target.closest('a')) {
			closePanel();
		}
	});

	document.addEventListener('click', function (event) {
		if (panel.classList.contains('is-open') && !event.target.closest('.quicknav-panel, .quicknav-toggle')) {
			closePanel();
		}
	});
})();
