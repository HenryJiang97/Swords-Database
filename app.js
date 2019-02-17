//import packages
var alert = require("alert-node");
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

//Set up connections with the database
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'henryjiang',
    database:   'sword',
    multipleStatements: true
});



//Disp the number of tuples in the database
app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) AS count FROM sword';
    connection.query(q, function (error, results) {
        if (error) throw error;
        
        //Count the instances in sword table
        var count = results[0].count;
        
        //Pass the count to data in HTML
        res.render("home", {data: count});
    });
});


//Post to /all_data, DISPLAY ALL DATA IN THE DATABASE
app.post("/all_data", function(req, res){
    // SQL query
    var q = 'SELECT sword.SID, sword.CurrentLocation, sword.TypologyID, sword.CountryOfAssembly, sword.Scabbard, blade.TangType, blade.Length, blade.MaxWidth, blade.Type, blade.CountryOfOrigin, blade.YearMade AS YearMade_blade, blade.Material AS Material_blade, blade.Smith, hilt.YearMade AS YearMade_hilt, hilt.HandleMaterial, hilt.Handedness, guard.Material AS Material_guard, guard.GuardType, pommel.PommelType, pommel.AttatchementMethod, pommel.Material AS Material_pommel FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID;';
    q = q + 'SELECT blade.Length as max_length FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID ORDER BY blade.Length DESC LIMIT 1;';
    q = q + 'SELECT blade.Length as min_length FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID ORDER BY blade.Length ASC LIMIT 1;';
    q = q + 'SELECT blade.MaxWidth as max_width FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID ORDER BY blade.MaxWidth DESC LIMIT 1;';
    q = q + 'SELECT blade.YearMade as e_yearmade FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID ORDER BY blade.YearMade ASC LIMIT 1;';
    q = q + 'SELECT blade.YearMade as l_yearmade FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID ORDER BY blade.YearMade DESC LIMIT 1;';
    
    //Connect to database
    connection.query(q, function(error, result) {
        if (error) throw error;
        
        
        //Create blank array for storing values for each attribute
        var sid = [];
        var currentlocation = [];
        var typologyid = [];
        var countryofassembly = [];
        var scabbard = [];
        var tangtype = [];
        var length = [];
        var maxwidth = [];
        var type = [];
        var countryoforigin = [];
        var yearmade_blade = [];
        var material_blade = [];
        var smith = [];
        var yearmade_hilt = [];
        var handlematerial = [];
        var handedness = [];
        var guardtype = [];
        var material_guard = [];
        var pommeltype = [];
        var attatchementmethod = [];
        var material_pommel = [];

        var max_length = result[1][0].max_length;
        var min_length = result[2][0].min_length;
        var max_width = result[3][0].max_width;
        var e_yearmade = result[4][0].e_yearmade;
        var l_yearmade = result[5][0].l_yearmade;
        
        
        // Insert values of each attributes to the corresponding list
        for (var i = 0; i < result[0].length; i++){
            sid.push(result[0][i].SID);
            currentlocation.push(result[0][i].CurrentLocation);
            typologyid.push(result[0][i].TypologyID);
            countryofassembly.push(result[0][i].CountryOfAssembly);
            scabbard.push(result[0][i].Scabbard);
            tangtype.push(result[0][i].TangType);
            length.push(result[0][i].Length);
            maxwidth.push(result[0][i].MaxWidth);
            type.push(result[0][i].Type);
            countryoforigin.push(result[0][i].CountryOfOrigin);
            yearmade_blade.push(result[0][i].YearMade_blade);
            material_blade.push(result[0][i].Material_blade);
            smith.push(result[0][i].Smith);
            yearmade_hilt.push(result[0][i].YearMade_hilt);
            handlematerial.push(result[0][i].HandleMaterial);
            handedness.push(result[0][i].Handedness);
            material_guard.push(result[0][i].Material_guard);
            guardtype.push(result[0][i].GuardType);
            pommeltype.push(result[0][i].PommelType);
            attatchementmethod.push(result[0][i].AttatchementMethod);
            material_pommel.push(result[0][i].Material_pommel);
        }
        

        //Send data to the front-end
        res.render("allData", {loop:result[0].length, SID:sid, CurrentLocation:currentlocation, TypologyID:typologyid, CountryOfAssembly:countryofassembly, Scabbard:scabbard, TangType:tangtype, Length:length, MaxWidth:maxwidth, Type:type, CountryOfOrigin:countryoforigin, YearMade_blade:yearmade_blade, Material_blade:material_blade, Smith:smith, YearMade_hilt:yearmade_hilt, HandleMaterial:handlematerial, Handedness:handedness, Material_guard:material_guard, GuardType:guardtype, PommelType:pommeltype, AttatchementMethod:attatchementmethod, Material_pommel:material_pommel, max_length:max_length, min_length:min_length, max_width:max_width, e_yearmade:e_yearmade, l_yearmade:l_yearmade});
    });
});


//Post to /all_data_sorted
app.post("/all_data_sorted", function(req, res){
    // SQL query
    var q = 'SELECT sword.SID, sword.CurrentLocation, sword.TypologyID, sword.CountryOfAssembly, sword.Scabbard, blade.TangType, blade.Length, blade.MaxWidth, blade.Type, blade.CountryOfOrigin, blade.YearMade AS YearMade_blade, blade.Material AS Material_blade, blade.Smith, hilt.YearMade AS YearMade_hilt, hilt.HandleMaterial, hilt.Handedness, guard.Material AS Material_guard, guard.GuardType, pommel.PommelType, pommel.AttatchementMethod, pommel.Material AS Material_pommel FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID ';
    
    if(req.body.button == 'Length_Ascending'){
        q += 'ORDER BY blade.Length ASC;';
    }
    
    if(req.body.button == 'Length_Descending'){
        q += 'ORDER BY blade.Length DESC;';
    }
    
    if(req.body.button == 'MaxWidth_Ascending'){
        q += 'ORDER BY blade.MaxWidth ASC;';
    }
    
    if(req.body.button == 'MaxWidth_Descending'){
        q += 'ORDER BY blade.MaxWidth DESC;';
    }
    
    if(req.body.button == 'YearMade_Ascending'){
        q += 'ORDER BY blade.YearMade ASC;';
    }
    
    if(req.body.button == 'YearMade_Descending'){
        q += 'ORDER BY blade.YearMade DESC;';
    }
    
    
    //Connect to database
    connection.query(q, function(error, result) {
        if (error) throw error;
        
        //Create blank array for storing values for each attribute
        var sid = [];
        var currentlocation = [];
        var typologyid = [];
        var countryofassembly = [];
        var scabbard = [];
        var tangtype = [];
        var length = [];
        var maxwidth = [];
        var type = [];
        var countryoforigin = [];
        var yearmade_blade = [];
        var material_blade = [];
        var smith = [];
        var yearmade_hilt = [];
        var handlematerial = [];
        var handedness = [];
        var guardtype = [];
        var material_guard = [];
        var pommeltype = [];
        var attatchementmethod = [];
        var material_pommel = [];

        
        // Insert values of each attributes to the corresponding list
        for (var i = 0; i < result.length; i++){
            sid.push(result[i].SID);
            currentlocation.push(result[i].CurrentLocation);
            typologyid.push(result[i].TypologyID);
            countryofassembly.push(result[i].CountryOfAssembly);
            scabbard.push(result[i].Scabbard);
            tangtype.push(result[i].TangType);
            length.push(result[i].Length);
            maxwidth.push(result[i].MaxWidth);
            type.push(result[i].Type);
            countryoforigin.push(result[i].CountryOfOrigin);
            yearmade_blade.push(result[i].YearMade_blade);
            material_blade.push(result[i].Material_blade);
            smith.push(result[i].Smith);
            yearmade_hilt.push(result[i].YearMade_hilt);
            handlematerial.push(result[i].HandleMaterial);
            handedness.push(result[i].Handedness);
            material_guard.push(result[i].Material_guard);
            guardtype.push(result[i].GuardType);
            pommeltype.push(result[i].PommelType);
            attatchementmethod.push(result[i].AttatchementMethod);
            material_pommel.push(result[i].Material_pommel);
        }
        
        //Send data to the front-end
        res.render("allDataSort", {attri:req.body.button, loop:result.length, SID:sid, CurrentLocation:currentlocation, TypologyID:typologyid, CountryOfAssembly:countryofassembly, Scabbard:scabbard, TangType:tangtype, Length:length, MaxWidth:maxwidth, Type:type, CountryOfOrigin:countryoforigin, YearMade_blade:yearmade_blade, Material_blade:material_blade, Smith:smith, YearMade_hilt:yearmade_hilt, HandleMaterial:handlematerial, Handedness:handedness, Material_guard:material_guard, GuardType:guardtype, PommelType:pommeltype, AttatchementMethod:attatchementmethod, Material_pommel:material_pommel});
    });
});


//Post to /search_result
app.post("/search_result", function(req, res){
    
    var location = req.body.currentlocation;
    var typo = req.body.typologyid;
    var country = req.body.countryofass;
    var scab = req.body.scabbard;
    
    
    // SQL query
    var q_merge = 'SELECT sword.CurrentLocation, sword.TypologyID, sword.CountryOfAssembly, sword.Scabbard, blade.TangType, blade.Length, blade.MaxWidth, blade.Type, blade.CountryOfOrigin, blade.YearMade AS YearMade_blade, blade.Material AS Material_blade, blade.Smith, hilt.YearMade AS YearMade_hilt, hilt.HandleMaterial, hilt.Handedness, guard.Material AS Material_guard, guard.GuardType, pommel.PommelType, pommel.AttatchementMethod, pommel.Material AS Material_pommel FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID';
    
    if (location != ''){
        q_merge = q_merge + ' AND sword.CurrentLocation LIKE ' + '"' + location + '%"';
    }
    
    if (typo != ''){
        q_merge = q_merge + ' AND sword.TypologyID LIKE ' + '"' + typo + '%"';
    }
    
    if (country != ''){
        q_merge = q_merge + ' AND sword.CountryOfAssembly LIKE ' + '"' + country + '%"';
    }
    
    if (scab != ''){
        q_merge = q_merge + ' AND sword.Scabbard LIKE ' + '"' + scab + '%"';
    }
    
    q_merge += ';';

    
    //Connect to database
    connection.query(q_merge, function(error, result) {
        if (error) throw error;
        
        //Create blank array for storing values for each attribute
        var currentlocation = [];
        var typologyid = [];
        var countryofassembly = [];
        var scabbard = [];
        var tangtype = [];
        var length = [];
        var maxwidth = [];
        var type = [];
        var countryoforigin = [];
        var yearmade_blade = [];
        var material_blade = [];
        var smith = [];
        var yearmade_hilt = [];
        var handlematerial = [];
        var handedness = [];
        var guardtype = [];
        var material_guard = [];
        var pommeltype = [];
        var attatchementmethod = [];
        var material_pommel = [];
        

        
        // Insertion
        for (var i = 0; i < result.length; i++){
            currentlocation.push(result[i].CurrentLocation);
            typologyid.push(result[i].TypologyID);
            countryofassembly.push(result[i].CountryOfAssembly);
            scabbard.push(result[i].Scabbard);
            tangtype.push(result[i].TangType);
            length.push(result[i].Length);
            maxwidth.push(result[i].MaxWidth);
            type.push(result[i].Type);
            countryoforigin.push(result[i].CountryOfOrigin);
            yearmade_blade.push(result[i].YearMade_blade);
            material_blade.push(result[i].Material_blade);
            smith.push(result[i].Smith);
            yearmade_hilt.push(result[i].YearMade_hilt);
            handlematerial.push(result[i].HandleMaterial);
            handedness.push(result[i].Handedness);
            material_guard.push(result[i].Material_guard);
            guardtype.push(result[i].GuardType);
            pommeltype.push(result[i].PommelType);
            attatchementmethod.push(result[i].AttatchementMethod);
            material_pommel.push(result[i].Material_pommel);
        }
        
        //Send data to front-end
        res.render("searchResult", {loop:result.length, CurrentLocation:currentlocation, TypologyID:typologyid, CountryOfAssembly:countryofassembly, Scabbard:scabbard, TangType:tangtype, Length:length, MaxWidth:maxwidth, Type:type, CountryOfOrigin:countryoforigin, YearMade_blade:yearmade_blade, Material_blade:material_blade, Smith:smith, YearMade_hilt:yearmade_hilt, HandleMaterial:handlematerial, Handedness:handedness, Material_guard:material_guard, GuardType:guardtype, PommelType:pommeltype, AttatchementMethod:attatchementmethod, Material_pommel:material_pommel});
    });
});



//Post to /add
app.post('/add', function(req, res) {
    var password = req.body.password;
    var sign = 0;
    var q = 'SELECT count(*) AS count FROM sword';
    
    if(password != "12345678"){
        sign = 1;
    }
    
    connection.query(q, function (error, results) {
        if (error) throw error;
        
        //Count the instances in sword table
        var count = results[0].count;
        
        //Send the count to data in HTML
        res.render("add", {data: count, sign:sign});
    });
    
});



//Post to /added
app.post('/added', function(req,res){
    console.log(req.body);
    
    var q = '';

    
    //Insert blade values
    if(req.body.yearmade_blade == ''){
        q = q + 'INSERT INTO blade(BID,TangType,Length,MaxWidth,Type,CountryOfOrigin,Material,Smith) VALUES (' + req.body.SID + ', "' + req.body.tangtype + '", ' + req.body.l + ', ' + req.body.maxwidth + ', "' + req.body.type + '", "' + req.body.countryoforigin + '", "' + req.body.material_blade + '", "' + req.body.smith + '"); ';
    }else{
        q = q + 'INSERT INTO blade VALUES (' + req.body.SID + ', "' + req.body.tangtype + '", ' + req.body.l + ', ' + req.body.maxwidth + ', "' + req.body.type + '", "' + req.body.countryoforigin + '", ' + req.body.yearmade_blade + ', "' + req.body.material_blade + '", "' + req.body.smith + '"); ';
    }

    
    //Insert hilt values
    if(req.body.yearmade_hilt == ''){
        q = q + 'INSERT INTO hilt(HID,HandleMaterial,Handedness) VALUES (' + req.body.SID + ', "' + req.body.handlematerial + '", "' + req.body.handedness + '"); ';
    }else{
        q = q + 'INSERT INTO hilt VALUES (' + req.body.SID +  ', ' + req.body.yearmade_hilt + ', "' + req.body.handlematerial + '", "' + req.body.handedness + '"); ';
    }
    
    //Insert sword values
    q = q + 'INSERT INTO sword VALUES (' + req.body.SID + ', ' + req.body.SID + ', ' + req.body.SID + ', "' + req.body.currentlocation + '", "' + req.body.typologyid + '", "' + req.body.countryofass + '", "' + req.body.scabbard + '"); ';
    
    //Insert guard values
    q = q + 'INSERT INTO guard VALUES (' + req.body.SID + ', ' + req.body.SID + ', "' + req.body.guardtype + '", "' + req.body.material_guard + '"); ';
    
    //Insert pommel values
    q = q + 'INSERT INTO pommel VALUES (' + req.body.SID + ', ' + req.body.SID + ', "' + req.body.pommeltype + '", "' + req.body.attatchementmethod + '", "' + req.body.material_pommel + '"); ';
    
    
    //Monitor of the SQL query
    console.log(q); 
    
    //Connect to database
    connection.query(q, function (error, results) {
        if (error) throw error;
    });
   
    res.send("You've successfully added the sword to the database");
});


//Post to /delete
app.post('/delete', function(req, res) {
    var password = req.body.password;
    var sign = 0;
    var q = 'SELECT count(*) AS count FROM sword';
    
    if(password != "12345678"){
        sign = 1;
    }
    
    connection.query(q, function (error, results) {
        if (error) throw error;
        
        //Count the instances in sword table
        var count = results[0].count;
        
        //Pass the count to data in HTML
        res.render("delete", {data: count, sign:sign});
    });

});


//Post to /deleted
app.post('/deleted', function(req,res){

    var q_delete = '';
    
    //Delete from pommel table
    q_delete = q_delete + 'DELETE FROM pommel WHERE PID = ' + req.body.SID_delete + '; ';
    
    //Delete from guard table
    q_delete = q_delete + 'DELETE FROM guard WHERE GID = ' + req.body.SID_delete + '; ';
    
    //Delete from sword table
    q_delete = q_delete + 'DELETE FROM sword WHERE SID = ' + req.body.SID_delete + '; ';
    
    //Delete from hilt table
    q_delete = q_delete + 'DELETE FROM hilt WHERE HID = ' + req.body.SID_delete + '; ';
    
    //Delete from blade table
    q_delete = q_delete + 'DELETE FROM blade WHERE BID = ' + req.body.SID_delete + '; ';
    
    
    //Connect to database
    connection.query(q_delete, function (error, results) {
        if (error) throw error;
    });
    
    res.send("You've successfully deleted the sword from the database");
});


//Post to /update
app.post('/update', function(req, res) {
    var password = req.body.password;
    var sign = 0;
    var q = 'SELECT count(*) AS count FROM sword';
    
    if(password != "12345678"){
        sign = 1;
    }
    
    connection.query(q, function (error, results) {
        if (error) throw error;
        
        //Count the instances in sword table
        var count = results[0].count;
        
        //Pass the count to data in HTML
        res.render("update", {data: count, sign:sign});
    });
    
});


//Post to /updated
app.post('/updated', function(req, res) {
    console.log(req.body);
    
    var q = '';
    var sign = 0;
    
    //Update attributes
    if(req.body.attri_update == 'CurrentLocation'){
        q = q + 'UPDATE sword SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE SID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'TypologyID'){
        q = q + 'UPDATE sword SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE SID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'CountryOfAssembly'){
        q = q + 'UPDATE sword SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE SID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'Scabbard'){
        q = q + 'UPDATE sword SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE SID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'TangType'){
        q = q + 'UPDATE blade SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE BID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'Length'){
        q = q + 'UPDATE blade SET ' + req.body.attri_update + '=' + req.body.update + ' WHERE BID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'MaxWidth'){
        q = q + 'UPDATE blade SET ' + req.body.attri_update + '=' + req.body.update + ' WHERE BID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'Type'){
        q = q + 'UPDATE blade SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE BID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'CountryOfOrigin'){
        q = q + 'UPDATE blade SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE BID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'YearMade_blade'){
        q = q + 'UPDATE blade SET ' + 'YearMade' + '="' + req.body.update + '" WHERE BID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'Material_blade'){
        q = q + 'UPDATE blade SET ' + 'Material' + '="' + req.body.update + '" WHERE BID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'Smith'){
        q = q + 'UPDATE blade SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE BID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'YearMade_hilt'){
        q = q + 'UPDATE hilt SET ' + 'YearMade' + '="' + req.body.update + '" WHERE HID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'HandleMaterial'){
        q = q + 'UPDATE hilt SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE HID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'Handedness'){
        q = q + 'UPDATE hilt SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE HID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'GuardType'){
        q = q + 'UPDATE guard SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE GID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'Material_guard'){
        q = q + 'UPDATE guard SET ' + 'Material' + '="' + req.body.update + '" WHERE GID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'PommelType'){
        q = q + 'UPDATE pommel SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE PID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'AttatchementMethod'){
        q = q + 'UPDATE pommel SET ' + req.body.attri_update + '="' + req.body.update + '" WHERE PID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'Material_pommel'){
        q = q + 'UPDATE pommel SET ' + 'Material' + '="' + req.body.update + '" WHERE PID=' + req.body.ID_update + ';';
    }else if(req.body.attri_update == 'NULL'){
        sign = 1;
    }
    
    
    connection.query(q, function (error, results) {
        if (error) throw error;
    });

    if(sign == 1){
        res.send("You've selected a wrong attribute!!!");
    }else{
        res.send("You've successfully updated the attribute");
    }
});


//Post to /adsearch
app.post('/adsearch', function(req, res){
    var q = '';
    var tangtype = [];
    var type = [];
    var countryoforigin = [];
    var material_blade = [];
    var handlematerial = [];
    var handedness = [];
    var guardtype = [];
    var material_guard = [];
    var pommeltype = [];
    var attatchementmethod = [];
    var material_pommel = [];
    
    
    //Query to find distinct values for specific attributes
    q = q + 'SELECT DISTINCT(TangType) FROM blade;';
    q = q + 'SELECT DISTINCT(Type) FROM blade;';
    q = q + 'SELECT DISTINCT(CountryOfOrigin) FROM blade;';
    q = q + 'SELECT DISTINCT(Material) AS Material_blade FROM blade;';
    q = q + 'SELECT DISTINCT(HandleMaterial) FROM hilt;';
    q = q + 'SELECT DISTINCT(Handedness) FROM hilt;';
    q = q + 'SELECT DISTINCT(GuardType) FROM guard;';
    q = q + 'SELECT DISTINCT(Material) AS Material_guard FROM guard;';
    q = q + 'SELECT DISTINCT(PommelType) FROM pommel;';
    q = q + 'SELECT DISTINCT(AttatchementMethod) FROM pommel;';
    q = q + 'SELECT DISTINCT(Material) AS Material_pommel FROM pommel;';
    
    //Connect to database
    connection.query(q, function (error, results) {
        if (error) throw error;
        
        //console.log(results);
        
        var i = 0;
        //Tang Type
        for(i = 0; i < results[0].length; i++){
            if(results[0][i].TangType != null){
                tangtype.push(results[0][i].TangType);
            }
        }
        
        //Type
        for(i = 0; i < results[1].length; i++){
            if(results[1][i].Type != null){
                type.push(results[1][i].Type);
            }
        }
        
        //Country of Origin
        for(i = 0; i < results[2].length; i++){
            if(results[2][i].CountryOfOrigin != null){
                countryoforigin.push(results[2][i].CountryOfOrigin);
            }
        }
        
        //Material_blade
        for(i = 0; i < results[3].length; i++){
            if(results[3][i].Material_blade != null){
                material_blade.push(results[3][i].Material_blade);
            }
        }
        
        //Handle Material
        for(i = 0; i < results[4].length; i++){
            if(results[4][i].HandleMaterial != null){
                handlematerial.push(results[4][i].HandleMaterial);
            }
        }
        
        //Handedness
        for(i = 0; i < results[5].length; i++){
            if(results[5][i].Handedness != null){
                handedness.push(results[5][i].Handedness);
            }
        }
        
        //Guard Type
        for(i = 0; i < results[6].length; i++){
            if(results[6][i].GuardType != null){
                guardtype.push(results[6][i].GuardType);
            }
        }
        
        //Material_Guard
        for(i = 0; i < results[7].length; i++){
            if(results[7][i].Material_guard != null){
                material_guard.push(results[7][i].Material_guard);
            }
        }
        
        //Pommel Type
        for(i = 0; i < results[8].length; i++){
            if(results[8][i].PommelType != null){
                pommeltype.push(results[8][i].PommelType);
            }
        }
        
        //Attatchement Method
        for(i = 0; i < results[9].length; i++){
            if(results[9][i].AttatchementMethod != null){
                attatchementmethod.push(results[9][i].AttatchementMethod);
            }
        }
        
        //Material_Pommel
        for(i = 0; i < results[10].length; i++){
            if(results[10][i].Material_pommel != null){
                material_pommel.push(results[10][i].Material_pommel);
            }
        }

       
        res.render("adsearch", {loop_tangtype:results[0].length, loop_type:results[1].length, loop_countryoforigin:results[2].length, loop_material_blade:results[3].length, loop_handlematerial:results[4].length, loop_handedness:results[5].length, loop_guardtype:results[6].length, loop_material_guard:results[7].length, loop_pommeltype:results[8].length, loop_attatchementmethod:results[9].length, loop_material_pommel:results[10].length, TangType:tangtype, Type:type, CountryOfOrigin:countryoforigin, Material_blade:material_blade, HandleMaterial:handlematerial, Handedness:handedness, GuardType:guardtype, Material_guard:material_guard, PommelType:pommeltype, AttatchementMethod:attatchementmethod, Material_pommel:material_pommel}); 
    });
});


//Post to /adsearch_result
app.post("/adsearch_result", function(req, res){
    // console.log(req.body);
    
    var length = req.body.Length;
    var maxwidth = req.body.MaxWidth;
    var tangtype = req.body.TangType;
    var type = req.body.Type;
    var countryoforigin = req.body.CountryOfOrigin;
    var yearmade = req.body.YearMade;
    var material_blade = req.body.Material_blade;
    var handlematerial = req.body.HandleMaterial;
    var handedness = req.body.Handedness;
    var guardtype = req.body.GuardType;
    var material_guard = req.body.Material_guard;
    var pommeltype = req.body.PommelType;
    var attatchementmethod = req.body.AttatchementMethod;
    var material_pommel = req.body.Material_pommel;
    
    
    // SQL query
    var q_merge = 'SELECT sword.CurrentLocation, sword.TypologyID, sword.CountryOfAssembly, sword.Scabbard, blade.TangType, blade.Length, blade.MaxWidth, blade.Type, blade.CountryOfOrigin, blade.YearMade AS YearMade_blade, blade.Material AS Material_blade, blade.Smith, hilt.YearMade AS YearMade_hilt, hilt.HandleMaterial, hilt.Handedness, guard.Material AS Material_guard, guard.GuardType, pommel.PommelType, pommel.AttatchementMethod, pommel.Material AS Material_pommel FROM sword, blade, hilt, guard, pommel WHERE sword.BID = blade.BID AND sword.HID = hilt.HID AND guard.HID = hilt.HID AND pommel.HID = hilt.HID';
    
    if (length != 'NULL'){
        if (length == '0-30'){
            q_merge = q_merge + ' AND blade.Length >= 0 AND blade.Length < 30';
        }else if (length == '30-60'){
            q_merge = q_merge + ' AND blade.Length >= 30 AND blade.Length < 60';
        }else if (length == '60-90'){
            q_merge = q_merge + ' AND blade.Length >= 60 AND blade.Length < 90';
        }else if (length == '90-120'){
            q_merge = q_merge + ' AND blade.Length >= 90 AND blade.Length < 120';
        }else if (length == '120+'){
            q_merge = q_merge + ' AND blade.Length >= 120';
        }
    }
    
    if (maxwidth != 'NULL'){
        if (maxwidth == '0-1'){
            q_merge = q_merge + ' AND blade.MaxWidth >= 0 AND blade.MaxWidth < 1';
        }else if (maxwidth == '1-2'){
            q_merge = q_merge + ' AND blade.MaxWidth >= 1 AND blade.MaxWidth < 2';
        }else if (maxwidth == '2-3'){
            q_merge = q_merge + ' AND blade.MaxWidth >= 2 AND blade.MaxWidth < 3';
        }else if (maxwidth == '3-4'){
            q_merge = q_merge + ' AND blade.MaxWidth >= 3 AND blade.MaxWidth < 4';
        }else if (maxwidth == '4-5'){
            q_merge = q_merge + ' AND blade.MaxWidth >= 4 AND blade.MaxWidth < 5';
        }else if (maxwidth == '5+'){
            q_merge = q_merge + ' AND blade.MaxWidth >= 5';
        }
    }
    
    if (yearmade != 'NULL'){
        if (yearmade == 'BC'){
            q_merge = q_merge + ' AND blade.YearMade < 0';
        }else if (yearmade == '0-500'){
            q_merge = q_merge + ' AND blade.YearMade >= 0 AND blade.YearMade < 500';
        }else if (yearmade == '500-1000'){
            q_merge = q_merge + ' AND blade.YearMade >= 500 AND blade.YearMade < 1000';
        }else if (yearmade == '1000-1500'){
            q_merge = q_merge + ' AND blade.YearMade >= 1000 AND blade.YearMade < 1500';
        }else if (yearmade == '1500+'){
            q_merge = q_merge + ' AND blade.YearMade >= 1500';
        }
    }
    
    if (tangtype != 'NULL'){
        q_merge = q_merge + ' AND blade.TangType = ' + '"' + tangtype + '"';
    }
    
    if (type != 'NULL'){
        q_merge = q_merge + ' AND blade.Type = ' + '"' + type + '"';
    }
    
    if (countryoforigin != 'NULL'){
        q_merge = q_merge + ' AND blade.CountryOfOrigin = ' + '"' + countryoforigin + '"';
    }
    
    if (material_blade != 'NULL'){
        q_merge = q_merge + ' AND blade.Material = ' + '"' + material_blade + '"';
    }
    
    if (handlematerial != 'NULL'){
        q_merge = q_merge + ' AND hilt.HandleMaterial = ' + '"' + handlematerial + '"';
    }
    
    if (handedness != 'NULL'){
        q_merge = q_merge + ' AND hilt.Handedness = ' + '"' + handedness + '"';
    }
    
    if (guardtype != 'NULL'){
        q_merge = q_merge + ' AND guard.GuardType = ' + '"' + guardtype + '"';
    }
    
    if (material_guard != 'NULL'){
        q_merge = q_merge + ' AND guard.Material = ' + '"' + material_guard + '"';
    }
    
    if (pommeltype != 'NULL'){
        q_merge = q_merge + ' AND pommel.PommelType = ' + '"' + pommeltype + '"';
    }
    
    if (attatchementmethod != 'NULL'){
        q_merge = q_merge + ' AND pommel.AttatchementMethod = ' + '"' + attatchementmethod + '"';
    }
    
    if (material_pommel != 'NULL'){
        q_merge = q_merge + ' AND pommel.Material = ' + '"' + material_pommel + '"';
    }
    
    q_merge += ';';
    
    
    //Connect to database
    connection.query(q_merge, function(error, result) {
        if (error) throw error;
        
        //Create blank array for storing values for each attribute
        var currentlocation = [];
        var typologyid = [];
        var countryofassembly = [];
        var scabbard = [];
        var tangtype = [];
        var length = [];
        var maxwidth = [];
        var type = [];
        var countryoforigin = [];
        var yearmade_blade = [];
        var material_blade = [];
        var smith = [];
        var yearmade_hilt = [];
        var handlematerial = [];
        var handedness = [];
        var guardtype = [];
        var material_guard = [];
        var pommeltype = [];
        var attatchementmethod = [];
        var material_pommel = [];

        
        // For sword table
        for (var i = 0; i < result.length; i++){
            currentlocation.push(result[i].CurrentLocation);
            typologyid.push(result[i].TypologyID);
            countryofassembly.push(result[i].CountryOfAssembly);
            scabbard.push(result[i].Scabbard);
            tangtype.push(result[i].TangType);
            length.push(result[i].Length);
            maxwidth.push(result[i].MaxWidth);
            type.push(result[i].Type);
            countryoforigin.push(result[i].CountryOfOrigin);
            yearmade_blade.push(result[i].YearMade_blade);
            material_blade.push(result[i].Material_blade);
            smith.push(result[i].Smith);
            yearmade_hilt.push(result[i].YearMade_hilt);
            handlematerial.push(result[i].HandleMaterial);
            handedness.push(result[i].Handedness);
            material_guard.push(result[i].Material_guard);
            guardtype.push(result[i].GuardType);
            pommeltype.push(result[i].PommelType);
            attatchementmethod.push(result[i].AttatchementMethod);
            material_pommel.push(result[i].Material_pommel);
        }
        
        res.render("adsearchResult", {loop:result.length, CurrentLocation:currentlocation, TypologyID:typologyid, CountryOfAssembly:countryofassembly, Scabbard:scabbard, TangType:tangtype, Length:length, MaxWidth:maxwidth, Type:type, CountryOfOrigin:countryoforigin, YearMade_blade:yearmade_blade, Material_blade:material_blade, Smith:smith, YearMade_hilt:yearmade_hilt, HandleMaterial:handlematerial, Handedness:handedness, Material_guard:material_guard, GuardType:guardtype, PommelType:pommeltype, AttatchementMethod:attatchementmethod, Material_pommel:material_pommel});
    });
});




//Inspection
app.listen(8080, function(){
    console.log("App running on port 8080!");
});