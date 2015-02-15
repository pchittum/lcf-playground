({
    //Initialize the view and fetch the list of accounts on load
    doInit : function(component, event, helper) {
       
        console.log("accountListController.doInit: entered");
        
		//Fetch the expense list from the Apex controller   
        helper.getAccountList(component);

        console.log("accountListController.doInit: exit");
    },
   
        //This is the event handler to select an account
    onAccountSelectedEvent : function(component, event, helper) {
       
        console.log("AccountListController.onAccountSelectedEvent: entered");
                
        //Display an alert indicating the event has been handled
        alert("Handled the Account Selected Event!");
        
        console.log("AccountListController.onAccountSelectedEvent: exit");
    },
    
})