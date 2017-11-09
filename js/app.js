(function (){
$(document).ready(function(){
	var counter;
	var model = {
		mode: false,
		min: 0,
		sec: 0,
		sen: 0,
		lapmin: 0,
		lapsec: 0,
		lapsen: 0,
		timer: 0,
		laptimer: 0,
		items: 0,
		init: function(){
			var self = this;
			counter = setInterval(function(){
				self.timer ++;
				self.laptimer ++;
				// main watch
				self.min = Math.floor(self.timer/(100 * 60));
				self.sec = Math.floor((self.timer%6000)/100);
				self.sen = (model.timer%6000)%100;
				//lap watch
				self.lapmin = Math.floor(self.laptimer/(100 * 60));
				self.lapsec = Math.floor((self.laptimer%6000)/100);
				self.lapsen = (self.laptimer%6000)%100;
				view.showTheTime();// update app UI
			}, 10)
		},
		format: function(x){
			if(x < 10){
				return '0' + x;
			}else{
				return x;
			}
		}
	};

var view = {
	DOMelements: {
		min: $('.min'),
		sec: $('.sec'),
		sen: $('.sen'),
		lapmin: $('.lap-min'),
		lapsec: $('.lap-sec'),
		lapsen: $('.lap-sen'),
		start: $('.start'),
		stop: $('.stop'),
		reset: $('.reset'),
		lap: $('.lap'),
		resume: $('.resume'),
		items: $('.wrap-lap-items'),
	},
	setButton: function(x, y){
		$('.button').hide();
		x.show();
		y.show();
	},
	showTheTime: function(){
		this.DOMelements.min.text(model.format(model.min));
		this.DOMelements.sec.text(model.format(model.sec));
		this.DOMelements.sen.text(model.format(model.sen));
		this.DOMelements.lapmin.text(model.format(model.lapmin));
		this.DOMelements.lapsec.text(model.format(model.lapsec));
		this.DOMelements.lapsen.text(model.format(model.lapsen));
	}
};

//================================================= CONTROLLER======================================//
//show the buttons
view.setButton(view.DOMelements.start, view.DOMelements.lap);

//add event listener on start button
view.DOMelements.start.click(function(){
	//start
	model.init();
	//set the mode equal 'true'
	model.mode = true;
	// update buttons
	view.setButton(view.DOMelements.stop, view.DOMelements.lap);
});
//add event listener on lap button
view.DOMelements.lap.click(function(){
	if(model.mode){
		model.items ++;
		var item = '<div class="item clearfix"><div class="lap-wrap"> lap'+' '+ model.items+'</div><div class="wrap-time"><span class="item-min">'+model.format(model.lapmin)+'</span>:<span class="item-sec">'+model.format(model.lapsec)+'</span>:<span class="item-sen">'+model.format(model.lapsen)+'</span></div></div>';
		view.DOMelements.items.append(item);
		model.laptimer = 0;
	}
});
//add event listener on stop button
view.DOMelements.stop.click(function(){
	view.setButton(view.DOMelements.resume, view.DOMelements.reset);
	clearInterval(counter);
});
//add event listener on resume button
view.DOMelements.resume.click(function(){
	model.init();
	view.setButton(view.DOMelements.stop, view.DOMelements.lap);
});
//add event listener on reset button
view.DOMelements.reset.click(function(){
	location.reload();
});
});//ready function

})()//I.I.F