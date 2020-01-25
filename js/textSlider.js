$.fn.howMuchCols = function(){
  return Math.round($(this).find(':last').position().left - $(this).position().left / $(this).outerWidth());
};

var currentPage = 0;
var w = $(".text-slider").width();
var speed = 400;

var cols = $(".main-text").css('column-count');
var gap = $(".main-text").css('column-gap');
var width = $(".main-text").css('column-width');
var padding = $(".main-text").css('padding');
var cw = parseInt(w / cols) + (parseInt(gap) / cols) + 0.99;

var mainWidth = $('.main-text').howMuchCols();
var numPages = Math.round(mainWidth / cw) - (cols - 1);

showPage();

document.querySelector(".slide-left").addEventListener("click", (e) => { 
	currentPage--;
	if (currentPage < 0) {
		currentPage = 0;
		$('.slide-left').addClass('hidden');
	}
	$('.main-text').animate({scrollLeft: currentPage * cw}, speed, function() {
		showPage();
	});
});

document.querySelector(".slide-right").addEventListener("click", (e) => { 
	currentPage++;

	if (currentPage >= numPages) {
		currentPage = numPages - 1;
		return;
	}

	$('.slide-left').removeClass('hidden');
	var x1 = $('.main-text').scrollLeft();

	$('.main-text').animate({scrollLeft: currentPage * cw}, speed, function() {
		var x2 = $('.main-text').scrollLeft();
		var x = x2 - x1;
		if (x < cw) {
			numPages--;
		}
		showPage();
	});
});

function showPage() {
	var displayPage = currentPage + 1;
	$(".page").html( displayPage + '/' + numPages);
}