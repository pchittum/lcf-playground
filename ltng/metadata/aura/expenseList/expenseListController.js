({
    update: function(component, evt, helper) {
        console.log('reached event handler for checkbox');
        var expense = component.get("v.expense");
        var updateEvent = $A.get("e.c:expenseUpdate");
        console.log('got event: ');
        console.log(updateEvent);
        updateEvent.setParams({ "expense": expense });
        updateEvent.fire();
        console.log('event fired, finished checkbox event handler');
	}
})