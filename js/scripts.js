WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Input password
	$('.form .toggle_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.line')

		$(this).toggleClass('active')

		$(this).hasClass('active')
			? parent.find('.input').attr('type', 'text')
			: parent.find('.input').attr('type', 'password')
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Focus when clicking on the field name
	const formLabels = document.querySelectorAll('form .label')

	if (formLabels) {
		formLabels.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				el.closest('.line').querySelector('.input, textarea').focus()
			})
		})
	}


	// Result in the form of interpretation
	$('.interpretation .item').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('open')
	})


	// Result in the form of interpretation - Filter
	$('.interpretation .filter .btn').click(function(e) {
		e.preventDefault()

		let filter = $(this).data('filter')

		$('.interpretation .filter .btn').removeClass('active')
		$(this).addClass('active')

		$('.interpretation .item').css('display', 'none')
		$('.interpretation .item.' + filter).css('display', 'flex')
	})


	// Patients
	$('.patients .patient .head').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.patient')

		parent.toggleClass('active')
		parent.find('.data').slideToggle(300)
	})


	// Schema
	let scale = 1

	$('.schema .btns .zoom_in_btn').click(function(e) {
		e.preventDefault()

		scale = scale + 0.1

		$('.schema .data').css('transform', 'scale('+ scale +')')
	})

	$('.schema .btns .zoom_out_btn').click(function(e) {
		e.preventDefault()

		scale = scale - 0.1

		$('.schema .data').css('transform', 'scale('+ scale +')')
	})

	$('.schema .btns .fullscreen_btn, .schema .btns .close_btn').click(function(e) {
		e.preventDefault()

		$('.schema').toggleClass('fullscreen')
	})


	// Free drag
	var draggable = document.getElementById('draggable'),
		mouseX, mouseY, startX, startY,
		isDragging = false

	// Function to get the correct event coordinates (mouse or touch)
	function getEventCoords(e) {
		if (e.touches && e.touches.length) {
			return { x: e.touches[0].clientX, y: e.touches[0].clientY };
		} else {
			return { x: e.clientX, y: e.clientY };
		}
	}

	// Start dragging
	function startDragging(e) {
		e.preventDefault()

		let event = (e.type === 'touchstart') ? e.touches[0] : e,
			styles = window.getComputedStyle(draggable)

		isDragging = true

		mouseX = event.clientX
		mouseY = event.clientY

		startX = parseFloat(styles.getPropertyValue('left'))
		startY = parseFloat(styles.getPropertyValue('top'))
	}

	draggable.addEventListener('mousedown', startDragging)
	draggable.addEventListener('touchstart', startDragging)

	draggable.addEventListener('mousemove', e => {
		if (isDragging) {
			let offsetX = (mouseX - e.clientX) * -1,
				offsetY = (mouseY - e.clientY) * -1

			draggable.style.left = startX + offsetX + 'px'
			draggable.style.top = startY + offsetY + 'px'
		}
	})

	draggable.addEventListener('touchmove', e => {
		if (isDragging) {
			let offsetX = (mouseX - e.touches[0].clientX) * -1,
				offsetY = (mouseY - e.touches[0].clientY) * -1

			draggable.style.left = startX + offsetX + 'px'
			draggable.style.top = startY + offsetY + 'px'
		}
	})

	draggable.addEventListener('mouseup', () => isDragging = false)
	document.addEventListener('touchend', () => isDragging = false)
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})