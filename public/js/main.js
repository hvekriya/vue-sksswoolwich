$(document).ready(function () {

	$('#dailydarshan').lightSlider({
		gallery: true,
		item: 1,
		loop: true,
		mode: "slide",
		useCSS: true,
		cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
		easing: 'linear', //'for jquery animation',////
		speed: 600, //ms'
		auto: true,
		slideEndAnimation: true,
		pause: 2000,
		onSliderLoad: function (el) {
			el.lightGallery({
				selector: '#dailydarshan .lslide'
			});
		}
	});

	$('#dailydarshan-all').lightGallery({
		gallery: true
	});

	if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$('.topnav .navbar-header').removeClass('animated fadeInDown');
		$('.navbar-collapse').removeClass('animated fadeInDown');
		$('.whatsapp').attr('href', 'tel:+447437001008');
	} else {
		$('.whatsapp').attr('href', '/messaging.html');
	}

	// Calendar
	var calendar = {
		googleCalendarApiKey: 'AIzaSyAOtGp2YIkqzbPW5-yonk--Go9lf89m8OQ',
		events: {
			googleCalendarId: 'admin@bhujdham.org'
		},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'listMonth,month'
		},
		eventRender: function (event, element, view) {
			var eventEnd = moment(event.end);
			var NOW = moment();
			if (eventEnd.diff(NOW, 'seconds') <= 0) {
				return false;
			}
		}
	};
	// Mobile defaults
	if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		calendar.defaultView = 'listMonth'
	} else {
		calendar.defaultView = 'listMonth'
	}

	$('#calendar').fullCalendar(calendar);
})