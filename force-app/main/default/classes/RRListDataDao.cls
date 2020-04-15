/*************************************************************************************************
* This file is part of the apex-limit-framework project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/ 

public class RRListDataDao extends SObjectDao{

    private List<SObject> records;
    
    public override void queryRecords(String query){
        records = Database.query(query);
    }
    
    public override List<Object> getData(){
        return (List<Object>) records;
    }
}