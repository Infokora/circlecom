$.fn.paralaxBgMove = function(xk,yk,target){
	var moveTarget = $(this);
	if(!target){
		var target = $(this);
	}	
	moveTarget.mousemove(function( event ) {
		target.css({
			'background-position-x':  (event.pageX - target.width()/2) *xk,
			'background-position-y': (event.pageY - target.width()/2) *yk
		});
	});
}
$.fn.paralaxItemMove = function(ks,targets){
	var moveTarget = $(this);
	moveTarget.mousemove(function( event ) {
		$.each(targets.items, function(i, item) {
			var xpos = $(window).width()*item.kx/2 -event.pageX * item.kx;
			var ypos = $(window).height()*item.ky/2 -event.pageY * item.ky;
			$(''+item.name+'').css({
				'-moz-transform': 'translateX('+xpos+'px) translateY('+ypos+'px)',
				'-webkit-transform': 'translateX('+xpos+'px) translateY('+ypos+'px)',
				'-o-transform': 'translateX('+xpos+'px) translateY('+ypos+'px)',
				'-ms-transform': 'translateX('+xpos+'px) translateY('+ypos+'px)',
				'transform': 'translateX('+xpos+'px) translateY('+ypos+'px)'
			});
		});
	});
}
$.fn.moveTo = function(x,y,xprop,yprop){
	$(this).css(yprop,y).css(xprop,x).addClass('is_moved');
}
$.fn.flyTo = function(el,elTo){
	var targetX = elTo.offset().left - elTo.width()*.5;
	var targetY = elTo.offset().top - elTo.height()*.5;
	var elX = el.offset().left - el.width()*.5;
	var elY = el.offset().top - el.height()*.5;
}
$.fn.shuttleFly = function(){
	$(this).moveTo(
		($(this).offset().left ) ,
		$('.ground__inner').height()*1 + 1*$(this).offset().top - $('#circle-planet').height()*.5 - $('#circle-planet').offset().top,
		'right',
		'bottom'
		)
}
$.fn.shuttleLoad = function(callback,delay){
	$('#sp1-wrap').moveTo(-100,50,'left','bottom');
	$('#sp2-wrap').moveTo(-100,50,'left','bottom');
	if(callback){
		if(!delay){
			var delay = 1000;
		}
		setTimeout(callback,delay);		
	}
}

$.fn.orbitMove = function(){
	var n = 0;
	setInterval(function(){
		if(n < $('.orbit1-item').length){
			n++;
		}else{
			n = 0;
		}
		$('.orbit1-item').eq(n).animate({'opacity':.2});
		$('.orbit1-item').eq(n).animate({'opacity':1});
	},100)
	
}
var messageObj = new Object();
$(document).ready(function(){
	console.log('and what are looking for?');
	$('#circle-planet').click(function(){
		$(this).toggleClass('is_active');
	});
	$('.planet__popup').click(function(e){
		e.stopPropagation();
	});
	$(document).click(function(event) {
		console.log(213)
		if ($(event.target).closest(".planet__popup").length) return;
		if ($(event.target).closest("#circle-planet").length) return;
		$('#circle-planet').removeClass('is_active');
		event.stopPropagation();
	});
	$('body').on('click', '[data-source]', function(){
		var parent = $(this).parents('.course-select');
		parent.removeClass('is_open');
		$('.course-select__title',parent).html($(this).html());
		$('[data-sourcedesc]').hide();
		$('[data-sourcedesc="'+$(this).data('source')+'"]').show();
		messageObj.cource = $(this).html();
		$('#entry_222471896').val($(this).text());
	});
	
	function particularCourse(source){
		console.log(source);
		let arrCourse= ['Front-end', 'Web Design', 'QA', 'Digital Marketing', 'Startup Business', 'Back-end', 'JavaScript', 'C#','IT teens'];
		let $box= $('.course-select').eq(1).children('ul');
		$box.children().remove();
		if(source==5){
			$box.append('<li><a data-source="21" href="#">Front-end</a></li>');
			$box.append('<li><a data-source="23" href="#">QA</a></li>');
			$box.append('<li><a data-source="26" href="#">Back-end</a></li>');
			$box.append('<li><a data-source="9" href="#">IT teens</a></li>');
		}else{
			for(let i=0; i<arrCourse.length; i++){
				$box.append('<li><a data-source="'+(i+1)+'" href="#">'+arrCourse[i]+'</a></li>');
			};
		};
	};

	$('[data-source1]').click(function(){
		var parent = $(this).parents('.course-select');
		parent.removeClass('is_open');
		$('.course-select__title',parent).html($(this).html());
		messageObj.city = $(this).html();
		$('#entry_296294519').val($(this).text());
		var source= $(this).attr('data-source1');
		particularCourse(source);
	});

	$('.close').click(function(){
		$(this).parent().hide();
	});
	$("#entry_2036300492").mask("+380 99 99 99 999",{placeholder:"_ "});
	$('.fancybox').fancybox({
		padding    : 0,
		margin     : 5,
		nextEffect : 'fade',
		prevEffect : 'none',
		autoCenter : false
	});
	$('.form form').validate({
		submitHandler: function(form) {
	    // some other code
	    // maybe disabling submit button
	    // then:
	    data = $(form).serialize();
	    $.ajax({
	    	type: "POST",
	    	url: $(form).attr('action'),
	    	data: data
	    });
	    $.fancybox.close();
	    $.fn.shuttleLoad(function(){$('#shuttle').shuttleFly()},3100);
	    $("input[type='text']",form).val('');
	    $("input[type='email']",form).val('');
	 }
	});
 //    $('#entry_992951883').rules( "add", {
	//   field: {
	//       required: true
	//     }
	// });

	$( "#entry_1222118386" ).rules( "add", {
		minlength: 2
	});
	$('#entry_2036300492').rules( "add", {
		minlength: 9
	});
	$('.form form').submit(function(event){
		event.preventDefault();

	});
	$('.course-select__title').click(function(){
		$(this).parent().toggleClass('is_open');
	});
	$('#dialog').teletype({
		text: [
		'Мені і на базарі добре',
		'У офіків чаюха норм',
		'То треба ще щось вчити',
		'Навчання то для дітей',
		'Машина є - піду бомбити',
		'Краще ввечері пивас дьорнуть'
		]
	});

	$('#cursor').teletype({
		text: ['_', ' '],
		delay: 0,
		pause: 500
	});
	$('#dialog1').teletype({
		text: [
		'Полюбому',
		'Ну нафік',
		'#%%@##4'
		]
	});

	$('#cursor1').teletype({
		text: ['_', ' '],
		delay: 0,
		pause: 500
	});
	$('.dialog_1').show();
	$('.dialog_2').hide();
	setInterval(function(){
		$('.dialog').toggle();
	},3000);
	// $.fn.orbitMove();
	$('body').paralaxBgMove(.01,.02,$('#mainwrap'));
	// var paralaxItems = { 
	//   "items": [ 
	//     {
	// 		"name":"#ground",
	// 		"kx": ".03",
	// 		"ky": ".01"
	// 	}
	//   ]
	// };
	// $('body').paralaxItemMove(1,paralaxItems);
	// $('#shuttle').click(function(){
	// 	$.fn.shuttleLoad(function(){$('#shuttle').shuttleFly()},3100);
	// });
	// $('#queue').click(function(){
	// 	$('#queue').addClass('is_animate').moveTo('-100%',0,'right','bottom');
	// });
});