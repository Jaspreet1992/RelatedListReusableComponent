/*************************************************************************************************
* This file is part of the apex-limit-framework project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/

import { LightningElement, wire, track, api  } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getRelatedRecords from '@salesforce/apex/ReusableRelatedListCmpCtrl.getRelatedRecords';
import { NavigationMixin } from 'lightning/navigation';

export default class ReusableRelatedListCmp extends NavigationMixin(LightningElement) {
    @api metaDatakey;
    @api recordId;
    @api relationshipFieldApiName;
    @api dynamicCondition;

    @track data = [];
    @track columns = [];
    @track ViewRecordLabel = 'Show More';
    @track showFooter=false;
    @track sortBy = '';
    @track sortedDirection = '';

    AllRecords;
    TopRecords;
    ColumnButtons;
    ColumnHeaderButtons;
    ComponentTitle;
    HeaderBtns;
    HeaderGroupButtons;
    HeaderMenuButtons;
    CmpHeaderIcon;
    

    @wire(getRelatedRecords, { recordId: '$recordId', metaDatakey: '$metaDatakey', 
        relationshipFieldApiName: '$relationshipFieldApiName', dynamicCondition: '$dynamicCondition', 
        sortField: '$sortBy', sortDirection: '$sortedDirection'})
    loadResults({ error, data }){
        if(error){
            //to do
            console.log('from Error block ' + error);

            if (Array.isArray(error.body)) {
                this.error = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') {
                this.error = error.body.message;
            }
            console.log('error ' + this.error);
        }
        else if(data){
            //to do
            this.TopRecords = data.TopRecords;
            this.AllRecords = data.AllRecords;
            console.log('TopRecords: ' + JSON.stringify(data.TopRecords));
            console.log('AllRecords: ' + JSON.stringify(data.AllRecords));
            console.log('AllRecords length: ' + JSON.stringify(data.AllRecords.length));
            console.log('Column: '+JSON.stringify(data.ColumnButtonsJSON));

            this.columns = JSON.parse(data.DataTableHeaders);
            if(data.TopRecords && data.TopRecords.length>0){
                console.log('Data block');
                this.data = this.TopRecords;
            }
            else{
                console.log('Data else block');
                this.formateNoDataRow();
                console.log('Data top Recs: ' + this.data);
            }
            
            if(data.AllRecords && (data.AllRecords.length > 5)){
                console.log('show Footer: ' + this.showFooter);
                this.showFooter = true;
            }

            if(data.ColumnButtonsJSON){
                this.ColumnButtons = JSON.parse(data.ColumnButtonsJSON);
            }

            if(data.ColumnHeaderButtonsJSON){
                this.ColumnHeaderButtons = JSON.parse(data.ColumnHeaderButtonsJSON);
            }

            if(data.HeaderButtonsJSON){
                this.HeaderBtns = JSON.parse(data.HeaderButtonsJSON);
                this.HeaderGroupButtons = [];
                if(this.HeaderBtns.length > 3) {this.HeaderMenuButtons = [];}
                for(let index=0; index<this.HeaderBtns.length; index++){
                    if(index<3){
                        this.HeaderGroupButtons.push(this.HeaderBtns[index]);
                    }else{
                        this.HeaderMenuButtons.push(this.HeaderBtns[index]);
                    }
                }
            }

            if(data.ComponentTitle){
                this.ComponentTitle = data.ComponentTitle;
            }
            if(data.CmpHeaderIcon){
                this.CmpHeaderIcon = data.CmpHeaderIcon;
            }
        }
    }

    formateNoDataRow(){
        let noDateSet=false;
        for(let i=0; i<this.columns.length; i++){
            if(this.columns[i].type === 'text' && noDateSet===false){
                this.data = JSON.parse(`[{"`+this.columns[i].fieldName+`":"No Data"}]`);
                noDateSet = true;
            }
            if(this.columns[i].type === 'action'){
                this.columns.splice(i, 1);
            }
        }
    }

    showAllRecords(){
        if(this.ViewRecordLabel === 'Show More'){
            this.data = this.AllRecords;
            this.ViewRecordLabel = 'Show Less';
        }
        else{
            this.data = this.TopRecords;
            this.ViewRecordLabel = 'Show More';
        }
    }

    updateColumnSorting(event){
        // field name
        this.sortBy = event.detail.fieldName;

        // sort direction
        if(this.sortedDirection === 'asc'){
            this.sortedDirection = 'desc';
        }else{
            this.sortedDirection = 'asc';
        }

        // calling sortdata function to sort the data based on direction and selected field
        this.sortData(event.detail.fieldName, event.detail.sortDirection);
        return refreshApex(this.data);
    }

    sortData(fieldname, direction) {
        // serialize the data before calling sort function
        let parseData = JSON.parse(JSON.stringify(this.data));

        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        
        // cheking reverse direction 
        let isReverse = direction === 'asc' ? 1: -1;
        
        // sorting data 
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';

            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));

        });

        // set the sorted data to data table data
        this.data = parseData;
    }

    handleHeaderButtonAction(event){
        const value = event.target.value;
        console.log(' value ' + value);
        this.handleButtonActions(this.HeaderBtns, value, null);
    }
    
    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        
        this.handleButtonActions(this.ColumnButtons, actionName, row);
    }

    dispatchOpenDialogEvent(dialogName){
        const openModalDialogEvent = new CustomEvent('Name', { detail: dialogName });
        this.dispatchEvent(openModalDialogEvent);
    }

    lightningNavigation(type, attributes, recId) {
        let attr = {};
        if(recId){
            attr.recordId = recId; 
        }
        Object.assign(attr, attributes);
        this[NavigationMixin.Navigate]({
            type: type,
            attributes: attr
        });
    }

    containsElement(dateString, txt){
        if(dateString.indexOf(txt) !== -1){
            return true;
        }else{
            return false;
        }
    }

    handleButtonActions(buttons, actionName, selectedRow){
        if(buttons){
            for(let index =0; index< buttons.length; index++){
                let button = buttons[index];
                let name = button.name;
                let link = button.link;
                let openAs = button.openAs;
                
                if(name === actionName && link && selectedRow && selectedRow.Id){   //runs only for row actions
                    if (typeof link === 'string') {
                        if(this.containsElement(link, "standard view nooverride")){
                            link = '/' + selectedRow.Id + '?nooverride=1'; 
                        }
                        else if(this.containsElement(link, "standard view")){
                            link = '/' + selectedRow.Id; 
                        }
                        else if(this.containsElement(link, "standard edit nooverride")){
                            link = '/' + selectedRow.Id + '/e?nooverride=1'; 
                        }
                        else if(this.containsElement(link, "standard edit")){
                            link = '/' + selectedRow.Id + '/e'; 
                        }
                        else if(this.containsElement(link, "?")){
                            link = link + '&ParentId=' + this.recordId + '&RecId=' + selectedRow.Id; 
                        }
                        else if(openAs !== 'modal-dialog'){
                            link = link + '?ParentId=' + this.recordId  + '&RecId=' + selectedRow.Id; 
                        }
                        
                        console.log(' button clicked ' + link);
                    }
                    

                    if(openAs){
                        if(openAs == 'modal-dialog'){
                            dispatchOpenDialogEvent(link);
                        }
                        if(openAs === 'window'){
                            window.open(link, "childWindow", "height=570,width=820,scrollbars=yes");
                        }
                        else if(openAs === 'tab'){
                            window.open(link, "_blank");
                        }
                        else if(openAs === 'lightning'){
                            if(selectedRow && selectedRow.Id){
                                this.lightningNavigation(link.type, link.attributes, selectedRow.Id);
                            }else{
                                this.lightningNavigation(link.type, link.attributes, null);
                            }
                        }
                        else{
                            window.location = link; 
                        }   
                    }
                }
            }
        }
    }

}