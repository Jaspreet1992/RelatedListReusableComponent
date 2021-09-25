/*************************************************************************************************
* This file is part of the related-list-reusable-component project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/ 

public virtual class SObjectDao implements IDao{
	
    private List<SObject> records;
    
    public virtual void queryRecords(String query, String mode){
        if(mode == RRListConstants.UserMode){
            SObjectDoa_UserMode umObj = new SObjectDoa_UserMode();
            this.records = umObj.getData(query);
            System.debug('User Mode records - ' + this.records);
        }
        else{
            this.records = Database.query(query);
            System.debug('System Mode records - ' + this.records);
        }
    }
    
    public virtual List<Object> getData(){
        return (List<Object>) records;
    }

    public with sharing class SObjectDoa_UserMode{
        public List<SObject> getData(String query){
            return Database.query(query);
        }
        
    }
    
}