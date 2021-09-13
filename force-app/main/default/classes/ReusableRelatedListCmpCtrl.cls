/*************************************************************************************************
* This file is part of the related-list-reusable-component project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/

global class ReusableRelatedListCmpCtrl {

    @AuraEnabled(Cacheable=true)
    global static RelatedListResultWrapper getRelatedRecords(String recordId, String metaDatakey,
                                                             String relationshipFieldApiName, String dynamicCondition, 
                                                             String sortField, String sortDirection) 
    {

        RequestResponseHandler handler = RequestResponseHandler.getInstance();
        RRListService listService = RRListService.getInstance();                                                         
        RelatedListRequestWrapper req = handler.createRequest(recordId, metaDatakey, relationshipFieldApiName, dynamicCondition, sortField, sortDirection);
                                                               
        return handler.createResponse(listService.processRequest(req), listService.getMetaDataInfo());                                                         	
                                                       
                                                                 
    }
    
}