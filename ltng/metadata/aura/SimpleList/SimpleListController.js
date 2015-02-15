({
	doInit : function(component, event, helper) {
        
        var action = component.get("c.getExpenses");
        var self = this;
        action.setCallback(this, function(actionResp){
            component.set("v.exps", actionResp.getReturnValue());
        });
		$A.enqueueAction(action);
	}
})