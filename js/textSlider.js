(function () {

	var currentPage;
	var w;
	var speed = 400;

	var cols;
	var gap;
	var width;
	var padding;
	var cw = 0;

	var mainWidth;
	var numPages;
	var objName;

	this.textSlider = function(obj) {
		objName = obj;
		this.init();
	};

	this.init = function() {
		this.currentPage = 0;
		this.calc();
		this.numPages = this.getPages();
		this.showPage();
		this.bindEvents();
	};

	this.calc = function() {
		this.w = this.getWidth();
		this.cols = this.getCols();
		this.gap = this.getGap();

		this.padding = $(objName).css("padding");
		this.cw = Math.round(this.w / this.cols + this.gap / this.cols + 0.99);
		this.mainWidth = this.getFullWidth();
	};

	this.getPages = function() {
		//console.log(this.mainWidth, this.cw);
		return Math.round(this.mainWidth / this.cw) - 1;
	};

	this.getFullWidth = function() {
		return  Math.round($(objName).find(":last").position().left);
	};

	this.getWidth = function() {
		return $(objName).width();
	};

	this.getGap = function() {
		return parseInt($(objName).css("column-gap"), 10);
	};

	this.getCols = function() {
		return parseInt($(objName).css("column-count"), 10);
	};

	this.showPage = function() {
		this.displayPage = this.currentPage + 1;
		$(".page").html( this.displayPage + "/" + this.numPages);
	};

	this.bindEvents = function () {
		document.querySelector(".slide-left").addEventListener("click", (e) => { 
			this.calc();
			this.currentPage--;
			if (this.currentPage < 0) {
				this.currentPage = 0;
				$(".slide-left").addClass("hidden");
			}

			$(objName).animate({scrollLeft: this.currentPage * this.cw}, this.speed, function() {
				showPage();
			});
		});

		document.querySelector(".slide-right").addEventListener("click", (e) => { 
			this.calc();
			this.currentPage++;

			if (this.currentPage >= this.numPages) {
				this.currentPage = this.numPages - 1;
				return;
			}

			$(".slide-left").removeClass("hidden");
			var x1 = $(objName).scrollLeft();

			$(objName).animate({scrollLeft: this.currentPage * this.cw}, this.speed, function() {
				var x2 = $(objName).scrollLeft();
				var x = x2 - x1;
				if (x < this.cw) {
					this.numPages--;
				}
				showPage();
			});
		});

		window.addEventListener("resize", function() {
			this.calc();
			this.numPages = this.getPages();
			this.showPage();
		});
	};
}());