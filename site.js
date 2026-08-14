(function () {
	var toggle = document.querySelector('.quicknav-toggle');
	var panel = document.querySelector('.quicknav-panel');

	document.querySelectorAll('.sidebar-nav a.active, .quicknav-panel a.active').forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			var main = document.getElementById('main');
			if (main) {
				main.scrollIntoView({ behavior: 'smooth', block: 'start' });
			} else {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		});
	});

	document.querySelectorAll('.theme-summary-list a[href^="#"]').forEach(function (link) {
		link.addEventListener('click', function (event) {
			var target = document.querySelector(link.getAttribute('href'));
			if (!target) return;
			event.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});

	document.querySelectorAll('.abstract-toggle').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var entry = btn.closest('.entry');
			var abstract = entry && entry.querySelector('.entry-abstract');
			if (!abstract) return;
			var expanded = btn.getAttribute('aria-expanded') === 'true';
			btn.setAttribute('aria-expanded', String(!expanded));
			abstract.hidden = expanded;
		});
	});

	var lightbox = document.getElementById('puzzle-lightbox');
	if (lightbox) {
		var lightboxImg = lightbox.querySelector('.lightbox-img');
		var lightboxClose = lightbox.querySelector('.lightbox-close');

		function openLightbox(href, alt) {
			lightboxImg.src = href;
			lightboxImg.alt = alt || '';
			lightbox.hidden = false;
		}

		function closeLightbox() {
			lightbox.hidden = true;
			lightboxImg.src = '';
		}

		document.querySelectorAll('.puzzle-card').forEach(function (card) {
			card.addEventListener('click', function (event) {
				event.preventDefault();
				var img = card.querySelector('img');
				openLightbox(card.getAttribute('href'), img ? img.alt : '');
			});
		});

		lightboxClose.addEventListener('click', closeLightbox);
		lightbox.addEventListener('click', function (event) {
			if (event.target === lightbox) closeLightbox();
		});
		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
		});
	}

	document.querySelectorAll('.topic-collapse-toggle').forEach(function (btn) {
		btn.addEventListener('click', function () {
			var topicPanel = btn.closest('.topic-panel');
			if (!topicPanel) return;
			var collapsed = topicPanel.classList.toggle('is-collapsed');
			btn.setAttribute('aria-expanded', String(!collapsed));
			btn.setAttribute('aria-label', collapsed ? 'Expand section' : 'Collapse section');
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
