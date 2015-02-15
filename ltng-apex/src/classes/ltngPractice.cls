public class ltngPractice {

    @AuraEnabled
    public static String doSomething(String str){
        String retStr = str != null ? str : 'no text passed';
        return retStr + retStr;
    }

    @AuraEnabled
    public static DataClass composeData(String strParam, Integer intParam, Boolean boolParam){
        DataClass resp = new DataClass();
        resp.str = strParam;
        resp.num = intParam;
        resp.bool = boolParam;
        return resp;
    }

    public class DataClass {
        public String str {get;set;}
        public Integer num {get;set;}
        public Boolean bool {get;set;}
    }

}