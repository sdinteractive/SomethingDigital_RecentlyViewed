"use strict";

var SomethingDigitalRecentlyViewed = Class.create();

SomethingDigitalRecentlyViewed.prototype = {
	items: null,
	initialize: function(){
		this.initStorage();
		this.render();
	},

	initStorage: function(){
		var recentlyViewed = this.getRecentlyViewed(this.getLoadedStorage());
		this.reloadStorage(recentlyViewed);
	},

	getLoadedStorage: function(){
		if(!this.items){
			this.items = JSON.parse(localStorage.getItem('recently-viewed')) || [];
		}
		return this.items;
	},

	reloadStorage: function(recentlyViewed){
		localStorage.setItem('recently-viewed',JSON.stringify(recentlyViewed));
	},

	reduceRecent: function(memo,a){
		if(memo.indexOf(a.id) === -1){
			memo.push(a.id);
		}
		return memo;
	},

	getRecentlyViewed: function(recentlyViewed){

		if(typeof sdRecentlyViewed == 'undefined'){
			return recentlyViewed;
		}

		//get unique keys
		var uniqueKeys = recentlyViewed.reduce(this.reduceRecent, []);


		//add if current product is not in the unique keys
		if(uniqueKeys.indexOf(sdRecentlyViewed.productId) === -1){
			recentlyViewed.push({
				id: sdRecentlyViewed.productId,
				html: $('recently-viewed').innerHTML
			});

			if(recentlyViewed.length > sdRecentlyViewed.maxDisplay){
				recentlyViewed.shift();
			}
		}

		return recentlyViewed;
	},

	getRenderedItems: function(){
		var items = this.getLoadedStorage();

		return items.map(function(a){
				return a.html;
			}).join('');
	},

	render: function(){

		if(!this.items || this.items.length < 1){
			return;
		}

		var rvTemplate = $('recently-viewed-product-list'),
			target = $$('.col-right.sidebar')[0];

		if(!rvTemplate || !target){
			return;
		}

		var html = rvTemplate.innerHTML.replace('{{items}}',this.getRenderedItems());
		$(target).insert({top: html});

	}
}

document.observe('dom:loaded',function(){
	new SomethingDigitalRecentlyViewed();
});