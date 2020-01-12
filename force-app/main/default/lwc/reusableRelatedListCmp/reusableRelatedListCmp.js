/*************************************************************************************************
* This file is part of the apex-limit-framework project, released under the MIT License.             *
* See LICENSE file or go to https://github.com/Jaspreet1992/RelatedListReusableComponents for full license details. *
*************************************************************************************************/

import { LightningElement, wire, track, api  } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getRelatedRecords from '@salesforce/apex/ReusableRelatedListCmpCtrl.getRelatedRecords';

export default class ReusableRelatedListCmp extends LightningElement(LightningElement) {
    @api key;
    @api recordId;
    @api relationshipFieldApiName;

    @track data = [];
    @track columns = [];
    @track ViewRecordLabel = 'Show More';
    @track sortBy = 'Id';
    @track sortedDirection = 'asc';

    AllRecords = [];
    TopRecords = [];
    ColumnButtons = [];
    ColumnHeaderButtons = [];
    ComponentTitle;
    HeaderButtons = [];

    @wire(getRelatedRecords, { recordId: '$recordId', key: '$key', relationshipFieldApiName: '$relationshipFieldApiName', sortField: '$sortBy', sortDirection: '$sortedDirection'})
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
            this.data = this.TopRecords;
            console.log('TopRecords: ' + data.TopRecords);

            this.columns = JSON.parse(data.DataTableHeaders);
            if(data.ColumnButtonsJSON !== '' && data.ColumnButtonsJSON !== null && data.ColumnButtonsJSON !== undefined){
                this.ColumnButtons = JSON.parse(data.ColumnButtonsJSON);
            }

            if(data.ColumnHeaderButtonsJSON !== '' && data.ColumnHeaderButtonsJSON !== null && data.ColumnHeaderButtonsJSON !== undefined){
                this.ColumnHeaderButtons = JSON.parse(data.ColumnHeaderButtonsJSON);
            }

            if(data.HeaderButtonsJSON !== '' && data.HeaderButtonsJSON !== null && data.HeaderButtonsJSON !== undefined){
                this.HeaderButtons = JSON.parse(data.HeaderButtonsJSON);
            }

            if(data.ComponentTitle !== '' && data.ComponentTitle !== null && data.ComponentTitle !== undefined){
                this.ComponentTitle = data.ComponentTitle;
            }
        }
    }

    /*connectedCallback() {

        Promise.all([
            loadScript(this, '/soap/ajax/32.0/apex.js'),
            loadScript(this, '/support/console/47.0/integration.js'),
            loadScript(this, '/soap/ajax/47.0/connection.js'),
        ])
        .then(() => { 
            console.log('Scripts loaded successfully');
            //this.error = undefined;
            // Call back function if scripts loaded successfully
            //this.showSuccessMessage();
        })
        .catch(error => {
            console.log('Error loading scripts');
        });


    }*/

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

    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        //const row = event.detail.row;
        if(this.ColumnButtons !== '' && this.ColumnButtons !== null && this.ColumnButtons !== undefined){
            for(let index =0; index< this.ColumnButtons.length; index++){
                let col_button = this.ColumnButtons[index];
                let label = col_button.label;
                let link = col_button.link;
                let openAs = col_button.openAs;

                //const selectedEvent = new CustomEvent('SendMsg', { detail: { data:  'hi from lwc'} });

                // Dispatches the event.
                //this.dispatchEvent(selectedEvent);
                
                if(label === actionName && link !== '' && link !== null && link !== undefined){
                    if(link.indexOf("?") !== -1){
                        link = link + '&ParentId=' + this.recordId + '&RecId=' + row.Id; 
                    }else{
                        link = link + '?ParentId=' + this.recordId  + '&RecId=' + row.Id; 
                    }
                    console.log(' button clicked ' + link);

                    if(openAs !== '' && openAs !== null && openAs !== undefined ){
                        if(openAs === 'window'){
                            window.open('apex/childWindowExp', "childWindow", "height=570,width=820,scrollbars=yes");
                        }
                        else if(openAs === 'tab'){
                            window.open(link, "_blank");
                        }
                        else if(openAs === 'self'){
                            window.location = link; 
                        }   
                    }
                }
            }
        }
        
    }



}