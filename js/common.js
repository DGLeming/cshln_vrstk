class Calculator {

	constructor() {
		this.calculatorDom = document.getElementById('calculator');
		this.planDom = document.getElementById('plan');
		this.depositDom = document.getElementById('deposit');
		this.btnDom = document.getElementById('calc');
		this.profitDom = document.getElementById('profit');
		this.blockprofittext = document.getElementById('dohod_summ_block');
		if (this.calculatorDom !== null) {
			this.init();
		}
	}

	init() {
		this.calculate();
		this.btnDom.addEventListener('click', this.calculate.bind(this));
	}

	calculate() {
		var selectedPlan = this.planDom.options[this.planDom.selectedIndex];
		var min_sum = parseFloat(selectedPlan.getAttribute('js-min-sum'));
		var max_sum = parseFloat(selectedPlan.getAttribute('js-max-sum'));
		var perc_day = parseFloat(selectedPlan.getAttribute('js-perc-day'));
		var days = parseInt(selectedPlan.getAttribute('js-days'));
		var days_text = (document.getElementById('plan').options[document.getElementById('plan').selectedIndex]).getAttribute('js-days-text');
		var depositSum = parseFloat(this.depositDom.value);

		if (depositSum < min_sum) {
			this.profitDom.innerText = 'Минимальная сумма ' + min_sum + ' руб.';
		} else if (depositSum > max_sum) {
			this.profitDom.innerText = 'Максимальная сумма ' + max_sum + ' руб.';
		} else {
			this.blockprofittext.innerHTML = 'Сумма начислений за '+days_text;
			var profit = depositSum / 100 * perc_day * days;
			this.profitDom.innerText = parseFloat((depositSum+parseFloat(profit.toFixed(2)))) + ' руб.';
		}

	}

}

class SingleCalculator {

	constructor() {
		this.inputDom = document.getElementById('deposit');
		this.daylyProfitDom = document.getElementById('dayly_profit');
		this.totalProfitDom = document.getElementById('total_profit');
		this.totalWthdrDom = document.getElementById('total_wthdr');
		if (this.inputDom !== null && this.daylyProfitDom !== null) {
			this.init();
		}
	}

	init() {
		this.calculate();
		this.inputDom.addEventListener('input', this.calculate.bind(this));
	}

	calculate() {
		var min_sum = parseFloat(this.inputDom.getAttribute('js-min-sum'));
		var max_sum = parseFloat(this.inputDom.getAttribute('js-max-sum'));
		var perc_day = parseFloat(this.inputDom.getAttribute('js-perc-day'));
		var days = parseInt(this.inputDom.getAttribute('js-days'));

		var depositSum = parseFloat(this.inputDom.value);
		if (isNaN(depositSum)) {
			depositSum = min_sum;
			this.inputDom.value = depositSum;
		}

		if (depositSum < min_sum) {
			this.daylyProfitDom.innerText = 'Минимальная сумма ' + min_sum + ' руб.';
			this.totalProfitDom.innerText = 'Минимальная сумма ' + min_sum + ' руб.';
			this.totalWthdrDom.innerText = 'Минимальная сумма ' + min_sum + ' руб.';
		} else if (depositSum > max_sum) {
			this.daylyProfitDom.innerText = 'Максимальная сумма ' + max_sum + ' руб.';
			this.totalProfitDom.innerText = 'Максимальная сумма ' + max_sum + ' руб.';
			this.totalWthdrDom.innerText = 'Максимальная сумма ' + max_sum + ' руб.';
		} else {
			var daylyProfit = depositSum / 100 * perc_day;
			var totalProfit = daylyProfit * days;
			var totalWthdr = totalProfit + depositSum;
			this.daylyProfitDom.innerText = daylyProfit.toFixed(2) + ' руб.';
			this.totalProfitDom.innerText = totalProfit.toFixed(2) + ' руб.';
			this.totalWthdrDom.innerText = totalWthdr.toFixed(2) + ' руб.';
		}
	}

}

// class SendCalculator {

// 	constructor() {
// 		this.inputDom = document.getElementById('send-amount');
// 		this.curnetBalanceDom = document.getElementById('send-balance');
// 		this.afterSendBalanceDom = document.getElementById('send-balance2');
// 		if (this.inputDom !== null && this.curnetBalanceDom !== null) {
// 			this.init();
// 		}
// 	}

// 	init() {
// 		this.calculate();
// 		this.inputDom.addEventListener('input', this.calculate.bind(this));
// 	}

// 	calculate() {
// 		var balance = parseFloat(this.curnetBalanceDom.innerText);
// 		var sendSum = parseFloat(this.inputDom.value);

// 		if (isNaN(sendSum)) {
// 			sendSum = 0;
// 			this.inputDom.value = sendSum;
// 		}

// 		if (sendSum > balance) {
// 			sendSum = balance;
// 			this.inputDom.value = sendSum;
// 		}

// 		var afterSum = balance - sendSum;
// 		this.afterSendBalanceDom.innerText = afterSum.toFixed(2);

// 	}

// }

function initNewsSlider() {

	var responsive = [
		{
			breakpoint: 1200,
			settings: 
			{
				slidesToShow: 2
			}
		},
		{
			breakpoint: 768,
			settings: 
			{
				slidesToShow: 1
			}
		},
		{
			breakpoint: 576,
			settings: 
			{
				slidesToShow: 1,
				dots: true, 
				arrows: false
			}
		}
	];

	$("#news").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false, 
		arrows: true,
		draggable: false,
		adaptiveHeight: true,
		infinite: true,
		responsive: responsive
	});
}

function initReviewsSlider() {
	$('#reviews').on('init', function(event, slick){
		var current = slick.$slides[slick.currentSlide];
		$('#vk_link').attr('href', current.getAttribute('lnk'));
	});

	$('#reviews').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var current = slick.$slides[nextSlide];
		$('#vk_link').attr('href', current.getAttribute('lnk'));
	});

	$("#reviews").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false, 
		arrows: true,
		draggable: false,
		adaptiveHeight: true,
		infinite: true,
		responsive: [
			{
				breakpoint: 576,
				settings: 
				{
					dots: true, 
					arrows: false
				}
			}
		]
	});
}

$(document).ready(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

	$('#toggle-btn').on('click', function(){
		$('html').toggleClass('menu');
		$(this).parent().toggleClass('menu');
	});

	if ($('#sidebar-burger') !== null) {
		$('#sidebar-burger').on('click', function(){
			$('#sidebar').toggleClass('active');
			$(this).toggleClass('active');
		});
	}
	
	if ($("#scrollDown") !== null) {
		$("#scrollDown").click(function(evt){
			evt.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 800);
		});
	}

	var calculator = new Calculator();
	var singleCalculator = new SingleCalculator();
	//var sendCalculator = new SendCalculator();

	if ($("#news") !== null) {
		initNewsSlider();
	}

	if ($("#reviews") !== null) {
		initReviewsSlider();
	}

});

function select_changed () {

}