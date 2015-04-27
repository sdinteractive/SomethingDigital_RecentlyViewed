document.observe('dom:loaded',function(){
	//get localstorage and append
	var recentlyViewed = JSON.parse(localStorage.getItem('recently-viewed')) || [];

	//get unique keys
	var uniqueKeys = recentlyViewed.reduce(function(memo,a){
		if(memo.indexOf(a.id) === -1){
			memo.push(a.id);
		}
		return memo;
	}, []);

	//add if current product is not in the unique keys
	if(uniqueKeys.indexOf(sdRecentlyViewed.productId) === -1){
		recentlyViewed.push({
			id: sdRecentlyViewed.productId,
			html: document.getElementById('recently-viewed').innerHTML
		});

		if(recentlyViewed.length > sdRecentlyViewed.maxDisplay){
			recentlyViewed.shift();
		}
	}

	localStorage.setItem('recently-viewed',JSON.stringify(recentlyViewed));
});