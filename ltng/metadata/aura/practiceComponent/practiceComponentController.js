({
	setOutputText: function(component, event, helper) {
		console.log('entered setOutputText');
		console.log(event);
		console.log(event.getParam('value')===component);

		var self = this; 
		var paramVal

		if (component !== event.getParam('value')) { //is the value param on the event not this component (typical for init)
			console.log('in if');

			paramVal = event.getParam('value');//retrieve value attribute from event
			console.log(paramVal);			
			if (!paramVal){
				//in this context these are interchangeable as the input is bound to the parameter
				paramVal=component.get('v.txtVal');//retrieve value from parameter
//				paramVal=component.find('txtIn').get('v.value');//retrieve value from input field
			};
		
		} else {
			console.log('in else');
			paramVal = 'default value';
		}

		console.log(paramVal);

		var action = component.get('c.doSomething');//create action from Apex controller
		action.setParams({'str':paramVal});//set parameters as JSON

		//pass the context object (normally this), the callback method, the type of callback
		//action.setCallback(this, doSuccess, 'SUCCESS');//if I do these, how do I pass the component? 
		//action.setCallback(this, doError, 'ERROR');
		action.setCallback(this,function(actionResult){
			var txtOut = component.find('txtOut');//get the output text component
			var retVal = actionResult.getReturnValue();//retrieve return value from callback param
			txtOut.set('v.value',retVal);
			console.log('completed callback');
		}, 'ALL');

		$A.enqueueAction(action);//place in queue

	},

	doSuccess: function(actionResult){
		//what are the possible params I can expect? 


	},

	doError: function(actionResult){

	}
})