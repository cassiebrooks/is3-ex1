(function($){

	// Defining our jQuery plugin

	$.fn.modal_box = function(prop){

		// Default parameters

		var options = $.extend({
			height : "250",
			width : "500",
			title:"I'm a modal",
			description: "I'll have information about specific councils... eventually.",
			top: "20%",
			left: "30%",
		},prop);
				
		return this.click(function(e){
			add_block_page();
			add_popup_box();
			add_styles();
			
			$('.modal_box').fadeIn();
		});
		
		 function add_styles(){			
			$('.modal_box').css({ 
				'position':'absolute', 
				'left':options.left,
				'top':options.top,
				'display':'none',
				'height': options.height + 'px',
				'width': options.width + 'px',
				'border':'1px solid #fff',
				'box-shadow': '0px 2px 7px #292929',
				'-moz-box-shadow': '0px 2px 7px #292929',
				'-webkit-box-shadow': '0px 2px 7px #292929',
				'border-radius':'4px',
				'-moz-border-radius':'4px',
				'-webkit-border-radius':'4px',
				'background': '#f2f2f2', 
				'z-index':'50',
			});
			$('.modal_close').css({
				'position':'relative',
				'top': (options.height-12) + 'px',
				'left': ((options.width/2) -12) + 'px',
				'display':'block',
				'height':'25px',
				'width':'25px',
				'background': 'url(/images/close.png) no-repeat',
				'background-size':'contain',
			});
                        /*Block page overlay*/
			var pageHeight = $(document).height();
			var pageWidth = $(window).width();

			$('.block_page').css({
				'position':'absolute',
				'top':'0',
				'left':'0',
				'background-color':'rgba(0,0,0,0.6)',
				'height':pageHeight,
				'width':pageWidth,
				'z-index':'10'
			});
			$('.inner_modal_box').css({
				'background-color':'#fff',
				'height':(options.height - 10) + 'px',
				'width':(options.width - 10) + 'px',
				'padding':'10px',
				'margin':'-20px 5px 5px 5px',
				'border-radius':'4px',
				'-moz-border-radius':'4px',
				'-webkit-border-radius':'4px'
			});
		}
		
		 function add_block_page(){
			var block_page = $('<div class="block_page"></div>');
						
			$(block_page).appendTo('body');
		}
		 		
		 function add_popup_box(){
			 var pop_up = $('<div class="modal_box"><a href="#" class="modal_close"></a><div class="inner_modal_box"><h2 class="title">' + options.title + '</h2><p>' + options.description + '</p></div></div>');
			 $(pop_up).appendTo('.block_page');
			 			 
			 $('.modal_close').click(function(){
				$(this).parent().fadeOut().remove();
				$('.block_page').fadeOut().remove();				 
			 });
		}

		return this;
	};
	
})(jQuery);