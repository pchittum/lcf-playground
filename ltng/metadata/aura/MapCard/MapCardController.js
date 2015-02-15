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
		
        var addr = account.BillingStreet;
        //addr = addr+" "+account.BillingCity;
        //addr = addr+" "+account.BillingState;
        //addr = addr+" "+account.BillingPostalCode;
        //addr = addr+" USA";
        
		var mapUrl = "http://maps.google.com/maps/api/staticmap?center="+addr;
        mapUrl = mapUrl + "&zoom=14&markers="+addr+"&size=261x261&maptype=roadmap&sensor=false";        

        component.set("v.mapURL",mapUrl);
        
        console.log ("MapCardController addr = "+addr);
        console.log ("MapCardController mapUrl = "+mapUrl);
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