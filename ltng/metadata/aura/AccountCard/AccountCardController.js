({

    
       //This is the event handler to select an account
    onAccountSelectedEvent : function(component, event, helper) {
        console.log("AccountCardController.onAccountSelectedEvent: entered");
        var account = event.getParams().account;
        console.log ("AccountCardController received msg = "+event.getParams().msg+" acct= "+account.Name);
        console.log ("AccountCardController component = "+component);
        
        //component.set("v.account", account);
        component.set("v.id",account.Id);
        var link = "javascript:sforce.one.navigateToSObject("+account.Id+")";
        console.log ("AccountCardController id link = "+link);
        component.set("v.id-link", link);
        component.set("v.accountName",account.Name);
        component.set("v.accountIndustry",account.Industry);
        component.set("v.accountType", account.Type);
        component.set("v.accountEmployees", account.NumberOfEmployees);
        component.set("v.accountTicker", String(account.TickerSymbol));
        component.set("v.accountPhone", account.Phone);
        
        //console.log ("AccountCardController account.Name = "+component.get("v.account").Name);
        //var attrs = component.getAttributes();
        //attrs.setValue("account",account);
        //Display an alert indicating the event has been handled
        //alert("Handled the Account Selected Event!");

        console.log("AccountCardController.onAccountSelectedEvent: setting count");

        console.log("AccountCardController.onAccountSelectedEvent: exit");
    },
    
    
	//Handle linking to the record
    linkToRecord: function(component, event) {
        console.log("AccountCardController.linktToRecord: enter");
        var id = component.get("v.id");
        console.log("AccountCardController.linkToRecord: account= "+id);
        
        var appEvent= $A.get("e.force:navigateToSObject");
        appEvent.setParams({
            "recordId": id
        });
        appEvent.fire();
        
}
})