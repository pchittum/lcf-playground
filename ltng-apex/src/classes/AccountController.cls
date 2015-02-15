public class AccountController {
//Action method to return the account list called from client side JavaScript controller
    @AuraEnabled
    public static List<Account> getAccounts() {

        return [SELECT Id
                    ,name
                    ,industry
                    ,Type
                  ,NumberOfEmployees
                  ,TickerSymbol
                  ,Phone
                  ,BillingStreet
                  ,BillingCity
                  ,BillingState
                  ,BillingPostalCode
                FROM 
                    Account 
                ORDER BY 
                    createdDate ASC
               ];
    }    

    @AuraEnabled
    public static Account getAccount(){
      return [SELECT Id, Name from Account limit 1][0];
    }

}