/*************************************************************************************************
* This file is part of the apex-limit-framework project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/

global class ReusableRelatedListCmpCtrl {

    @AuraEnabled(Cacheable=true)
    global static RelatedListResultWrapper getRelatedRecords(String recordId, String metaDatakey,
                                                             String relationshipFieldApiName, String dynamicCondition, 
                                                             String sortField, String sortDirection) 
    {
        System.debug('$$ recordId: '+recordId);
        System.debug('$$ metaDatakey: '+metaDatakey); 
        System.debug('$$ relationshipFieldApiName: '+relationshipFieldApiName); 
        System.debug('$$ dynamicCondition: '+dynamicCondition); 
        System.debug('$$ sortField: '+sortField); 
        System.debug('$$ sortDirection: '+sortDirection); 
        RequestResponseHandler handler = RequestResponseHandler.getInstance();
        RRListService listService = RRListService.getInstance();                                                         
        RelatedListRequestWrapper req = handler.createRequest(recordId, metaDatakey, relationshipFieldApiName, dynamicCondition, sortField, sortDirection);
                                                               
        return handler.createResponse(listService.processRequest(req), listService.getMetaDataInfo());
                                                                 
        /*RRListService listService = RRListService.getInstance();
		listService.setRequest(new RelatedListRequestWrapper(recordId, key, relationshipFieldApiName, 
                                                             dynamicCondition, sortField, sortDirection));*/		
                                                                 
                                                                 
        /*Map<String, reusable_List_MetaData__mdt> MetaDataMap = new Map<String, reusable_List_MetaData__mdt>();
        List<reusable_List_MetaData__mdt> listMetaData = 
            [Select Id, MasterLabel, Column_JSON__c, Column_Header_Buttons_JSON__c, Column_Buttons_JSON__c,
             Component_Title__c, Header_Buttons_JSON__c, Query_post_condition__c, Query_without_conditions__c, 
             Top_records_to_be_shown__c, Where_condition__c
             from reusable_List_MetaData__mdt];
        
        for(reusable_List_MetaData__mdt record : listMetaData){
            MetaDataMap.put(record.MasterLabel, record);
        }
        
        reusable_List_MetaData__mdt metaDataRec = MetaDataMap.get(metaDatakey);
        
        String query = metaDataRec.Query_without_conditions__c; 
        topRecords = (Integer) metaDataRec.Top_records_to_be_shown__c;
        String whereCondition;
        String queryPostCondition;
        List<Object> objList;
        
        if(query != null && query != ''){
        	String metaDataCondition = metaDataRec.Where_condition__c != null ? metaDataRec.Where_condition__c + ' AND ': '';
            String recordIdCondition = relationshipFieldApiName != null && recordId != null ? relationshipFieldApiName + '=' +'\''+recordId+'\'' : '';
        	
            whereCondition = ' where ' + metaDataCondition + recordIdCondition;   //+ ' where ' + ' ORDER BY Name LIMIT 20'*/
        	//queryPostCondition = metaDataRec.Query_post_condition__c != null ? metaDataRec.Query_post_condition__c : '';    
        	
            //query = query + ' ' + whereCondition + ' ' /*+ queryPostCondition */;
            /*if(sortField != null && sortDirection != null){
                query = query + 'Order by ' + sortField + ' ' + sortDirection;
            }
            
            System.debug('--- Query --- ' + query);
        	AllRelatedRecords = Database.query(query);
        }else{
            System.debug('--- No Query to execute ---');
        }
		System.debug('--- AllRelatedRecords --- ' + AllRelatedRecords);
        
        if(AllRelatedRecords != null && AllRelatedRecords.size() > 0){
            AllRelatedRecords = (List<Object>) JSON.deserializeUntyped(JSON.serialize(AllRelatedRecords));
            AllRelatedRecords = flattenListJSON(AllRelatedRecords);
            System.debug('--- AllRelatedRecords --- ' + AllRelatedRecords);
            
            for(Object obj : AllRelatedRecords){
                if(index<topRecords){
                    TopSelectedRelatedRecords.add(obj);
                }
                index++;
            }  
        }
        
        RelatedListResultWrapper wrapperObj = 
            new RelatedListResultWrapper(AllRelatedRecords, TopSelectedRelatedRecords, metaDataRec.Column_JSON__c, 
                                         metaDataRec.Column_Buttons_JSON__c, 
                                         metaDataRec.Column_Header_Buttons_JSON__c, 
                                         metaDataRec.Component_Title__c, metaDataRec.Header_Buttons_JSON__c);
        
        return wrapperObj;*/
                                                                 
    }
    
    /*global Class Column{
        @AuraEnabled
        global String label;
        @AuraEnabled
        global String fieldName;
        @AuraEnabled
        global String type;
        
        global Column(String label, String fieldName, String type){
            this.label = label;
            this.fieldName = fieldName;
            this.type = type;
        }
    }*/
}