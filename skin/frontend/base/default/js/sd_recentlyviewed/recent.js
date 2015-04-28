"use strict";

var SomethingDigitalRecentlyViewed = Class.create();

SomethingDigitalRecentlyViewed.prototype = {
	initialize: function(){
		this.initStorage();
		this.render();
	},

	initStorage: function(){
		var recentlyViewed = this.getRecentlyViewed(this.getLoadedStorage());
		this.reloadStorage(recentlyViewed);
	},

	getLoadedStorage: function(){
		return JSON.parse(localStorage.getItem('recently-viewed')) || [];
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

	render: function(){
		var target = $$('.col-right.sidebar'),
			html = $('recently-viewed-product-list').innerHTML;

		// target.insert({top: html});
	}
}

document.observe('dom:loaded',function(){
	new SomethingDigitalRecentlyViewed();
});