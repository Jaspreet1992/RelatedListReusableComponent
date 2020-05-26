<?xml version="1.0" encoding="UTF-8"?>
<CustomMetadata xmlns="http://soap.sforce.com/2006/04/metadata" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <label>opportunity data</label>
    <protected>false</protected>
    <values>
        <field>Column_Buttons_JSON__c</field>
        <value xsi:type="xsd:string">[{ &quot;label&quot;: &quot;View&quot;, &quot;link&quot;: &quot;standard view&quot;, &quot;openAs&quot;: &quot;window&quot; },
{ &quot;label&quot;: &quot;Edit&quot;, &quot;link&quot;: &quot;standard edit nooverride&quot;, &quot;openAs&quot;: &quot;tab&quot; },
{ &quot;label&quot;: &quot;Delete&quot;, &quot;link&quot;: &quot;This is Delete button link&quot; }
]</value>
    </values>
    <values>
        <field>Column_Header_Buttons_JSON__c</field>
        <value xsi:type="xsd:string">[{ &quot;label&quot;: &quot;demo btn 1&quot;, &quot;link&quot;: &quot;This is demo btn 1 button link&quot; },
{ &quot;label&quot;: &quot;demo btn 2&quot;, &quot;link&quot;: &quot;This is demo btn 2 button link&quot; }
]</value>
    </values>
    <values>
        <field>Column_JSON__c</field>
        <value xsi:type="xsd:string">[
{ &quot;label&quot;: &quot;Name&quot;, &quot;fieldName&quot;: &quot;Name&quot;, &quot;type&quot;: &quot;text&quot;, &quot;sortable&quot;: &quot;true&quot; },
{ &quot;label&quot;: &quot;Amount&quot;, &quot;fieldName&quot;: &quot;Amount&quot;, &quot;type&quot;: &quot;currency&quot;, &quot;sortable&quot;: &quot;true&quot; },
{ &quot;label&quot;: &quot;Created Date&quot;, &quot;fieldName&quot;: &quot;CreatedDate&quot;, &quot;type&quot;: &quot;datetime&quot;, &quot;sortable&quot;: &quot;true&quot; },
{&quot;label&quot;: &quot;Account Name&quot;, &quot;fieldName&quot;: &quot;Account.Name&quot;, &quot;type&quot;: &quot;text&quot;, &quot;sortable&quot;: &quot;true&quot;},
{&quot;label&quot;: &quot;Account Deals&quot;, &quot;fieldName&quot;: &quot;Account.Number_of_deals__c&quot;, &quot;type&quot;: &quot;number&quot;, &quot;sortable&quot;: &quot;true&quot;},
{&quot;type&quot;: &quot;action&quot;, &quot;typeAttributes&quot;: { &quot;rowActions&quot;: [
{ &quot;label&quot;: &quot;View&quot;, &quot;name&quot;: &quot;View&quot; },
{ &quot;label&quot;: &quot;Edit&quot;, &quot;name&quot;: &quot;Edit&quot; },
{ &quot;label&quot;: &quot;Delete&quot;, &quot;name&quot;: &quot;Delete&quot; }
]}}
]</value>
    </values>
    <values>
        <field>Component_Title__c</field>
        <value xsi:type="xsd:string">Opportunity</value>
    </values>
    <values>
        <field>Header_Buttons_JSON__c</field>
        <value xsi:type="xsd:string">[{ &quot;label&quot;: &quot;New&quot;, &quot;link&quot;: &quot;This is New button link&quot; },
{ &quot;label&quot;: &quot;Edit&quot;, &quot;link&quot;: &quot;This is Edit button link&quot; }
]</value>
    </values>
    <values>
        <field>JsonFlattenServiceName__c</field>
        <value xsi:type="xsd:string">default</value>
    </values>
    <values>
        <field>Query_post_condition__c</field>
        <value xsi:type="xsd:string">Limit 10</value>
    </values>
    <values>
        <field>Query_without_conditions__c</field>
        <value xsi:type="xsd:string">Select Id, Name, Amount, CreatedDate, account.name, account.Number_of_deals__c from Opportunity</value>
    </values>
    <values>
        <field>Top_records_to_be_shown__c</field>
        <value xsi:type="xsd:double">5.0</value>
    </values>
    <values>
        <field>Where_condition__c</field>
        <value xsi:nil="true"/>
    </values>
</CustomMetadata>
