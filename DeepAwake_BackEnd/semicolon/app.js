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

    //Create: 삽입 수행4
    var sql = 'INSERT INTO User (UserEmail,UserPwd,UserName,UserAge) VALUES (?,?,?,?)';
    var params = [userEmail, userPwd, userName,userAge];

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
   // var userEmail = req.body.userEmail;
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
        var latitude = req.body.lat;
        var longitude = req.body.lon;
        var datetime = req.body.datentime;
        var address = req.body.location;
        var weather = req.body.weather;
        var temperature = req.body.temperature;
        var humidity = req.body.humidity;

        // 운전 레코드 삽입 퀴리 작성
        var sql = 'INSERT INTO driverrecord (Latitude,Longitude,Datetime,Address,Weather,Temperature,Humidity) VALUES (?,?,?,?,?,?,?)';
        var params = [latitude, longitude, datetime,address,weather,temperature,humidity];

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
    console.log(req.body);
   
    var latitude = [];
    var longitude = [];
    var datetime = [];
    var address = [];
    var weather = [];
    var temperature = [];
    var humidity = [];

    //var sql = 'select * from example.columns where table_name = driverrecord';
    //var sql = 'select * from driverrecord';
    var sql ='select * from driverrecord order by Datetime DESC';
    
    //connection.query(sql,function(err,result){
    connection.query(sql,function(err,rows,fields){
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
            //for(var i=rows.length-1 ; i=0 ; i--){
                console.log(rows[i].Latitude+ " , "+ rows[i].Longitude +" , "+rows[i].Datetime+" , "+rows[i].Address+" , "+rows[i].Weather+" , "+rows[i].Temperature+" , "+rows[i].Humidity);


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

            
        res.json({
            "code": resultCode,
            "message":message,
            "lat":latitude,
            "lon":longitude,
            "datentime":datetime,
            "location":address,
            "weather":weather,
            "temperature":temperature,
            "humidity":humidity
        });

        }
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

