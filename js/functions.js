$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}

			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-srcset') && !entry.target.classList.contains('loaded')) {
				entry.target.srcset = entry.target.getAttribute('data-srcset')

				entry.target.classList.add('loaded')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))


	// Моб. меню

	// Плавная прокрутка к якорю
	$('.scroll-btn').click(function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')

		let offsetTop = 10;

		if ( $(window).width() < 1024 && $(window).width() > 767 ){
			offsetTop = $('.header__top').innerHeight() + 10
		} else if ( $(window).width() < 768 ){
			offsetTop = $('.header__mob-top').innerHeight() + 10
		}

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - offsetTop }, 1000)
	})


	// Fancybox
	// Fancybox
	Fancybox.getDefaults().dragToClose = false;
	Fancybox.getDefaults().placeFocusBack = false;

	// Всплывающие окна
	$('body').on('click', '.modal-btn', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: $(this).data('content'),
			type: 'inline'
		}],
		{
			on: {
				init: (fancyboxRef) => {
					if ( $(this).attr('data-modal-top') ) {
						$('body').addClass('_top-modal')
					}
				},
				destroy: (fancyboxRef) => {
					if ( $(this).attr('data-modal-top') ) {
						$('body').removeClass('_top-modal')
					}
				},
			},
		})
	})


	// Отправка форм
	$('body').on('submit', '.form.ajax-submit', function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src  : '#modal-cod',
			type : 'inline',
			opts : {
				touch : false,
				speed : 300,
				backFocus : false,
				trapFocus : false,
				autoFocus : false,
				mobile : {
					clickSlide: "close"
				}
			}
		}])
	})


	// Увеличение картинки
	Fancybox.bind('.fancy-img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	// Кастомный select
	$('.select-wrap select').niceSelect()


	$('body').on('mouseover', '.submenu__item', function (e) {
		if ( $(window).width() > 1023 ) {
			if (!$(this).hasClass('_active-pc')) {
				$(this).closest('.submenu').find('.submenu__item').removeClass('_active-pc')
	
				$(this).addClass('_active-pc')
			}
		}
	})

	$('body').on('click', '.submenu__item._sub', function (e) {
		e.preventDefault()

		if ( $(window).width() < 1024 && $(window).width() > 767 ) {
			if (!$(this).hasClass('_active-pc')) {
				$(this).closest('.submenu').find('.submenu__item').removeClass('_active-pc')
	
				$(this).addClass('_active-pc')
			}
		}
	})

	$('body').on('click', '.header-menu__link._sub', function (e) {
		e.preventDefault()

		if ( $(this).hasClass('_active') ) {
			$(this).removeClass('_active')
			$(this).next().removeClass('_show')

			$('.overlay').removeClass('_show')
		} else {
			if ( $(window).width() > 767 ) {
				$('.header-menu__link._sub').removeClass('_active')
				$('.submenu').removeClass('_show')
			}

			$(this).addClass('_active')
			$(this).next().addClass('_show')

			$('.overlay').addClass('_show')
		}
	})

	$('body').on('click', '.submenu__close, .overlay', function (e) {
		e.preventDefault()

		$('.header-menu__link._sub').removeClass('_active')
		$('.submenu').removeClass('_show')

		$('.overlay').removeClass('_show')
	})

	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})

	// Аккордион
	$('body').on('click', '.accordion__open', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.accordion__item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('_active') ) {
			parent.removeClass('_active')
			parent.find('.accordion__data').slideUp(300)
		} else {
			accordion.find('.accordion__item').removeClass('_active')
			accordion.find('.accordion__data').slideUp(300)

			parent.addClass('_active')
			parent.find('.accordion__data').slideDown(300)
		}
	})


	// Аккордион простой
	$('body').on('click', '.accord__open', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.accord__item')

		if( parent.hasClass('_active') ) {
			parent.removeClass('_active')
			parent.find('.accord__data').slideUp(300)
		} else {
			parent.addClass('_active')
			parent.find('.accord__data').slideDown(300)
		}
	})

    $('.cats__item_price').on('click', function () {
        const price = $(this).data('price').toString();
        filterPrices(price);
    });

    const hash = window.location.hash;

    if (hash.length) {
        let $target = $(hash);

        if ($target.length) {
            const category = $target.data('item-price');

            if (category) {
                filterPrices(category.toString());
            }

			const $button = $('.cats__item_price[data-price-name="' + $target.attr('id') + '"]');

			if ($button.length) {
				$target = $('#prices')
			}

            let offsetTophash = 10;

			if ( $(window).width() < 1024 && $(window).width() > 767 ){
				offsetTophash = $('.header__top').innerHeight() + 10
			} else if ( $(window).width() < 768 ){
				offsetTophash = $('.header__mob-top').innerHeight() + 10
			}

            setTimeout(function () {
                $('html, body').stop().animate({
                    scrollTop: $target.offset().top - offsetTophash
                }, 100);
            }, 100);
        }
    }
})


// Вспомогательные функции
function setHeight(className){
    let maxheight = 0

    className.each(function() {
		let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
			maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}

const is_touch_device = () => !!('ontouchstart' in window)


function filterPrices(price) {
	$('.cats__item_price').removeClass('_active');
	$('.cats__item_price[data-price="' + price + '"]').addClass('_active');

	const $rows = $('.table-price_cats tr[data-item-price]');

	if (price === 'all') {
		$rows.removeClass('_hide');
	} else {
		$rows.addClass('_hide');
		$rows.filter('[data-item-price="' + price + '"]').removeClass('_hide');
	}
}