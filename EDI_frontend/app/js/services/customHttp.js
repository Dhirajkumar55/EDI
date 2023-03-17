'use strict';

angular.module('ediCreatorApp')
.service('customHttp', ['$http', function ($http) {
		// const baseUrl = "https://ingress-nginx-controller.ingress-nginx.svc.cluster.local";
		// const baseUrl = "";
    this.request = function(impParams, requestLink, type, callback){
    	// requestLink = baseUrl + requestLink;
			console.log('**********************************');
			console.log("Link: ", requestLink);
			if(type == 'GET'){

    		requestLink = requestLink+'?'+impParams; //To search using the important parameters by $stateParams
    		impParams = '';
    	}
    	else{
    		//As it is
    	}

		
        $http({
	        method : type,
	        url : requestLink,
	        data : impParams,
	        headers : {
	        	"Content-Type": 'application/x-www-form-urlencoded',
				
	    	}
	    })
	    .success(function(data, status, headers, config){ 	
	        callback(data);
	    })
	    .error(function(data, status, headers, config) {
	    	console.log('Error in connection!')
  		});
    }    
}])