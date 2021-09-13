/*************************************************************************************************
* This file is part of the related-list-reusable-component project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/ 

global class RelatedListRequestWrapper {
    
    @AuraEnabled
    global String recordId {get; set;} 
    @AuraEnabled
    global String metaDatakey {get; set;}  
    @AuraEnabled
    global String relationshipFieldApiName {get; set;}
    @AuraEnabled
    global String dynamicConditions {get; set;}
    @AuraEnabled
    global String sortField {get; set;} 
    @AuraEnabled
    global String sortDirection {get; set;}
    
    global RelatedListRequestWrapper(String recordId, String metaDatakey, String relationshipFieldApiName, 
                                     String dynamicConditions, String sortField, String sortDirection)
    {
        this.recordId = recordId;
        this.metaDatakey = metaDatakey;
        this.relationshipFieldApiName = relationshipFieldApiName;
        this.dynamicConditions = dynamicConditions;
        this.sortField = sortField;
        this.sortDirection = sortDirection;
    }

}