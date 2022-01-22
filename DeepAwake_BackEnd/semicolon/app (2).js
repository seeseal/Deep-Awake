var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
const { url } = require('inspector');
const { report } = require('process');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.listen(3000, 'localhost', function () {
app.listen(3000,function () {
    console.log('서버 실행 중...');
});

var connection = mysql.createConnection({
    //host: "localhost",
    // user: "root",
    // database: "example",
    // password: "1234",
    //port: 3306
    // host: "192.168.219.118", //탐탐 카폐
    // user: "root",
    // database: "example",
    // password: "1234",
    // port: 3306
  

    //aws!!
    host: "wordpress.cit39swhzanb.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    database: "wordpress",
    password: "semicolon",
    port: 3306

});




//req:client(안드로이드)에서 전송 받은 request 데이터
//res: server(nodejs)가 client 로 보낼 response 데이터
app.post('/user/register', function(req,res){
    console.log(req.body);
    var userEmail = req.body.userEmail;
    var userPwd = req.body.userPwd;
    var userName = req.body.userName;
    var userAge = req.body.userAge;
    var guardiannumber = req.body.guardiannumber;

    //Create: 삽입 수행4
    var sql = 'INSERT INTO User (UserEmail,UserPwd,UserName,UserAge,GuardianNum) VALUES (?,?,?,?,?)';
    var params = [userEmail, userPwd, userName,userAge,guardiannumber];

    //sql문의 ? 는 두번째 매개 변수로 넘겨진 params의 값으로 치환된다.
    connection.query(sql,params,function(err,result){
        var resultCode =404;
        var message = 'client측에서 오류가 발생하였습니다.';

        if(err){
            console.log(err);
        }else{
            resultCode = 200;
            message = '회원가입에 성공했습니다.';
        }

        res.json({
            'code':resultCode,
            'message':message
        });

    });

});




app.post('/user/login', function(req,res){
    console.log(req.body);
    var userEmail = req.body.userEmail;
    var userPwd = req.body.userPwd;
    var sql = 'select * from User where UserEmail =?';

    connection.query(sql, userEmail,function(err,result){
        var resultCode = 404;
        var message = 'client측에서 오류가 발생하였습니다.';

        if(err){
            console.log(err);
        }else{
            if(result.length ==0){ 
                resultCode =204;
                message ='존재하지 않는 계정입니다!';
            }else if(userPwd !== result[0].UserPwd){
                resultCode = 204;
                message = '비밀번호가 틀렸습니다!';
            }else{
                resultCode = 200;
                message = '로그인 성공! '+ result[0].UserName + '님 환영합니다!';
            }

        }
           
        res.json({
            'code': resultCode,
            'message': message

        });


    })


})


//MainActivity들어갈때 ~님 환영합니다 문구에서 유저 이름 받아오기
//req로 보내는것은 이메일, res로 받아야하는 것을 이메일주소의 username
app.get('/user/init',function(req,res){
    console.log(req.body);

    var userEmail = req.query.userEmail;
    var sql = "select UserName from User where UserEmail = ?;";

    connection.query(sql,userEmail,function(err,result){
        var resultCode = 404;
        var message = 'client측에서 오류가 발생하였습니다.';
    

        if(err){
            console.log(err);
        }else{
            resultCode =200;
            message = "성공적으로 이름을 받아왔습니다" ;
            user_name = result[0].UserName ; //email주소유저의 이름
        }

        res.json({
            'code': resultCode,
            "message":message,
            "username": user_name
        });


    })



})


app.post('/user/reportrecord',function(req,res){
        console.log(req.body);

        var useremail = req.body.useremail; //%
        var latitude = req.body.lat;
        var longitude = req.body.lon;
        var datetime = req.body.datentime;
        var address = req.body.location;
        var weather = req.body.weather;
        var temperature = req.body.temperature;
        var humidity = req.body.humidity;

        var pm10value = req.body.pm10Value;
        var pm25value = req.body.pm25Value;
        var so2value = req.body.so2Value;
        var covalue = req.body.coValue;
        var o3value = req.body.o3Value;
        var no2value = req.body.no2Value;
        var pm10grade = req.body.pm10Grade;
        var pm25grade = req.body.pm25Grade;
        var so2grade = req.body.so2Grade;
        var cograde = req.body.coGrade;
        var o3grade = req.body.o3Grade;
        var no2grade = req.body.no2Grade;




        // 운전 레코드 삽입 퀴리 작성
        //var sql = 'INSERT INTO driverrecord (Latitude,Longitude,Datetime,Address,Weather,Temperature,Humidity,Pm10value,Pm25value,So2value,Covalue,O3value,No2value,Pm10grade,Pm25grade,So2grade,Cograde,O3grade,No2grade) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )';
        
        //쿼리문 다시 짜기 조건: 현재 사용자 이메일도 같이 저장해준다./%
        var sql = 'INSERT INTO driverrecord (UserEmail,Latitude,Longitude,Datetime,Address,Weather,Temperature,Humidity,Pm10value,Pm25value,So2value,Covalue,O3value,No2value,Pm10grade,Pm25grade,So2grade,Cograde,O3grade,No2grade) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )';

        var params = [useremail,latitude, longitude, datetime,address,weather,temperature,humidity,pm10value,pm25value,so2value,covalue,o3value,no2value,pm10grade,pm25grade,so2grade,cograde,o3grade,no2grade];

        //sql문의 ? 는 두번째 매개 변수로 넘겨진 params의 값으로 치환된다.
        connection.query(sql,params,function(err,result){
        var resultCode =404;
        var message = 'client측에서 오류가 발생하였습니다.';

        if(err){
            console.log(err);
        }else{
            resultCode = 200;
            message = '운전 리코드 삽입에 성공했습니다.';
        }

        res.json({
            'code':resultCode,
            'message':message
        });

    });

});

app.get('/user/reportrecord',function(req,res){

    console.log(req.query.useremail+" is email");

   var useremail = req.query.useremail; //%
    var latitude = [];
    var longitude = [];
    var datetime = [];
    var address = [];
    var weather = [];
    var temperature = [];
    var humidity = [];

    var pm10value =[];
    var pm25value =[];
    var so2value =[];
    var covalue=[];
    var o3value =[];
    var no2value=[];
    var pm10grade=[];
    var pm25grade=[];
    var so2grade=[];
    var cograde =[];
    var o3grade=[];
    var no2grade=[];


    
    //var sql ='select * from driverrecord order by Datetime DESC';


    //쿼리문 다시 짜기  조건: 현재 사용자 이메일인 레코드만 들고 오기 //%
    var sql ="select Latitude,Longitude,Datetime,Address,Weather,Temperature,Humidity,Pm10value,Pm25value,So2value,Covalue,O3value,No2value,Pm10grade,Pm25grade,So2grade,Cograde,O3grade,No2grade from driverrecord where UserEmail=? order by Datetime DESC;";
    
    
    //connection.query(sql,function(err,rows,result){
    connection.query(sql,useremail,function(err,rows,result){ //fields ->result
        var resultCode = 404;
        var message = 'client측에서 오류가 발생하였습니다.';

        if(err){
            console.log(err);
        }else{
            
            resultCode =200;
            message ="성공적으로 운전자 레코드를 받아왔습니다." ;
            // latitude = result[0].Latitude;
            // longitude = result[0].Longitude;
            // datetime = result[0].Datetime;
            // address = result[0].Address;
            // weather = result[0].Weather;
            // temperature = result[0].Temperature;
            // humidity = result[0].Humidity;

            for(var i=0 ; i<rows.length ; i++){
                console.log(rows[i].Latitude+ " , "+ rows[i].Longitude +" , "+rows[i].Datetime+" , "+rows[i].Address+" , "+rows[i].Weather+" , "+rows[i].Temperature+" , "+rows[i].Humidity+" ,  "+rows[i].Pm10value+" ,"+rows[i].Pm25value+" ,"+rows[i].So2value+" ,  "+rows[i].Covalue+" ,"+rows[i].O3value+" ,"+rows[i].No2value+","+rows[i].Pm10grade+" ,  "+rows[i].Pm25grade+" ,"+rows[i].So2grade+" ,"+rows[i].Cograde+" ,"+rows[i].O3grade+" ,"+rows[i].No2grade);


                //마지막에 저장된 데이터만 들어감
                //latitude = rows[i].Latitude;
                // longitude = rows[i].Longitude;
                // datetime = rows[i].Datetime;
                // address = rows[i].Address;
                // weather = rows[i].Weather;
                // temperature = rows[i].Temperature;
                // humidity = rows[i].Humidity;


                //리스트들에 대입해줘야 됨 -> 안하면 마지막에 출력된 데이터만 남는다..
                latitude.push(rows[i].Latitude);
                longitude.push(rows[i].Longitude);
                datetime.push(rows[i].Datetime);
                address.push(rows[i].Address);
                weather.push(rows[i].Weather);
                temperature.push(rows[i].Temperature);
                humidity.push(rows[i].Humidity);

                pm10value.push(rows[i].Pm10value);
                pm25value.push(rows[i].Pm25value);
                so2value.push(rows[i].So2value);
                covalue.push(rows[i].Covalue);
                o3value.push(rows[i].O3value);
                no2value.push(rows[i].No2value);
                pm10grade.push(rows[i].Pm10grade);
                pm25grade.push(rows[i].Pm25grade);
                so2grade.push(rows[i].So2grade);
                cograde.push(rows[i].Cograde);
                o3grade.push(rows[i].O3grade);
                no2grade.push(rows[i].No2grade);

            }

            console.log(resultCode);
            console.log(message);
            console.log(latitude);
            console.log(longitude);
            console.log(datetime);
            console.log(address);
            console.log(weather);
            console.log(temperature);
            console.log(humidity);

            console.log(pm10value);
            console.log(pm25value);
            console.log(so2value);
            console.log(covalue);
            console.log(o3value);
            console.log(no2value);
            console.log(pm10grade);
            console.log(pm25grade);
            console.log(so2grade);
            console.log(cograde);
            console.log(o3grade);
            console.log(no2grade);

            
        res.json({
            "code": resultCode,
            "message":message,
            "lat":latitude,
            "lon":longitude,
            "datentime":datetime,
            "location":address,
            "weather":weather,
            "temperature":temperature,
            "humidity":humidity,

            "pm10Value":pm10value,
            "pm25Value":pm25value,
            "so2Value":so2value,
            "coValue":covalue,
            "o3Value":o3value,
            "no2Value":no2value,
            "pm10Grade":pm10grade,
            "pm25Grade":pm25grade,
            "so2Grade":so2grade,
            "coGrade":cograde,
            "o3Grade":o3grade,
            "no2Grade":no2grade

        });

        }
    });

});



//회원 정보 수정페이지, 회원 정보 출력해주는 api
app.get('/user/getsettinginfo', function(req,res){ 
    console.log(req.query.USEREMAIL+" is useremail ");

    var USEREMAIL = req.query.USEREMAIL; //req로 받아온 유저 이메일
    var useremail;
    var userpwd;
    var username;
    var userage;
    

    var sql ='select * from User where UserEmail =? ';

    connection.query(sql,USEREMAIL,function(err,result){
        var resultCode = 404;
        var message = 'client측에서 오류가 발생하였습니다.';

        if(err){
            console.log(err);
        }else{
            
            resultCode =200;
            message ="성공적으로 운전자 회원 정보를 받아왔습니다." ;
            useremail = result[0].UserEmail ; 
            userpwd = result[0].UserPwd ; 
            username = result[0].UserName ; 
            userage = result[0].UserAge ; 


            res.json({
            'code':resultCode,
            'message':message,
            'useremail':useremail,
            'userpwd':userpwd,
            'username':username,
            'userage':userage
            });


        }
    });

});


//사용자 회원정보 수정하는 api
app.put('/user/updateuserinfo',function(req,res){
    console.log(req.body.useremail +" 이메일");
    console.log(req.body.userpwd +" 비번");
    console.log(req.body.username+" 이름");
    console.log(req.body.userage+" 나이");

    var useremail= req.body.useremail;
    var userpwd= req.body.userpwd;
    var username= req.body.username;
    var userage= req.body.userage;


    var sql ="UPDATE User SET UserPwd =? , UserName =? , UserAge=? where UserEmail =? ;"

    var params =[userpwd,username,userage,useremail];

    connection.query(sql,params,function(err,result){
        var resultCode = 404;
        var message = 'client측에서 오류가 발생하였습니다.';

        if(err){
            console.log(err);
        }else{
            
            var resultCode = 200;
            var message = '회원정보가 수정되었습니다';
        
           
        
            res.json({
                'code': resultCode,
                'message': message
        
            });

        }
    });

});



app.get('/user/guardiannumber', function(req,res){
    console.log(req.query.USEREMAIL+" is useremail ");


    var USEREMAIL = req.query.USEREMAIL; //req로 받아온 유저 이메일
    var guardiannumber;


    var sql ='select GuardianNum from User where UserEmail =? ';

    connection.query(sql, USEREMAIL, function(err,result){
        var resultCode = 404;
        var message = 'client측에서 오류가 발생하였습니다.';

        if(err){
            console.log(err);
        }else{
            resultCode =200;
            message ="성공적으로 보호자 번호를 받아왔습니다." ;
            guardiannumber = result[0].GuardianNum;
            console.log("보호자 번호: " + guardiannumber);


            res.json({
                'code':resultCode,
                'message':message,
                'guardiannumber':guardiannumber
            });

        }

    });

});

app.post('/user/guardiannumber',function(req,res){
    console.log(req.query.USEREMAIL+" is useremail ");
    console.log(req.body.GuardianNumber+" guardian number ");

    var USEREMAIL = req.query.USEREMAIL; //req로 받아온 유저 이메일
    var guardiannumber = req.body.GuardianNumber;

    var sql ='INSERT INTO User (GuardianNum) VALUES (?) where UserEmail =? ';
    var params = [guardiannumber,USEREMAIL];

    //sql문의 ? 는 두번째 매개 변수로 넘겨진 params의 값으로 치환된다.
    connection.query(sql,params,function(err,result){

        var resultCode =404;
        var message = 'client측에서 오류가 발생하였습니다.';

        if(err){
            console.log(err);
        }else{
            resultCode = 200;
            message = '보호자 번호 저장에 성공했습니다.';
        }

        res.json({
            'code':resultCode,
            'message':message
        });


    });

});





app.post('/user/eeg/train_raw',function(req,res){
    console.log(req.body.RAW);
   
    
    var resultCode = 200;
    var message = '성공!';

   

    res.json({
        'code': resultCode,
        'message': message

    });

});


app.post('/user/eeg/train_eeg',function(req,res){
    console.log(req.body);
    console.log(req.body["delta"]);
   
    



    var resultCode = 200;
    var message = '성공!';

    res.json({
        'code': resultCode,
        'message': message

    });

});

app.post('/user/eeg/attention',function(req,res){
    console.log(req.body);
   
    
    var resultCode = 200;
    var message = '성공!';

   

    res.json({
        'code': resultCode,
        'message': message

    });

});

app.post('/user/eeg/meditation',function(req,res){
    console.log(req.body);
   
    
    var resultCode = 200;
    var message = '성공!';

   

    res.json({
        'code': resultCode,
        'message': message

    });

});

app.post('/user/eeg/blink',function(req,res){
    console.log(req.body);
   
    
    var resultCode = 200;
    var message = '성공!';

   

    res.json({
        'code': resultCode,
        'message': message

    });

});



