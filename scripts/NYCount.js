/* 
 * 1.0.x: Adapted to GitHub pages, improved / cleaned up a little
 *
 * Alex Koik-Cestone, 2016-12-31
 * This is derived from the Christmas countdown, and is a simplified version of it.
 * Sources which aided me in the creation of this Fiddle:
 * 
 * Image to Data URI converter for the gold background: https://websemantics.uk/tools/image-to-data-uri-converter/
 * How to create a textured text: http://1stwebdesigner.com/demos/textured_text/textured_text/background-clip.html
 * Adding Stroke to Web Text: https://css-tricks.com/adding-stroke-to-web-text/
 * Gold texture: http://gallery.yopriceville.com/var/resizes/Backgrounds/Gold_Striped_Background.jpg?m=1431995387
 * css - Font scaling based on width of container - Stack Overflow: http://stackoverflow.com/questions/16056591/font-scaling-based-on-width-of-container
*/

const TITLE = "Countdown to New Year's";
const VERSION = '1.0.1';

var setToNyear = false;

var nyInt = window.setInterval(function() {

		var d = returnNewYearDiff(new Date(), true);

		var out = [];
      
			if (d.days > 0) out.push(d.days);
			if (!(d.days == 0 && d.hours == 0)) out.push(fz(d.hours));
			if (!(d.days == 0 && d.hours == 0 && d.minutes == 0)) out.push(fz(d.minutes));
			out.push(fz(d.seconds));

			if (new Date().getDate() == 1 && new Date().getMonth() == 0) {
      out = ['Happy New Year!'];
      if (!setToNyear) {
        	$('.trickle').css({'animation-duration': '2s', 'background-color': 'silver', 'animation-direction': 'alternate'});
        	setToNyear = true;
        } 
      } else {
      if (setToNyear) {
        	setToNyear = false;
          $('.trickle').css({'animation-duration': '20s', 'background-color': '#222', 'animation-direction': 'normal'});
      }			

      }
        var output = out.join(':')

        document.title = TITLE + ': ' + output;
		document.getElementById('counter').innerHTML = output;
	}, 500);

function returnNewYearDiff(date, timeZoneCorrection) {

	// time zone correction is needed when localizing the counter.
	if (timeZoneCorrection == 'undefined') timeZoneCorrection = false;
	var offset = timeZoneCorrection? new Date().getTimezoneOffset() * 60 * 1000 : 0; // timezone offset in ms

	var date1 = new Date((new Date().getFullYear()+1)+'-01-01').getTime();// + offset;
	var date0 = date.getTime() - offset;

	var diff = date1 - date0;
	var sec = diff / 1000;

	// figure out leftovers
	var seconds = Math.floor(sec % 60);
	var minutes = Math.floor(sec / 60 % 60);
	var hours = Math.floor(sec / 60 / 60 % 24);
	var days = Math.floor(sec / 60 / 60 / 24);

	//if (days > 1)

	return {days: days, hours: hours, minutes: minutes, seconds: seconds};
}

function fz(num) {
	return num < 10? '0'+num : num;
}


$(function() {
    for (var x = 0; x < 200; x++) {
        var $el = $('<div class="trickle"></div>');
        $el.css({left: 100 * Math.random() + '%', 'animation-delay': 60 * Math.random() + 's'});
        $el.appendTo('body');
        //console.log(x);
    }
    
    $('#version').html(VERSION);
});


// GitHub Pages version header
window.onload = function() {
    document.querySelector('#hamburger-menu').onclick = function(e) {
        var items = document.querySelectorAll('.menu-item');

        for (const item of items) {
            item.classList.toggle('menu-item-hidden');
        }
    }

    document.querySelector('#credits-link').onclick = function(e) {
        e.preventDefault();
        document.querySelector('.credits-container').style.display = 'flex';
    }

    document.querySelector('.credits-container').onclick = function() {
        this.style.display = 'none';
    }

    // prevent credits screen from closing when clicking a link within.
    document.querySelector('.credits-container a').onclick = function(e) {
        e.stopPropagation();
    }
}