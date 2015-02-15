({
    doInit: function(component, evt, helper) {
    	console.log('entered init');
        var action = component.get("c.getAccount");

        console.log('Apex METHOD:')
        console.log(action);

        action.setCallback(this, function(a) {
        	console.log('entered callback');
        	var retValue = a.getReturnValue();

        	console.log(retValue);
        	component.set("v.account", retValue);

        	console.log('finished callback');
        });
        console.log('about to enqueue action');
        $A.enqueueAction(action);
        
        console.log('finished init');
    },
})