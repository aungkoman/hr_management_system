
var soldier_config = {
    mc_type: ['--MC Type--','MC', 'KP', 'TP'],
    rank: ['--Rank--','Lt Col','Lt Col/Maj','Maj','Maj/Capt','Capt','Lt.','Second Lt.','WO','WO2','CQ','Seg','Cop','Second Cop','RM'],
    position: ['--Position--','CO','2IC','Head Master','Yay Capt','Q Capt','IO','CC','PC','C WO2','C CQ','C Seg','C Salary Cop','C RM'],
    company: ['--Company--','Head Quarter', 'Comapay 1', 'Comapay 2', 'Comapay 3', 'Comapay 4'],
    current_location: ['--Current Location--','Inner', 'Ops', 'Outside'],
    inner_location: ['--Inner Location--','Head Quarter', 'Comapay 1', 'Comapay 2', 'Comapay 3', 'Comapay 4','Central Security','General'],
    inner_duty: ['--Inner Duty--','CO','2IC','Head Master','Yay Capt','Q Capt','IO','CC','PC','C WO2','C CQ','C Seg','C Salary Cop','C RM'],
    ops_location: ['--Ops Location--','BKH Camp', 'BKM Movement', 'TTT Camp', 'TTT Movement','TZ Camp','TZ Movement'],
    ops_duty: ['--Ops Duty--','SKM', 'CC', 'PC','TC','RM'],
    outside_location: ['--Outside Location--','Course', 'On Leave', 'Hospital','Absent Without Leave','T Duty']
};

var config = {
    priority: ['Normal', 'Important', 'Urgent'],
    severity: ['Minor', 'Major', 'Crash'],
    status: ['Assigned', 'Doing', 'Done', 'Close']
};

//var localhost_ip ='192.168.8.125'; // zte 
//var localhost_ip ='localhost'; // localhost
//var localhost_ip = '192.168.43.32'; // team cs
var localhost_ip = '192.168.1.109'; // CS Office 

var notification_alert_count_int = 0;

var Issue = Backbone.Model.extend({
    defaults: {
        subject: 'Issue summary',
        priority: 1,
        severity: 1,
        assignedTo: 'none',
        status: 1
    },

    changeStatus: function(value) {
        console.log("issuse in changeStatus");
        this.save({status: value});
    }
});

var Soldier = Backbone.Model.extend({
    defaults: {
        mc_type: 0,
        mc: null,
        rank: 0,
        name:null,
        position:0,
        company:0,
        current_location:0,
        inner_location:0,
        inner_duty:0,
        ops_location:0,
        ops_duty:0,
        outside_location:0,
        outside_duty_name:null,
        outside_duty_location:null,
        outside_duty_start_date:null,
        outside_duty_end_date:null,
        created_date:null,
        last_modified_date_time:null
    },

    changeStatus: function(value) {
        console.log("at data model changeStatus");
        this.save({status: value});
    },
    update_mc_type: function(value){
        console.log("update_mc_type for modal is calling..."+value);
        this.set({mc_type:value});
        // this method will be called by view event 
        // we need to determine => to touch model or not
        // by requesting server api and 
        // by validating server response data

        // we should show small updating indicator in view as letting know to user
        // that we are updating their action in realtime to server 

        // call ajax request to server for mc type update
        // call back success => render this model by save method :D :D :D
        // if call back fail => notify the error message to user ( e.g connection fail, duplicate record and many other reasons)
        // and do nothing about modal data and also it's view OK :D :D :D
    },
    update_serial_no:function(value){
        console.log("serial no is updated to "+value);
        this.set({serial_no:value});
    },
    update_name:function(value){
        console.log("name is updated to "+value);
        this.set({name:value});
    },
    update_rank:function(value){
        console.log("rank is updated to "+value);
        this.set({rank:value});
    },
    update_position:function(value){
        console.log("position is updated to "+value);
        this.set({position:value});
    },
    update_company:function(value){
        console.log("company is updated to "+value);
        this.set({company:value});
    },
    update_current_location:function(value){
        console.log("current_location is updated to "+value);
        this.set({current_location:value});
    },
    update_inner_location:function(value){
        console.log("inner_location is updated to "+value);
        this.set({inner_location:value});
    },
    update_inner_duty:function(value){
        console.log("inner_duty is updated to "+value);
        this.set({inner_duty:value});
    },
    update_ops_location:function(value){
        console.log("ops_location is updated to "+value);
        this.set({ops_location:value});
    },
    update_ops_duty:function(value){
        console.log("ops_duty is updated to "+value);
        this.set({ops_duty:value});
    },
    update_outside_location:function(value){
        console.log("outside_location is updated to "+value);
        this.set({outside_location:value});
    },
    update_outside_duty_name:function(value){
        console.log("outside_duty_name is updated to "+value);
        this.set({outside_duty_name:value});
    },
    update_outside_duty_location:function(value){
        console.log("outside_duty_location is updated to "+value);
        this.set({outside_duty_location:value});
    },
    update_outside_duty_start_date:function(value){
        console.log("outside_duty_start_date is updated to "+value);
        this.set({outside_duty_start_date:value});
    },
    update_outside_duty_end_date:function(value){
        console.log("outside_duty_end_date is updated to "+value);
        this.set({outside_duty_end_date:value});
    },
    update_current_location:function(value){
        console.log("update current location in data level solider");
        this.set({current_location: value});
        // we need to delete some data field according to current location
        //switch(value){
            //case '0':
                // it's all new and just set null to all field

                // hay, we just initialize all data to null 
                // ha ha, it's great :D :D LOL
                this.set({inner_location:null});
                this.set({inner_duty:null});
                this.set({ops_location:null});
                this.set({ops_duty:null});
                this.set({outside_location:null});
                this.set({outside_duty_name:null});
                this.set({outside_duty_location:null});
                this.set({outside_duty_start_date:null});
                this.set({outside_duty_end_date:null});
                console.log('this is all new data, just set to null ');
                //break;
            //case '1':
                // it's inner
                //this.set({ops_location:null});
                //this.set({ops_duty:null});
                //this.set({outside_location:null});
                //this.set({outside_duty_name:null});
                //this.set({outside_duty_location:null});
                //this.set({outside_duty_start_date:null});
                //this.set({outside_duty_end_date:null});
        //}
    }

});


// test for soldier modal
// and it is worked what i excepted
var new_modal_soldier = new Soldier();
new_modal_soldier.update_mc_type(1);

var IssueList = Backbone.Collection.extend({
    url: '#',
    model: Issue
});

var SoldierList = Backbone.Collection.extend({
    url: '#',
    model: Soldier
});

var Issues = new IssueList();
var Soldiers = new SoldierList();

var IssueView = Backbone.View.extend({
    tagName: 'tr',

    events: {
        'change .change-status': 'changeStatus',
        'click .del': 'delSelf'
    },

    template: _.template( $('#row').html() ),
    
    initialize: function() {
        this.listenTo(this.model, 'change', this.render),
        this.listenTo(this.model, 'destroy', this.remove)
    },

    render: function() {
        var modelData = this.model.toJSON();
        modelData.config = config;

        this.$el.html( this.template(modelData) );
        //console.log("what is this issue => "+JSON.stringify(this));
        //console.log("what is this.el =>  "+JSON.stringify(this.el));
        //console.log("issuse is rendered");
        return this;
    },

    changeStatus: function() {
        var newStatus = this.$('.change-status').val();
        console.log("issue is chinging status "+newStatus);
        this.model.changeStatus(newStatus);
        //this.model.set({status: newStatus});
    },

    delSelf: function() {
        console.log("issue is deleted");
        this.model.destroy();
    }
});

/* it's soldier row view */

var SoldierView = Backbone.View.extend({
    tagName: 'tr',

    events: {
        'click .watch_me':'watch_me',
        'click .update_button':'update_button',
        'click .delete_button':'delete_button'
    },

    template: _.template( $('#soldier_row').html() ),
    
    initialize: function() {
        this.listenTo(this.model, 'change', this.render),
        this.listenTo(this.model, 'destroy', this.remove)
    },

    update_button:function(){
        console.log("update button is clicked for mc "+this.model.get('mc'));
        var new_model = this.model.clone();
        var view = new SoldierUpdateView({ model: new_model });
        $('#new_soldier_modal_body_div').html( view.render().el);
    },

    delete_button:function(){
        console.log("delete button is clicked for mc "+this.model.get('mc'));
        window.delete_soldier(this.model.toJSON());
    },

    watch_me:function(){
        alert("watch me is clicked");
        console.log('watch me is clicked');
    },

    render: function() {
        console.log(this.model.get('mc')+ " 's data is changing...");
        var modelData = this.model.toJSON();
        modelData.config = config;

        this.$el.html( this.template(modelData) );
        return this;
    },
    delSelf: function() {
        // actually we have to inform to delete this model in database
        // and we need to wait that the server is completely deleted this model data
        // if ok, we destroy this model
        // if not, just inform to user what went wrong
        this.model.destroy();
    }
});

/* this is soldier update/ new view */
var SoldierUpdateView = Backbone.View.extend({
    tagName: '<tr>',
    events: {
        'click .watch_me':'watch_me',
        'change .new_mc_type_select':'new_mc_type_select',
        'change .new_current_location_select':'new_current_location_select',
        'change .new_rank_select':'new_rank_select',
        'change .new_name_input':'new_name_input',
        'change .new_position_select':'new_position_select',
        'change .new_company_select':'new_company_select',
        'change .new_inner_location_select':'new_inner_location_select',
        'change .new_inner_duty_select':'new_inner_duty_select',
        'change .new_ops_location_select':'new_ops_location_select',
        'change .new_ops_duty_select':'new_ops_duty_select',
        'change .new_outside_location_select':'new_outside_location_select',
        'change .new_outside_duty_name_input':'new_outside_duty_name_input',
        'change .new_outside_duty_location_input':'new_outside_duty_location_input',
        'change .new_outside_duty_start_date_input':'new_outside_duty_start_date_input',
        'change .new_outside_duty_end_date_input':'new_outside_duty_end_date_input',
        'click .insert_soldier_button':'insert_soldier_button',
        'click .update_soldier_button':'update_soldier_button'
    },

    template: _.template( $('#new_soldier_modal_content').html() ),
    
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.watch_me();
        this.render();
    },

    new_mc_type_select: function(){
        // yeah , we get new mc type
        var new_mc_type = this.$('.new_mc_type_select').val();
        console.log("new_mc_type_select is changed to "+soldier_config.mc_type[new_mc_type]);
        this.model.update_mc_type(new_mc_type);   
    },

    new_rank_select: function(){
        // yeah , we get new mc type
        var new_rank = this.$('.new_rank_select').val();
        console.log("new_rank_select is changed to "+new_rank);
        this.model.update_rank(new_rank);   
    },

    new_name_input: function(){
        // yeah , we get new mc type
        var new_name = this.$('.new_name_input').val();
        console.log("new_name_input is changed to "+new_name);
        this.model.update_name(new_name);   
    },

    new_position_select: function(){
        // yeah , we get new mc type
        var new_position = this.$('.new_position_select').val();
        console.log("new_position_select is changed to "+new_position);
        this.model.update_position(new_position);   
    },

    new_company_select: function(){
        // yeah , we get new mc type
        var new_company = this.$('.new_company_select').val();
        console.log("new_company_select is changed to "+new_company);
        this.model.update_company(new_company);   
    },

    new_current_location_select: function(){
        // yeah , we get new mc type
        var new_current_location = this.$('.new_current_location_select').val();
        console.log("new_current_location_select is changed to "+soldier_config.current_location[new_current_location]);
        this.model.update_current_location(new_current_location);

    },

    new_inner_location_select: function(){
        // yeah , we get new mc type
        var new_inner_location = this.$('.new_inner_location_select').val();
        console.log("new_inner_location_select is changed to "+new_inner_location);
        this.model.update_inner_location(new_inner_location);   
    },

    new_inner_duty_select: function(){
        // yeah , we get new mc type
        var new_inner_duty = this.$('.new_inner_duty_select').val();
        console.log("new_inner_duty_select is changed to "+new_inner_duty);
        this.model.update_inner_duty(new_inner_duty);   
    },

    new_ops_location_select: function(){
        // yeah , we get new mc type
        var new_ops_location = this.$('.new_ops_location_select').val();
        console.log("new_ops_location_select is changed to "+new_ops_location);
        this.model.update_ops_location(new_ops_location);   
    },

    new_ops_duty_select: function(){
        // yeah , we get new mc type
        var new_ops_duty = this.$('.new_ops_duty_select').val();
        console.log("new_ops_duty_select is changed to "+new_ops_duty);
        this.model.update_ops_duty(new_ops_duty);   
    },

    new_outside_location_select: function(){
        // yeah , we get new mc type
        var new_outside_location = this.$('.new_outside_location_select').val();
        console.log("new_outside_location_select is changed to "+new_outside_location);
        this.model.update_outside_location(new_outside_location);   
    },

    new_outside_duty_name_input: function(){
        // yeah , we get new mc type
        var new_outside_duty_name = this.$('.new_outside_duty_name_input').val();
        console.log("new_outside_duty_name_input is changed to "+new_outside_duty_name);
        this.model.update_outside_duty_name(new_outside_duty_name);   
    },

    new_outside_duty_location_input: function(){
        // yeah , we get new mc type
        var new_outside_duty_location = this.$('.new_outside_duty_location_input').val();
        console.log("new_outside_duty_location_input is changed to "+new_outside_duty_location);
        this.model.update_outside_duty_location(new_outside_duty_location);   
    },

    new_outside_duty_start_date_input: function(){
        // yeah , we get new mc type
        var new_outside_duty_start_date = this.$('.new_outside_duty_start_date_input').val();
        console.log("new_outside_duty_start_date_input is changed to "+new_outside_duty_start_date);
        this.model.update_outside_duty_start_date(new_outside_duty_start_date);   
    },

    new_outside_duty_end_date_input: function(){
        // yeah , we get new mc type
        var new_outside_duty_end_date = this.$('.new_outside_duty_end_date_input').val();
        console.log("new_outside_duty_end_date_input is changed to "+new_outside_duty_end_date);
        this.model.update_outside_duty_end_date(new_outside_duty_end_date);   
    },

    watch_me:function(){
        console.log('watch me is called');
    },

    render: function() {
        var modelData = this.model.toJSON();
        modelData.soldier_config = soldier_config;
        //console.log("render is calling from soldier update view "+JSON.stringify(modelData));
        //console.log("ths.template(modelData) for soldier update view is "+this.template(modelData));
        this.$el.html( this.template(modelData) );
        //console.log("what is this.el =>  "+JSON.stringify(this.el));
        return this;
        //return this.template(modelData);
    },

    update_mc_type: function() {
        // yeah , we get new mc type
        var new_mc_type = this.$('.change_mc_type').val();

        // and transfer data change duty to data modal
        // Data responsible to data changing
        this.model.update_mc_type(new_mc_type);
    },

    update_current_location: function(){
        var current_location = this.$('.new_current_location_select').val();
        console.log("new current location is changed to "+current_location);
    },

    delSelf: function() {
        // actually we have to inform to delete this model in database
        // and we need to wait that the server is completely deleted this model data
        // if ok, we destroy this model
        // if not, just inform to user what went wrong
        this.model.destroy();
    },

    insert_soldier_button:function(){
        console.log("soldier update modal => insert button is clicked");
        // request insert end point with model data
        window.insert_soldier();
    },
    update_soldier_button:function(){
        console.log("soldier update modal => update button is clicked");
        window.update_soldier();
    }
});



var AppView = Backbone.View.extend({
    el: 'body',

    events: {
        'click #submit': 'addIssue'
    },

    initialize: function() {
        this.listenTo(Issues, 'add', this.addRow);
        //this.listenTo(Soldiers, 'add', this.addSoldierRow);
    },
/*
    addSoldierRow:function(soldier){
        var view = new SoldierView({ model: soldier });
        console.log("soldier view  html is "+view.render().el)
        $('#soldier_list').append( view.render().el );
    },
*/
    addIssue: function() {
        var newIssue = new Issue({
            subject: $('#subject').val(),
            priority: $('#priority').val(),
            severity: $('#severity').val(),
            assignedTo: $('#assigned-to').val(),
            status: $('#status').val()
        });

        Issues.add(newIssue);
    },

    addRow: function(issue) {
        var view = new IssueView({ model: issue });
        console.log("isssueview html is "+view.render().el)
        $('#list').append( view.render().el );

        $('#subject,  #assigned-to').val('');
        $('#priority, #severity, #status').val(0);
        $('#new').modal('hide');
    }
});

$(function() {
    new AppView();


/* test for modal render and OK */
/*
var new_soldier_modal_template = _.template($('#new_soldier_modal_content').html());
var blank_soldier = new Soldier();
var modal_data = blank_soldier.toJSON();
modal_data.soldier_config = soldier_config;
var new_soldier_modal_content_html = new_soldier_modal_template(modal_data);
console.log("rendered content is "+new_soldier_modal_content_html);
*/

/* this is template example *.
/*
var para_tempate = _.template("<p><%= text %> </p>");
var text = para_tempate({text:"hello para"});
console.log("text is "+text);
*/


$("#new_soldier_button").on('click',function(){
    console.log("new soldier button is clicked");

    // initialize modal data
    // add modal configuration
    // we get modal data
    var blank_soldier = new Soldier();
    //console.log("blank_soldier model is JSON.stringify "+blank_soldier.toJSON());
    ///var modal_data = blank_soldier.toJSON();
    ///modal_data.soldier_config = soldier_config;

    ///console.log("modal data for new soldier template is "+JSON.stringify(modal_data));

    // initialize template
    // add modal data to template 
    // add modal template to appropriate element
    ///var new_soldier_modal_template = _.template($('#new_soldier_modal_content').html());
    ///var new_soldier_modal_content_html = new_soldier_modal_template(modal_data);
    ///$("#new_soldier_modal_body_div").html(new_soldier_modal_content_html);

    //console.log("ready to create new view for soldier update ");
    var view = new SoldierUpdateView({ model: blank_soldier });
    console.log("view.render().el html is "+view.render().el);
    $('#new_soldier_modal_body_div').html( view.render().el);

    //console.log("update render is ok");

    //var view = new SoldierUpdateView({ model: blank_soldier });
    //console.log("new soldier update html is "+view.render().el;
    //$("#new_soldier_modal_body_div").html( view.render().el );
});

$("#submit_soldier").on("click",function(){
    // we need to call insert end point
    insert_soldier();
});

window.insert_soldier = insert_soldier;
window.update_soldier = update_soldier;
window.delete_soldier = delete_soldier;
window.save_localStorage = save_localStorage;
window.get_localStorage = get_localStorage;

function insert_soldier(){

    // validate form data 
    // create soldier object
    // send to server api using new_soldier endpoint on https post method
    // show indicator to user for connecting server 
    // show server response data in proper form
    update_status('validating user input data...');
    console.log('validating user input data..');

    if($('#new_mc_input').val() == ""){
        // inform to user what's wrong with their input
        alert("enter valid mc");
        // we need to focus error input element
        $("#new_mc_input").val();
        return;
    } 
    if($('#new_name_input').val() == "" ){
        // inform to user what's wrong with their input
        alert("enter valid name");
        // we need to focus error input element
        $("#new_name_input").val();
        return;
    }
    var newSoldier = {
            mc_type: $('#new_mc_type_select').val(),
            mc: $('#new_mc_input').val(),
            rank: $('#new_rank_select').val(),
            name: $('#new_name_input').val(),
            position: $('#new_position_select').val(),
            company: $('#new_company_select').val(),
            current_location: $('#new_current_location_select').val(),
            inner_location: $('#new_inner_location_select').val(),
            inner_duty: $('#new_inner_duty_select').val(),
            ops_location: $('#new_ops_location_select').val(),
            ops_duty: $('#new_ops_duty_select').val(),
            outside_location: $('#new_outside_location_select').val(),
            outside_duty_name: $('#new_outside_duty_name_input').val(),
            outside_duty_location: $('#new_outside_duty_location_input').val(),
            outside_duty_start_date: $('#new_outside_duty_start_date_input').val(),
            outside_duty_end_date: $('#new_outside_duty_end_date_input').val()
        };

    console.log("newSoldier is "+JSON.stringify(newSoldier));
    console.log("outsidtde duty name "+$('#new_outside_duty_name_input').val());
    //var sent_data = {user:newSoldier};
    console.log("current location is "+newSoldier.current_location);
    if(newSoldier.current_location == 0 ){
        console.log("it is new");
            newSoldier.inner_location = null;
            newSoldier.inner_duty=null;
            newSoldier.ops_location=null;
            newSoldier.ops_duty=null;
            newSoldier.outside_location=null;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_duty_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("all are initialized to zero and null for update");
    }
    else if(newSoldier.current_location == 1){
        console.log("it is inner");
            newSoldier.ops_location=null;
            newSoldier.ops_duty=null;
            newSoldier.outside_location=null;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_duty_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("ops and outside are initialized to zero and null for update");
    }
    else if(newSoldier.current_location ==2){
        console.log("it is ops");
            newSoldier.inner_location = null;
            newSoldier.inner_duty=null;
            newSoldier.outside_location=null;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_duty_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("inner and outside are initialized to zero and null for update");
 
    }
    else if(newSoldier.current_location == 3){
        console.log("it is outside");
            newSoldier.inner_location = null;
            newSoldier.inner_duty=null;
            newSoldier.ops_location=null;
            newSoldier.ops_duty=null;
            console.log("inner and ops  are initialized to zero and null for update");
 
    }
    else{
        console.log("we need to indentify the type of current location"+newSoldier.curr)
    }


    console.log(typeof newSoldier.current_location);

    /*
    switch(newSoldier.current_location){
        case 0:
            newSoldier.inner_location = 0;
            newSolier.inner_duty=0;
            newSoldier.ops_location=0;
            newSoldier.ops_duty=0;
            newSoldier.outside_location=0;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("all are initialized to zero and null for update");
            break;
        case 1:
            newSoldier.ops_location=0;
            newSoldier.ops_duty=0;
            newSoldier.outside_location=0;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("ops and outside are initialized to zero and null for update");
            break;
        case 2:
            newSoldier.inner_location = 0;
            newSoldier.inner_duty=0;
            newSoldier.outside_location=0;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("inner and outside are initialized to zero and null for update");
            break;
        case 3:
            newSoldier.inner_location = 0;
            newSoldier.inner_duty=0;
            newSoldier.ops_location=0;
            newSoldier.ops_duty=0;
            console.log("inner and ops  are initialized to zero and null for update");
            break;
        default:
            console.log("switch is default");
    }
    */
    var json_text = JSON.stringify(newSoldier);
    var requested_data = {type:"new_soldier",data:json_text};
    show_loading_modal('uploading data to server..');
    $.ajax({
        method: "POST",
        url: "https://"+localhost_ip+":8082/new_soldier",
        data: requested_data
    })
    .done(function( msg ) {
        
        setTimeout(hide_loading_modal, 1000);
        // validate returned data => success or display error message
        console.log( "new_soldier Data Saved: " + msg );
        var returned_data = JSON.parse(msg);
        if(returned_data.status == "success"){
            // requested data is ok 
            // we need to re-render our data view with latest server returned data
            // initialize localStorage and 
            // set new Data
            // render backbone view for retrieveing
            // and reload the whole app
            var new_data = returned_data.data;
            save_localStorage("data",new_data);
            render_new_data(0);
            show_notification(newSoldier.mc+" is inserted into database server",'success');
        }
        else{
            // requested data is not ok 
            // we have to show the error message
            // and stay on the last page condition
            // highlight the error section
            var error_msg = returned_data.error_msg;
            //error_msg = error_msg.sqlMessage;

            $("#new_soldier").modal("hide");
            show_notification("insert data error response is "+error_msg,'error');
            console.log("We faced with error in inserting new data and error is "+error_msg);
        }
    });
} // end for insert soldier function


function update_soldier(){

    // validate form data 
    // create soldier object
    // send to server api using new_soldier endpoint on https post method
    // show indicator to user for connecting server 
    // show server response data in proper form
    update_status('validating user input data...');
    console.log('validating user input data..');

    if($('#new_mc_input').val() == ""){
        // inform to user what's wrong with their input
        alert("enter valid mc");
        // we need to focus error input element
        $("#new_mc_input").val();
        return;
    } 
    if($('#new_name_input').val() == "" ){
        // inform to user what's wrong with their input
        alert("enter valid name");
        // we need to focus error input element
        $("#new_name_input").val();
        return;
    }
    var newSoldier = {
            mc_type: $('#new_mc_type_select').val(),
            mc: $('#new_mc_input').val(),
            rank: $('#new_rank_select').val(),
            name: $('#new_name_input').val(),
            position: $('#new_position_select').val(),
            company: $('#new_company_select').val(),
            current_location: $('#new_current_location_select').val(),
            inner_location: $('#new_inner_location_select').val(),
            inner_duty: $('#new_inner_duty_select').val(),
            ops_location: $('#new_ops_location_select').val(),
            ops_duty: $('#new_ops_duty_select').val(),
            outside_location: $('#new_outside_location_select').val(),
            outside_duty_name: $('#new_outside_duty_name_input').val(),
            outside_duty_location: $('#new_outside_duty_location_input').val(),
            outside_duty_start_date: $('#new_outside_duty_start_date_input').val(),
            outside_duty_end_date: $('#new_outside_duty_end_date_input').val()
        };

    console.log("newSoldier is "+JSON.stringify(newSoldier));
    console.log("outsidtde duty name "+$('#new_outside_duty_name_input').val());
    //var sent_data = {user:newSoldier};
    console.log("current location is "+newSoldier.current_location);
    if(newSoldier.current_location == 0 ){
        console.log("it is new");
            newSoldier.inner_location = null;
            newSoldier.inner_duty=null;
            newSoldier.ops_location=null;
            newSoldier.ops_duty=null;
            newSoldier.outside_location=null;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_duty_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("all are initialized to zero and null for update");
    }
    else if(newSoldier.current_location == 1){
        console.log("it is inner");
            newSoldier.ops_location=null;
            newSoldier.ops_duty=null;
            newSoldier.outside_location=null;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_duty_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("ops and outside are initialized to zero and null for update");
    }
    else if(newSoldier.current_location ==2){
        console.log("it is ops");
            newSoldier.inner_location = null;
            newSoldier.inner_duty=null;
            newSoldier.outside_location=null;
            newSoldier.outside_duty_name=null;
            newSoldier.outside_duty_location=null;
            newSoldier.outside_duty_start_date=null;
            newSoldier.outside_duty_end_date=null;
            console.log("inner and outside are initialized to zero and null for update");
 
    }
    else if(newSoldier.current_location == 3){
        console.log("it is outside");
            newSoldier.inner_location = null;
            newSoldier.inner_duty=null;
            newSoldier.ops_location=null;
            newSoldier.ops_duty=null;
            console.log("inner and ops  are initialized to zero and null for update");
 
    }
    else{
        console.log("we need to indentify the type of current location"+newSoldier.curr)
    }


    console.log(typeof newSoldier.current_location);

    var json_text = JSON.stringify(newSoldier);
    var requested_data = {type:"update_soldier",data:json_text};
    console.log("this is update request data "+JSON.stringify(requested_data));
    show_loading_modal("Updating data...");
    $.ajax({
        method: "POST",
        url: "https://"+localhost_ip+":8082/update_soldier",
        data: requested_data
    })
    .done(function( msg ) {
        setTimeout(hide_loading_modal,2000);
        // validate returned data => success or display error message
        console.log( "this is update response data : " + msg );
        var returned_data = JSON.parse(msg);
        if(returned_data.status == "success"){
            // requested data is ok 
            // we need to re-render our data view with latest server returned data
            // initialize localStorage and 
            // set new Data
            // render backbone view for retrieveing
            // and reload the whole app
            var new_data = returned_data.data;
            save_localStorage("data",new_data);
            render_new_data(0);
            show_notification("Update success for mc "+newSoldier.mc,'success');
        }
        else{
            // requested data is not ok 
            // we have to show the error message
            // and stay on the last page condition
            // highlight the error section
            var error_msg = returned_data.error_msg;
            show_notification("Update error"+error_msg,'error');
            alert("We faced with error in updating the  new data and error is "+error_msg);
        }
    });

} // end for update soldier function


// delete soldier request
function delete_soldier(soldier){
    console.log("delete request soldier data is "+JSON.stringify(soldier));
    show_loading_modal("Deleting data ....");
    var json_text = JSON.stringify(soldier);
    var requested_data = {type:"delete_soldier",data:json_text};
    $.ajax({
        method: "POST",
        url: "https://"+localhost_ip+":8082/delete_soldier",
        data: requested_data
    })
    .done(function( msg ) {
        setTimeout(hide_loading_modal,2000);
        // validate returned data => success or display error message
        console.log( "delete_soldier Data Saved: " + msg );
        var returned_data = JSON.parse(msg);
        if(returned_data.status == "success"){
            // requested data is ok 
            // we need to re-render our data view with latest server returned data
            // initialize localStorage and 
            // set new Data
            // render backbone view for retrieveing
            // and reload the whole app
            var new_data = returned_data.data;
            save_localStorage("data",new_data);
            render_new_data(0);
        }
        else{
            // requested data is not ok 
            // we have to show the error message
            // and stay on the last page condition
            // highlight the error section
            var error_msg = returned_data.error_msg;
            alert("We faced with error in inserting new data and error is "+error_msg);
        }
    });
}


function update_status(message){
    $('#status_bar').append('<li>'+message+'</li>');
}

// localStorage Section

function save_localStorage(key,value){
    // convert object to string
    localStorage.setItem(key, JSON.stringify(value));
    console.log(JSON.stringify(value) +" is saved as "+key);
}


function remove_localStorage(key){
    localStorage.removeItem(key);
    console.log("key => "+key+" is removed from local storage");
}

function get_localStorage(key){
    if(localStorage.getItem(key)){
        // key is existed
        // convert string to object
        console.log("key "+key+"is existed");
        console.log(key+" is retrieved as "+localStorage.getItem(key));
        return JSON.parse(localStorage.getItem(key));
    }
    else{
        // key is not existed
        console.log("key  "+key+" is not existed");
        return null;
    }
}


console.log("this is test for localstorage int and string problem");
save_localStorage('int',{mc:1});
save_localStorage('str',{mc:'1'});
console.log("how did you find ");
// it's ok to save int and string
// it's save separately in saving int and string
// so, that's ok 


/* localStorage test and it's ok */
/*
save_localStorage('hello_storage',{id:1,mc:63441,name:"Aung Ko Man"});
save_localStorage('hello',"aung ko man");
var akm = get_localStorage('hello_storage');
var akm2 = get_localStorage('helllo');
alert(JSON.stringify(akm));
alert(JSON.stringify(akm2));
if(akm2){
    alert("akm2 is existed");
}
else{
    alert("akm2 is not existed");
}
*/

function render_new_data(current_filter){
    $("#new_soldier").modal("hide");
    console.log('render new data is calling .. current_filter is '+current_filter);
    var new_data = get_localStorage("data");
    if(new_data == null ){
        console.log("there is no data in localStorage");
        return;
    }
    else{
        console.log("there is some data");
        console.log('soldier list is empty');

        $('#soldier_list').empty();
        $("#soldier_list").append("<thead><tr><th>No.</th><th>MC</th><th>Rank</th><th>Name</th><th>Position</th><th>Company</th><th>Current Location</th> <th class='hidden'>Inner Location</th> <th class='hidden'>Inner Duty</th><th class='hidden'>Ops Location</th><th class='hidden'>Ops Duty</th><th class='hidden'>Outside Location</th> <th class='hidden'>Outside Duty Name</th><th class='hidden'>Outside Duty Location</th> <th class='hidden'>Outside Duty Start Date</th> <th class='hidden'>Outside Duty End Date</th><th>#Update</th><th>#Delete</th></tr></thead><tbody>");
        //var official_data = JSON.parse(new_data);
        Soldiers = new SoldierList(new_data);
        var Soldiers_copy = new SoldierList();
        for(var i=0;i<new_data.length; i++){
            var serial_no = i+1;
            console.log(serial_no+" "+new_data[i].mc);
            new_data[i].serial_no = serial_no;
            var soldier = new Soldier(new_data[i]);
            Soldiers_copy.add(soldier);
        }
        var filter_soldiers;

        if(current_filter == 0 ){
            console.log('there is default render new data');
            filter_soldiers = Soldiers_copy;
        }
        else{
            console.log("there is no default current filter is "+current_filter);
            filter_soldiers = Soldiers_copy.filter(function(model) {
                return model.get("current_location") == current_filter;
            });
            //console.log("filter_soldiers are "+JSON.stringify(filter_soldiers));
        }

        console.log("filter_soldiers are "+JSON.stringify(filter_soldiers));
        var render_soldier = JSON.stringify(filter_soldiers);
        render_soldier = JSON.parse(render_soldier);

        for(var j=0;j<filter_soldiers.length;j++){
            console.log("adding to soldier list "+j);
            var serial_no = j+1;
            //console.log('filter_soldiers j is '+JSON.stringify(filter_soldiers[j]));
            //filter_soldiers[j].serial_no = serial_no;
            var soldier = new Soldier(render_soldier[j]);//new Soldier(filter_soldiers[j]);//Soldiers.at(j);
            soldier.update_serial_no(serial_no);
            var view = new SoldierView({ model: soldier });
            $('#soldier_list').append( view.render().el );

        }


    }
    // render all the data in backbone
}


// navigation click handler
function navigation_handler(){
    var result = Soldiers.filter(function(model) {
        return model.get("current_location") == 2;
    });
}

function add_notification_alert(msg){
    $("#notification_alert_list").prepend("<li>"+msg+"</li>");
    $('#notification_alert_count_span').text(++notification_alert_count_int);
    show_notification(msg,'info');

    var audio = new Audio('sounds/notification_alert.ogg');
    audio.play();
}

// test add_notification_alert function

//add_notification_alert("list 3");
//add_notification_alert("list 4");



$(".nav_link").click(function(){


        // hide our_data_table_section_div
        $("#our_data_table_section_div").removeClass('hidden');
        // show notification alert list
        $("#notification_alert_list").addClass('hidden');
        // show notification alert list
        $("#webrtc_section_div").addClass('hidden');


    $(this).parent().siblings().removeClass('active');
    $(this).parent().addClass('active');
    // we need to render appropriate data to soldier according to navigation link click
    // and we need to hide some columns and show some columns 
    console.log("navigation bar is clicked to "+$(this).attr('href'));
    var nav = $(this).attr('href');
    nav = nav.slice(1,nav.length);
    console.log("the real answer is "+nav);
    if(nav == 'home'){
        // this is home
        // just render all the data in original form
        render_new_data(0);
        console.log("original data is renderd");

    }
    else if(nav == 'chatroom'){
        // this is home
        // just render all the data in original form
        //render_new_data(0);
        console.log("chatroom is open");
        $("#webrtc_section_div").removeClass('hidden');
        $("#our_data_table_section_div").addClass('hidden');


        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
        trace('Requesting local stream.');

    }
    else if(nav == 'inner'){
        // we need to show inner column(s) , two column  and hide current location and other columns
        //
        render_new_data(1);
        $table = $('#soldier_list');

        // titile modificaiton
        $('#soldier_list thead th').eq(6).addClass('hidden');
        $('#soldier_list thead th').eq(7).removeClass('hidden');
        $('#soldier_list thead th').eq(8).removeClass('hidden');

        // data row modification
        $("#soldier_list tbody tr").each(function(index,element){
            var current_location_td = $(element).find('td').eq(6);
            var custom_td = $(element).find('td').eq(7);
            var custom_td2 = $(element).find('td').eq(8);

            $(current_location_td).addClass('hidden');
            $(custom_td).removeClass('hidden');
            $(custom_td2).removeClass('hidden');
        });
    }
    else if(nav == 'ops'){
        // we need to show inner column(s) , two column  and hide current location and other columns
        
        render_new_data(2);
        table = $('#soldier_list');

        $('#soldier_list thead th').eq(6).addClass('hidden'); // current location
        $('#soldier_list thead th').eq(9).removeClass('hidden');
        $('#soldier_list thead th').eq(10).removeClass('hidden');
        /*
        $.each('#soldier_list tbody',function(){
            console.log("hello tr each row ");
            //$(this).find('td').eq(7).show();
            //$(this).find('td').eq(8).show();
        });
        */

        $("#soldier_list tbody tr").each(function(index,element){
            var current_location_td = $(element).find('td').eq(6);
            var custom_td = $(element).find('td').eq(9);
            var custom_td2 = $(element).find('td').eq(10);
            //console.log("custom_td is "+$(custom_td).html());
            $(current_location_td).addClass('hidden');
            $(custom_td).removeClass('hidden');
            $(custom_td2).removeClass('hidden');
            console.log("index is => "+index+ " and element is "+$(element).html());
        });
        console.log("we need to show inner column(s) , two column  and hide current location and other columns");
    }
    else if(nav == 'outside'){

        render_new_data(3);
        // we need to show inner column(s) , two column  and hide current location and other columns
        $table = $('#soldier_list');
        //$table.hide();
        $('#soldier_list thead th').eq(6).addClass('hidden'); // current location
        $('#soldier_list thead th').eq(11).removeClass('hidden');
        $('#soldier_list thead th').eq(12).removeClass('hidden');
        $('#soldier_list thead th').eq(13).removeClass('hidden');
        $('#soldier_list thead th').eq(14).removeClass('hidden');
        $('#soldier_list thead th').eq(15).removeClass('hidden');
        /*
        $.each('#soldier_list tbody',function(){
            console.log("hello tr each row ");
            //$(this).find('td').eq(7).show();
            //$(this).find('td').eq(8).show();
        });
        */

        $("#soldier_list tbody tr").each(function(index,element){
            var current_location_td = $(element).find('td').eq(6);
            var custom_td = $(element).find('td').eq(11);
            var custom_td2 = $(element).find('td').eq(12);
            var custom_td3 = $(element).find('td').eq(13);
            var custom_td4 = $(element).find('td').eq(14);
            var custom_td5 = $(element).find('td').eq(15);
            //console.log("custom_td is "+$(custom_td).html());
            $(current_location_td).addClass('hidden');
            $(custom_td).removeClass('hidden');
            $(custom_td2).removeClass('hidden');
            $(custom_td3).removeClass('hidden');
            $(custom_td4).removeClass('hidden');
            $(custom_td5).removeClass('hidden');
            console.log("index is => "+index+ " and element is "+$(element).html());
        });
        console.log("we need to show inner column(s) , two column  and hide current location and other columns");
    }
    else if(nav == 'notification_alert_list'){
        notification_alert_count_int = 0;

        // clear notification count
        $('#notification_alert_count_span').text(notification_alert_count_int);

        console.log("this is notification alert list");
        // hide our_data_table_section_div
        $("#our_data_table_section_div").addClass('hidden');
        // show notification alert list
        $("#notification_alert_list").removeClass('hidden');
    }
});

// we need a function to notify user 
// write message 
// show noti
function show_notification(msg,type){
    if(type == 'success'){
        $("#notification_msg_span").parent().removeClass('alert-danger').removeClass('alert-info').addClass('alert-success');
    }
    else if(type == 'error'){
        $("#notification_msg_span").parent().removeClass('alert-success').removeClass('alert-info').addClass('alert-danger');
    }
    else if(type == 'info'){
        $("#notification_msg_span").parent().removeClass('alert-danger').removeClass('alert-success').addClass('alert-info');        
    }

    $("#notification_msg_span").text(msg);
    $("#notification_div" ).removeClass('hidden');
    $('html, body').animate({
        scrollTop: $("#notification_div").offset().top
    }, 2000);
    console.log("show notification");   
}

function user_login(user){
    var socket_id = get_localStorage('socket_id');
    var requested_data = {type:"user_login",user_data:user,socket_id:socket_id};
    show_loading_modal("Loging In....");
    $.ajax({
        method: "POST",
        url: "https://"+localhost_ip+":8082/user_login",
        data: requested_data
    })
    .done(function( msg ) {
        setTimeout(hide_loading_modal,1000);
        // validate returned data => success or display error message
        console.log( "user_login returned data : " + msg );
        var returned_data = JSON.parse(msg);
        if(returned_data.status == "success"){
            // requested data is ok 
            // that means login status is fine 
            // so we need to save login status in local Storage
            var user_data = returned_data.user_data;
            user_data = user_data[0];
            console.log("user data is "+JSON.stringify(user_data));
            var new_data = returned_data.data;
            save_localStorage("user_data",user_data);
            save_localStorage("data",new_data);
            render_new_data(0);
            $("#login_form_div").addClass('hidden');
            $("#main_div").removeClass('hidden');
            show_notification("Login Success",'success');
        }
        else{
            // requested data is not ok 
            // we have to show the error message
            // and stay on the last page condition
            // highlight the error section
            var error_msg = returned_data.err_msg;
            show_notification(error_msg,'error');
            //alert("Login Fail =>"+error_msg);
        }
    });
};

    $("#login_button").on('click',function(){
        console.log("login button is clicked");
        // validate mc and password
        var login_mc = $('#login_mc_input').val();
        var login_password = $('#login_password_input').val();
        console.log("login mc : "+login_mc+" and login_password : "+login_password);
        var user = {login_mc:login_mc,login_password:login_password};
        user_login(JSON.stringify(user));
    });

    $("#logout_button").on('click',function(){
        remove_localStorage('user_data');
        remove_localStorage('data');
        //window.location.assign('https://localhost:8081');
        window.location.reload();
        //Android.logout();
    });

    $("#update_button").on('click',function(){
        // get all soldier request to server api via ajax request
        $.ajax({
            method: "GET",
            url: "https://"+localhost_ip+":8082/get_soldiers"
        })
        .done(function( msg ) {
        // validate returned data => success or display error message
        console.log( "get_soldiers response data is : " + msg );
        var returned_data = JSON.parse(msg);
        if(returned_data.status == "success"){
            // requested data is ok 
            // we need to re-render our data view with latest server returned data
            // initialize localStorage and 
            // set new Data
            // render backbone view for retrieveing
            // and reload the whole app
            var new_data = returned_data.data;
            save_localStorage("data",new_data);
            render_new_data(0);
        }
        else{
            // requested data is not ok 
            // we have to show the error message
            // and stay on the last page condition
            // highlight the error section
            var error_msg = returned_data.error_msg;
            alert("We faced with error in getting server  data and error is "+error_msg);
        }
    });


    });

    if(get_localStorage('user_data') == null){
        console.log("there is no login information");
        $('#login_form_div').removeClass('hidden');
    }
    else{
        console.log("login_status is ok");
        $('#main_div').removeClass('hidden');
        // just initialize the localStorage
        render_new_data(0);
    }



        /* 
        $('#main_div').removeClass('hidden');
        // just initialize the localStorage
        render_new_data(0);
        */
        $("#notification_div" ).removeClass('hidden');
        $('html, body').animate({
                    scrollTop: $("#notification_div").offset().top
                }, 1000);

        console.log("i need attention");

        $("#notification_div" ).on('click',function(){
            $("#notification_div" ).addClass('hidden');
        });


        /*  ajax listener 
        $(document).ajaxSend(function(event, request, settings) {
            $('#loading-indicator').show();
        });

        $(document).ajaxComplete(function(event, request, settings) {
            $('#loading-indicator').hide();
        });
        */


    show_loading_modal('HR Management System is starting...');
    setTimeout(hide_loading_modal, 1000);


    $("#notification_div").addClass('hidden');
    //alert("hello");
    //show_loading_modal('HR Management System is starting...');

function show_loading_modal(msg){
    //sleep(1000);
    $('body').loadingModal({
      position: 'auto',
      text: msg,
      color: '#fff',
      opacity: '0.7',
      backgroundColor: 'rgb(0,0,0)',
      animation: 'wave'
    });
}

function hide_loading_modal(){
    $('body').loadingModal('hide');
    // destroy the plugin
    $('body').loadingModal('destroy');
}



    /* test for collection to model substraction and set model  */

    // so affraid of collection...e
    
    console.log("soldires are "+JSON.stringify(Soldiers));

    var local = Soldiers.where({mc:63441});
    //var local = Soldiers.at(0);
    console.log("local where return data is "+JSON.stringify(local));
    if(local.length == 0 ){
        console.log("there is no soldier with mc 4 in current sodier list");
    }
    else{
        local = local[0];
        console.log("local name is "+local.get('name')+" and in json "+local.toJSON());
        local.set({name:0});
        // this should trigger change event of event and change view automaically
        // the last time i had tried, it's work
        // but not this time
        // this collectio take mc as string and
        // the returned model does not change ui automatically
        var test_l = Soldiers.where({mc:63441});
        test_l = test_l[0];
        console.log("test_l name is "+test_l.get('name'));
        console.log("final where returnd data is "+JSON.stringify(test_l));
    }
    
    /* end for testing coding line */


    // socket section

  var socket = io("https://"+localhost_ip+":8082");
  // returns a random integer from 0 to 9
  var r_no = Math.floor(Math.random() * 10);  
  var r_name = "user_"+r_no;

  var connected = false;

    if(get_localStorage('user_data') == null){
        console.log("there is no login information");
        //$('#login_form_div').removeClass('hidden');
        // just initialize the localStorage
        var socket_message = {
            user_mc:null
        };
        socket.emit('add user', socket_message);
    }
    else{
        console.log("login_status is ok");
        // just initialize the localStorage
        var user_data = get_localStorage('user_data');
        var user_mc = user_data.mc;
        var socket_message = {
            user_mc:user_mc
        };
        socket.emit('add user', socket_message);
    }


  // Whenever the server emits 'login', log the login message
  socket.on('login', (data) => {
    connected = true;
    console.log("there is "+data.numUsers+" user online");
  });


  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', (data) => {
    console.log(data.username + ' joined');
    console.log(data.numUsers+" online");
    add_notification_alert(data.username+" is joined");
    add_notification_alert(data.numUsers+" are online");
  });


  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', (data) => {
    console.log(data.username + ' left');
    console.log("there is "+data.numUsers+" online");
    add_notification_alert(data.username+" is left");
    add_notification_alert(data.numUsers+" are online");
  });

  socket.on('assign_id',(data)=>{
    console.log('socket id is '+data.id);
    window.save_localStorage("socket_id",data.id);
  });

  socket.on('hello_emit',(data)=>{
    console.log('hello_emit msg is '+data.msg);
  });

  socket.on('login_broadcast',(data)=>{
    console.log('login_broadcast msg is '+data.msg);
  });

  socket.on('delete_broadcast',(data)=>{
    console.log('delete_broadcast msg is '+data.msg);
    var server_mc = data.data;
    // to get pure Interger 
    //server_mc =  parseInt(server_mc, 10);
    console.log('delete mc => '+server_mc);

    // we need to remove / delete the model from colleciton

    console.log('Soldiers is '+Soldiers.toJSON());
    console.log("we are serching "+server_mc+" in "+JSON.stringify(Soldiers));

    var local = Soldiers.where({mc:server_mc});
    console.log("local data to delete is "+JSON.stringify(local));
    if(local.length == 0){
        console.log("there is no model in local colleciton and we need nothing to do with that model");

    }
    else{
        console.log("we need to destroy this model");
        local = local[0];
        console.log("local name is "+local.get('name'));
        local.destroy();
        console.log("successfully destroyed the model");

        // save updated data set to localStorage
        var new_data = Soldiers.toJSON();
        console.log("new data is "+JSON.stringify(new_data));
        save_localStorage("data",new_data);
        
    }

    add_notification_alert(data.msg);

  });

  socket.on('new_soldier_broadcast',(data)=>{
    console.log('new_soldier_broadcast msg is '+data.msg);
    var server_mc = data.data.mc;
    console.log('mc '+server_mc+' is inserted');
    server_mc = parseInt(server_mc,10);
    var serial_no = Soldiers.length;
    data.data.serial_no = serial_no+1;

    // create new model and add to collection
    var new_soldier = new Soldier(data.data);
    Soldiers.add(new_soldier);

    // add to dom (soldier list)
    var view = new SoldierView({ model: new_soldier });
    $('#soldier_list').append( view.render().el );


    // save updated data set to localStorage
    var new_data = Soldiers.toJSON();
    console.log("new data after inserted data  "+JSON.stringify(new_data));
    save_localStorage("data",new_data);


    add_notification_alert(data.msg);

  });

  socket.on('send_answer',(data)=>{
    console.log("send_answer socket received on =>"+JSON.stringify(data));

    // answer mc is source mc
    var source_mc = data.source_mc;
    //var destination_socket_id = data.destination_socket_id;
    destination_socket_id = data.source_socket_id;
    trace("set destination_socket_id as -> "+destination_socket_id);
    // this is answer description
    var description = data.description;


  trace('localPeerConnection setRemoteDescription start.');
  localPeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);
    trace("hay , how are you, i hope you are connected :D :D D:");
    trace("or just wait for iceCandidate exchange");

  });

  socket.on('send_offer',(data)=>{
    console.log("send_offer socket received =>"+JSON.stringify(data));
    // we need to set remote description to local peer connection :D :D :D 
    // crete answer and
    // re send anser description to requester
    var source_mc = data.source_mc;
    var distination_mc = data.destination_mc;
    var socket_id = data.socket_id;
    // set global variabe
    // destination_socket_id 
    // for answer description 
    destination_socket_id = socket_id;
    trace("destination_socket_id is set as "+destination_socket_id);
    // it is need to resend iceCandidate to specified socket
    var description = data.description;
    setRemoteSdp(data.description);
  });

  socket.on('send_iceCandidate',(data)=>{
    console.log("send_iceCandidate socket received data =>"+JSON.stringify(data));
    // we need to set send_iceCandidate to local peer connection :D :D :D 

    var destination_socket_id = data.destination_socket_id;
    var socket_id = data.socket_id;
    var iceCandidate = data.iceCandidate;
    setIceCandidate(iceCandidate);
  });

  socket.on('new_message',(data)=>{
    console.log("new_message socket on =>"+JSON.stringify(data));
    //<kbd>ctrl + p</kbd>
    writeToChatLog("<kbd>"+data.user_mc+"</kbd>=> "+data.message, 'text-success');
    //channel.send({message: $('#messageTextBox').val()})
    //$('#messageTextBox').val('');
    // Scroll chat text area to the bottom on new input.
    $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight);
  });

  socket.on('active_now_mcs',(data)=>{
    console.log("active_users data is "+JSON.stringify(data));
    // this should be array of mc 
    var active_now_mcs = data.active_now_mcs;
    var active_list_item = '';

    //    <button type="button" class="btn btn-primary">Apple</button>
    //    "<button type='button' class='btn btn-primary'>"+active_now_mcs[i]+"</button>"
    for(var i = 0; i<active_now_mcs.length; i++){
        //active_list_item = active_list_item + "<li>"+active_now_mcs[i]+"</li>";
        active_list_item = active_list_item + "<button type='button' class='btn btn-default active_now_mcs'>"+active_now_mcs[i]+"</button>";
    }
    // add to active list 
    //$("#active_now_ul").html(active_list_item);
    $("#active_now_button_group_div").html(active_list_item);
    add_active_now_mcs_listner();
    //$("#active_now_ul").append("<li>"+user_mc+"</li>");
  });

  socket.on('update_broadcast',(data)=>{
    console.log('update_broadcast msg is '+data.msg);
    var server_mc = data.data.mc;

    console.log('mc '+server_mc+ " to be updated :D :D :D ");
    console.log("soldiers count : "+Soldiers.length);
    server_mc =  parseInt(server_mc, 10);
    //server_mc = server_mc+"";

    console.log("data.data for update socket is "+JSON.stringify(data.data));


    console.log("original local soldiers collection is "+JSON.stringify(Soldiers));
    var local_soldier = Soldiers.where({mc:server_mc});
    console.log("local_soldier data for "+server_mc+ " is "+JSON.stringify(local_soldier));

    if(local_soldier.length == 0 ){
        // there is no matching soldier in collection
        console.log("there is no matching soldier in collection");
        return;
    }
    var local_soldier_zero = local_soldier[0];
   //console.log("local_soldier name is "+local_soldier.name);

    // this set will automatically update the ui 
    data.data.mc = server_mc;

    local_soldier_zero.set(data.data);
    //local_soldier.trigger('change');
    console.log("u will be ok with ui update");


    // save updated data set to localStorage
    //var new_data = Soldiers.toJSON();
    console.log("new data is "+JSON.stringify(Soldiers));
    save_localStorage("data",Soldiers);
    //render_new_data(0);

    console.log("server update the client data collectio and ui too");


    add_notification_alert(data.msg);

/*
    // get soldier model from collection
    //var index_of_server_model = 
    //var soldier_from_collection = Soldiers.at(index_of_server_model);
    var soldier_from_collection = Soldiers.where({mc:data.data.mc});
    console.log("soldier from collection is "+soldier_from_collection);
    soldier_from_collection = soldier_from_collection[0];
    // update data to local model by server (socket data).
    soldier_from_collection.set(data.data);

    console.log("updated mc is "+soldier_from_collection.get('name'));
    // that's all
    // backbone will do the rest of rendering funciton, i think and i hope\
 */
  });


function getTimestamp () {
  var totalSec = new Date().getTime() / 1000
  var hours = parseInt(totalSec / 3600) % 24
  var minutes = parseInt(totalSec / 60) % 60
  var seconds = parseInt(totalSec % 60)

  var result = (hours < 10 ? '0' + hours : hours) + ':' +
    (minutes < 10 ? '0' + minutes : minutes) + ':' +
    (seconds < 10 ? '0' + seconds : seconds)

  return result
}

function writeToChatLog (message, message_type) {
  document.getElementById('chatlog').innerHTML += '<p class="' + message_type + '">' + '[' + getTimestamp() + '] ' + message + '</p>'
}



$("#sendMessageBtn").on('click',function() {
  if ($('#messageTextBox').val()) {

    if(get_localStorage('user_data') == null){
        console.log("there is no login information");
        //$('#login_form_div').removeClass('hidden');
    }
    else{
        console.log("login_status is ok");
        // just initialize the localStorage
        var user_data = get_localStorage('user_data');
        var user_mc = user_data.mc;
        var message = $('#messageTextBox').val();
        var socket_message = {
            user_mc:user_mc,
            message:message
        };
        socket.emit('new_message', socket_message);
    }
    //var channel = new RTCMultiSession()
    //writeToChatLog($('#messageTextBox').val(), 'text-success');
    //channel.send({message: $('#messageTextBox').val()})
    $('#messageTextBox').val('');

    // Scroll chat text area to the bottom on new input.
    $('#chatlog').scrollTop($('#chatlog')[0].scrollHeight);
  }

  return false
});

var destination_mc = null;
var destination_socket_id = null;

function add_active_now_mcs_listner(){
    $(".active_now_mcs").on('click',function(){
        console.log($(this).text());
        destination_mc = $(this).text();
        // we need to create web rtc connection 

        // disable the button
        //$(this).disabled = true;
        startCall();


    });  
}


function startCall(){

  trace('Starting call.');
  startTime = window.performance.now();

  // Get local media stream tracks.
  const videoTracks = localStream !== undefined ? localStream.getVideoTracks() : [];
  const audioTracks = localStream !== undefined ? localStream.getAudioTracks() : [];
  if (videoTracks.length > 0) {
    trace(`Using video device: ${videoTracks[0].label}.`);
  }
  if (audioTracks.length > 0) {
    trace(`Using audio device: ${audioTracks[0].label}.`);
  }

  const servers = null;  // Allows for RTC server configuration.
const cfg = {'iceServers': [{'url': 'stun:23.21.150.121'}]},
  con = { 'optional': [{'DtlsSrtpKeyAgreement': true}] }

  // Create peer connections and add behavior.
  localPeerConnection = new RTCPeerConnection(cfg,con);
  trace('Created local peer connection object localPeerConnection.');

  localPeerConnection.addEventListener('icecandidate', handleConnection);
  localPeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);
  
  localPeerConnection.addEventListener('addstream', gotRemoteMediaStream);

  // Add local stream to connection and create offer to connect.
  localPeerConnection.addStream(localStream);
  trace('Added local stream to localPeerConnection.');

  trace('localPeerConnection createOffer start.');
  localPeerConnection.createOffer(offerOptions)
    .then(createdOffer).catch(setSessionDescriptionError);

}

// this is web rtc section
// Set up media stream constant and parameters.

// In this codelab, you will be streaming video only: "video: true".
// Audio will not be streamed because it is set to "audio: false" by default.
const mediaStreamConstraints = {
  video: true,
};

// Set up to exchange only video.
const offerOptions = {
  offerToReceiveVideo: 1,
};

// Define initial start time of the call (defined as connection between peers).
let startTime = null;

// Define peer connections, streams and video elements.
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let remoteStream;

let localPeerConnection;
let remotePeerConnection;




// Define MediaStreams callbacks.

// Sets the MediaStream as the video element src.
function gotLocalMediaStream(mediaStream) {
  localVideo.srcObject = mediaStream;
  localStream = mediaStream;
  trace('Received local stream.');
  //callButton.disabled = false;  // Enable call button.
}

// Handles error by logging a message to the console.
function handleLocalMediaStreamError(error) {
  trace(`navigator.getUserMedia error: ${error.toString()}.`);
}

// Handles remote MediaStream success by adding it as the remoteVideo src.
function gotRemoteMediaStream(event) {
    trace("remote stream is "+event.stream);
  const mediaStream = event.stream;
  remoteVideo.srcObject = mediaStream;
  remoteStream = mediaStream;
  trace('Remote peer connection received remote stream.');
}




// Define RTC peer connection behavior.

// Connects with new peer candidate.
function handleConnection(event) {
    //trace("handleConnection is occured with "+event);
  const peerConnection = event.target;
  const iceCandidate = event.candidate;

  if (iceCandidate) {
    trace("iceCandidate is ok ");
    // we need to send those iceCandidate via socket connection 
    // we will pass both peerConnection and iceCandidate to server 
    // so just trace which are they
    //trace(" peerConnection => \n"+JSON.stringify(peerConnection)+" \n iceCandidate => \n "+JSON.stringify(iceCandidate));

    // we need to send iceCandidate 
    // we have to pass those iceCandidate to server via socket
    var socket_id = get_localStorage('socket_id');
    //var destination_mc = null;
    // we got destination_mc from global scope 
    trace("destination_mc is => "+destination_mc);
    trace("socket_id is => "+socket_id);
    trace("destination_socket_id is => "+destination_socket_id);

    // just initialize the localStorage
    var user_data = get_localStorage('user_data');
    var user_mc = user_data.mc;

    var socket_message = {
            socket_id:socket_id,
            source_mc:user_mc,
            destination_socket_id:destination_socket_id,
            iceCandidate:iceCandidate
        };
    trace("socket_message on send_iceCandidate is => "+JSON.stringify(socket_message));
    
    // No No We don't need to send ice Candidate to other client 
    // m i right :D 
    // let's see it
    socket.emit('send_iceCandidate', socket_message);

    // this is done by receiver side
    /*
    const newIceCandidate = new RTCIceCandidate(iceCandidate);
    const otherPeer = getOtherPeer(peerConnection);

    otherPeer.addIceCandidate(newIceCandidate)
      .then(() => {
        handleConnectionSuccess(peerConnection);
      }).catch((error) => {
        handleConnectionFailure(peerConnection, error);
      });
    */
    trace(`${getPeerName(peerConnection)} ICE candidate:\n` +
          `${event.candidate.candidate}.`);
  }
}


// set iceCandidate to local peer connection from remote ice
function setIceCandidate(iceCandidate){
    trace("setIceCandidate function is calling..");
    const newIceCandidate = new RTCIceCandidate(iceCandidate);
    //const otherPeer = getOtherPeer(peerConnection);

    trace("localPeerConnection is addIceCandidate start");
    localPeerConnection.addIceCandidate(newIceCandidate)
      .then(() => {
        handleConnectionSuccess(localPeerConnection);
      }).catch((error) => {
        handleConnectionFailure(localPeerConnection, error);
      });
}
// Logs that the connection succeeded.
function handleConnectionSuccess(peerConnection) {
  trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
};

// Logs that the connection failed.
function handleConnectionFailure(peerConnection, error) {
  trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
        `${error.toString()}.`);
}

// Logs changes to the connection state.
function handleConnectionChange(event) {
  const peerConnection = event.target;
  console.log('ICE state change event: ', event);
  trace(`${getPeerName(peerConnection)} ICE state: ` +
        `${peerConnection.iceConnectionState}.`);
}



// Logs error when setting session description fails.
function setSessionDescriptionError(error) {
  trace(`Failed to create session description: ${error.toString()}.`);
}

// Logs success when setting session description.
function setDescriptionSuccess(peerConnection, functionName) {
  const peerName = getPeerName(peerConnection);
  trace(`${peerName} ${functionName} complete.`);
}

// Logs success when localDescription is set.
function setLocalDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setLocalDescription');
}

// Logs success when remoteDescription is set.
function setRemoteDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setRemoteDescription');
}



// Logs offer creation and sets peer connection session descriptions.
function createdOffer(description) {
    // hay we  get offer description from local peer connection
  trace(`Offer from localPeerConnection:\n${description.sdp}`);

  trace('localPeerConnection setLocalDescription start.');
  localPeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);

    // we need to send local description
    // we have to pass those local  offer description to server via socket
    var socket_id = get_localStorage('socket_id');
    //var destination_mc = null;
    trace("destination_mc is => "+destination_mc);
    trace("socket_id is => "+socket_id);

    // just initialize the localStorage
    var user_data = get_localStorage('user_data');
    var user_mc = user_data.mc;

    var socket_message = {
            socket_id:socket_id,
            source_mc:user_mc,
            destination_mc:destination_mc,
            description:description
        };
    trace("socket_message on send_offer is => "+JSON.stringify(socket_message));
    socket.emit('send_offer', socket_message);

    // the following section is done by other (receiver side);
    /*
  trace('remotePeerConnection setRemoteDescription start.');
  remotePeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

  trace('remotePeerConnection createAnswer start.');
  remotePeerConnection.createAnswer()
    .then(createdAnswer)
    .catch(setSessionDescriptionError);
    */
}

function setRemoteSdp(description){

    trace("Initialize localPeerConnection ");
    // we should use global scope server 
    // #attention check the initialization of localPeerConnection between this (setRemoteSdp) and setIceCandidate
  

  const servers = null;  // Allows for RTC server configuration.
const cfg = {'iceServers': [{'url': 'stun:23.21.150.121'}]},
  con = { 'optional': [{'DtlsSrtpKeyAgreement': true}] }

  // Create peer connections and add behavior.
  localPeerConnection = new RTCPeerConnection(cfg,con);
  trace('Created local peer connection object localPeerConnection.');

  localPeerConnection.addEventListener('icecandidate', handleConnection);
  localPeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);

/*
  // Add local stream to connection and create offer to connect.
  localPeerConnection.addStream(localStream);
  trace('Added local stream to localPeerConnection.');
  */

  localPeerConnection.addEventListener('addstream', gotRemoteMediaStream);

  // Add local stream to connection and create offer to connect.
  localPeerConnection.addStream(localStream);

    trace('localPeerConnection set  RemoteDescription start.');
  localPeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);

  trace('localPeerConnection createAnswer start.');
  localPeerConnection.createAnswer()
    .then(createdAnswer)
    .catch(setSessionDescriptionError);
}
// Logs answer to offer creation and sets peer connection session descriptions.
function createdAnswer(description) {
  trace(`Answer from localPeerConnection :\n${description.sdp}.`);

  trace('localPeerConnection setLocalDescription start.');
  localPeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);

// re send answer description to socket server 
/*
  trace('localPeerConnection setRemoteDescription start.');
  localPeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);
    */


    var socket_id = get_localStorage('socket_id');
    //var destination_mc = null;
    trace("destination_socket_id is => "+destination_socket_id);
    trace("local socket_id is => "+socket_id);

    // just initialize the localStorage
    var user_data = get_localStorage('user_data');
    var user_mc = user_data.mc;

    var socket_message = {
            source_socket_id:socket_id,
            source_mc:user_mc,
            destination_socket_id:destination_socket_id,
            description:description
        };
    trace("socket_message on send_answer is => "+JSON.stringify(socket_message));
    socket.emit('send_answer', socket_message);
}



// Define helper functions.

// Gets the "other" peer connection.
function getOtherPeer(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      remotePeerConnection : localPeerConnection;
}

// Gets the name of a certain peer connection.
function getPeerName(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      'localPeerConnection' : 'remotePeerConnection';
}
// Logs an action (text) and the time when it happened on the console.
function trace(text) {
  text = text.trim();
  const now = (window.performance.now() / 1000).toFixed(3);

  console.log(now, text);
}



}); // main self call function END



// socket section
