/*************************************************************************************************
* This file is part of the related-list-reusable-component project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/ 

public class QueryBuilder {
    
    public String queryWithoutFilters;
    public String fields;
    public String sObjectApiName;
    public String sortField;
    public String sortDirection;
    public String whereCondition;
    public String postCondition;
    public String relationshipFieldApiName;
    public String dynamicWhereClauses;
    public String recordId;
    
    public QueryBuilder setQueryWithoutFilters(String queryWithoutFilters){
        this.queryWithoutFilters = queryWithoutFilters;
        return this;
    }
    
    public QueryBuilder setFields(String fields){
        this.fields = fields;
        return this;
    }
    
    public QueryBuilder setSObjectApiName(String sObjectApiName){
        this.sObjectApiName = sObjectApiName;
        return this;
    }
    
    public QueryBuilder setSortField(String sortField){
        this.sortField = sortField;
        return this;
    }
    
    public QueryBuilder setRelationshipFieldApiName(String relationshipFieldApiName){
        this.relationshipFieldApiName = relationshipFieldApiName;
        return this;
    }
    
    public QueryBuilder setRecordId(String recordId){
        this.recordId = recordId;
        return this;
    }
    
    public QueryBuilder setDynamicWhereClauses(String dynamicWhereClauses){
        this.dynamicWhereClauses = dynamicWhereClauses;
        return this;
    }
    
    public QueryBuilder setSortDirection(String sortDirection){
        this.sortDirection = sortDirection;
        return this;
    }
    
    public QueryBuilder setWhereCondition(String condition){
        this.whereCondition = condition;
        return this;
    }
    
    public QueryBuilder setPostCondition(String postCondition){
        this.postCondition = postCondition;
        return this;
    }
    
    public String build(){
        String query;
        
        String metaDataCondition = whereCondition != null && !String.isEmpty(whereCondition) ? whereCondition: '';
        String recordIdCondition = ' AND ' + relationshipFieldApiName != null && !String.isEmpty(relationshipFieldApiName) && 
            recordId != null && !String.isEmpty(recordId) ? relationshipFieldApiName + '=' +'\''+recordId+'\'' : ''; 
        
        String dynamicCondition = ' AND ' + dynamicWhereClauses != null && !String.isEmpty(dynamicWhereClauses) ? dynamicWhereClauses : '';                         
        String finalCondition = ' where ' + metaDataCondition + recordIdCondition + dynamicCondition;

        String sortBy = sortField != null && !String.isEmpty(sortField) && sortDirection != null && 
            !String.isEmpty(sortDirection) ? ' order by ' + sortField + ' ' + sortDirection : ''; 

        String postCondition = postCondition != null && !String.isEmpty(postCondition) ? ' ' + postCondition : '';
        if(queryWithoutFilters != null && !String.isEmpty(queryWithoutFilters)){
            query = queryWithoutFilters + finalCondition + sortBy + postCondition;
        }
        else{
            
        }
        return query;
    }

}