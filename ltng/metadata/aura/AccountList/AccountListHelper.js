({
     //Fetch the accounts from the Apex controller
    getAccountList: function(component) {

        console.log("accountListHelper.getAccountList: entered");

        //Set the action to invoke the Apex controller method
        var action = component.get("c.getAccounts");

        //Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
            //console.log("Got accts: ", actionResult.getReturnValue());
            //Reset the value of the component list attribute with the records returned 
            component.set("v.accounts", actionResult.getReturnValue());
            
        });

        //Enque the action
        $A.enqueueAction(action);

        console.log("accountListHelper.getAccountList: exit");

    },    
})