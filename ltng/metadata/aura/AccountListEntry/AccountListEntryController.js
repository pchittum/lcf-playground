({
	    //Handle the account select event
    viewAccount: function(component, event) {

        console.log("AccountListEntryController.viewAccount: entered");
       
        //Set a variable to pass to the event of the changed record
        var account = component.get("v.account");
		console.log("AccountListEntryController.viewAccount: account= "+account.Name);
       
        //Set the registered event
        //var updateEvent = component.getEvent("AccountSelectedEvent");

        //Set the event parameter with the selected account   
        //updateEvent.setParams({
        //    "account": account
        //});
        
        //Fire the event to any component listening 
        //updateEvent.fire();
        
        var appEvent= $A.get("e.c:AccountSelected");
        appEvent.setParams({
            "account": account,
            "msg":"Hello World!"
        });
        appEvent.fire();
        
        var sendId = $A.get('e.c:focusAppId');
        sendId.setParams({'recordId': account.Id});
        sendId.fire();
       
        console.log("AccountListEntryController.viewAccount: exit");
     },
})