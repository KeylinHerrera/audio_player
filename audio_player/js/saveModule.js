(function(){
	
	/**
	 * Save an item using the key
	 * Automatically serialize the data before saving
	 * @param {String} key
	 * @param {*} value
	 * @returns {Boolean}
	 */
	function set(key, value){
		if(!key || !value){
			console.error(Error('Key and value are required'));
			return false;
		}
		
		var data = null;
		if(typeof value === 'string')
			data = value;
		else {
			try{
				data = JSON.stringify(value);
			}catch (error){
				console.error(error)
				return false;
			}
		}
		
		// save the data
		localStorage.setItem(key, data);
		
		return true;
	}
	
	/**
	 * Gets an saved item data
	 * @param {String} key
	 * @returns {null|*}
	 */
	 
	function get(key){
		if(!key) return null;
		
		var data = localStorage.getItem(key);
		
		if(data){
			try{
				data = JSON.parse(data);
				return data;
			}catch (error){
				console.error(error);
				return null;
			}
		}
	}
	
	return {
		set: set,
		get: get
	};
})();