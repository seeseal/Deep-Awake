
package com.example.semicolonapp;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.example.semicolonapp.data.DataHolder;
import com.example.semicolonapp.data.GuardianNumber;
import com.example.semicolonapp.data.PostGuardianNumberResponse;
import com.example.semicolonapp.network.RetrofitClient;
import com.example.semicolonapp.network.ServiceApi;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SmsActivity extends AppCompatActivity {

    Button buttonSend;
    EditText textPhoneNo;
    static final int SMS_SEND_PERMISSION = 2;
    private ServiceApi service;//retrofit 관련

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.smsactivity);

        Log.i("phonenumuser", DataHolder.getUseremail());

        //권한이 부여되어 있는지 확인
        int permissonCheck = ContextCompat.checkSelfPermission(
                this, Manifest.permission.SEND_SMS);

        if (permissonCheck == PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(getApplicationContext(), "SMS 발신권한 있음", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(getApplicationContext(), "SMS 발신권한 없음", Toast.LENGTH_SHORT).show();

            if (ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.SEND_SMS)) {
                //이곳에 권한이 왜 필요한지 설명하는 Toast 혹은 dialog를 띄워준 후, 다시 권한을 요청한다.
                Toast.makeText(getApplicationContext(), "SMS 권한이 필요합니다", Toast.LENGTH_SHORT).show();
                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.SEND_SMS}, SMS_SEND_PERMISSION);
            } else {
                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.SEND_SMS}, SMS_SEND_PERMISSION);

            }
        }

        buttonSend = (Button) findViewById(R.id.buttonSend);
        textPhoneNo = (EditText) findViewById(R.id.editTextPhoneNo);
        service = RetrofitClient.getClient().create(ServiceApi.class); //RETROFIT 객체

        //버튼 클릭이벤트
        buttonSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //DataHolder.setPhonenumber(textPhoneNo.getText().toString());
                Log.i("phonenum", textPhoneNo.getText().toString());

                sendguardiannumber(DataHolder.getUseremail(), new GuardianNumber(textPhoneNo.getText().toString())); //사용자 이메일, 보호자 번호 같이 전달

                Intent intent = new Intent(SmsActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });
    }

    //시용자 db에 보호자 번호 같이 저장
    public void sendguardiannumber(String useremail, GuardianNumber guardnum){
        service.postGuardianNumber(useremail, guardnum).enqueue(new Callback<PostGuardianNumberResponse>() {
            @Override
            public void onResponse(Call<PostGuardianNumberResponse> call, Response<PostGuardianNumberResponse> response) {
                PostGuardianNumberResponse result = response.body();
                if(result.getCode()== 200){
                    Toast.makeText(SmsActivity.this, result.getMessage(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<PostGuardianNumberResponse> call, Throwable t) {
                Toast.makeText(SmsActivity.this, "보호자 번호 삽입 에러 발생", Toast.LENGTH_SHORT).show();
                Log.e("보호자 번호 삽입 에러 발생", t.getMessage());
                t.printStackTrace();
            }
        });


    }



    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int grantResults[]) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case SMS_SEND_PERMISSION:
                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    Toast.makeText(getApplicationContext(), "SMS 권한 승인함", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(getApplicationContext(), "SMS 권한 거부함", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }


}