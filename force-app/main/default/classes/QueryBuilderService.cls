/*************************************************************************************************
* This file is part of the related-list-reusable-component project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/ 

public class QueryBuilderService implements IQueryBuilderService {
    
    public QueryBuilder qBuilder;
    private String query;
    
    private QueryBuilderService(){
        qBuilder = new QueryBuilder();
    }
    
    public static QueryBuilderService getInstance(){
        return new QueryBuilderService();
    }
    
    public String getQuery(String recordId, String queryWithoutConditions, String whereCondition, String sortField, 
                           String relationshipFieldApiName, String sortDirection, String postCondition, String dynamicWhereClauses){
        return buildQuery(recordId, queryWithoutConditions, whereCondition, sortField, 
                          relationshipFieldApiName, sortDirection, postCondition, dynamicWhereClauses);
    }
    
    private String buildQuery(String recordId, String queryWithoutConditions, String whereCondition, String sortField, 
                              String relationshipFieldApiName, String sortDirection, String postCondition, String dynamicWhereClauses){
        
        query = qBuilder.setQueryWithoutFilters(queryWithoutConditions)
            .setWhereCondition(whereCondition)
            .setSortField(sortField)
            .setRecordId(recordId)
            .setDynamicWhereClauses(dynamicWhereClauses)
            .setRelationshipFieldApiName(relationshipFieldApiName)
            .setSortDirection(sortDirection)
            .setPostCondition(postCondition)
            .build();
        
        return query;
    }

}