# Deep Awake
뇌파를 활용한 AI 기반 졸음 예방 어플리케이션

## 목차
1. [설계 목표](#1-설계-목표)  
1.1 [개발 목적](#11-개발-목적)   
1.2 [개발 필요성](#12-개발-필요성)   
1.3 [기대 효과](#13-기대-효과)
2. [설계 내용](#2-설계-내용)   
2.1 [설계 계획](#21-설계-계획)   
2.2 [실제 구현 내용](#22-실제-구현-내용)    
2.2.1 [메뉴 및 기능](#221-메뉴-및-기능)  
2.2.2 [서비스 흐름도](#222-서비스-흐름도)     
2.2.3 [CNN 모델링](#223-CNN-모델링)   
2.2.4 [졸음 예측 모델링 수행](#224-졸음-예측-모델링-수행)   
2.2.5 [개발 환경](#225-개발-환경)  
3. [참고 문헌](#3-참고-문헌)

## 1. 설계 목표

### 1.1 개발 목적

자체 개발한 ‘Deep Awake’는 운전자의 뇌파를 측정하여 졸음 판단 알고리즘을 통해, 운전 시 운전자의 졸음 여부를 판단하므로 해당 운전자의 졸음 상태를 높은 정확도로 감하여, 졸음 방지 기능들을 실행시켜줌으로써 동승자 없이도 졸음운전 사고 예방을 목적으로 개발하였다.

### 1.2 개발 필요성

1) 졸음운전에 의한 사고 발생 비율
- 졸음은 수면에 대한 욕구로 인하여 각성 상태에서 수면으로 진행되는 과정에서 생기는 인식 장애 상태로 정의된다. 최근 3년간 고속도로 교통사고 사망자 10명 중 7명이 졸음이나 주시 태만으로 목숨을 잃은 것으로 나타난다. 한국교통안전공단과 한국도로공사가 29일 발표한 ‘최근 3년 고속도로 교통사고 현황 분석 결과’에 따르면, 2017~2019년 도로공사가 운영하는 재정고속도로에서 교통사고로 사망한 618명 중 428명(69.4%)이 ‘졸음·주시 태만’으로 사고를 당했다.  
![image01](https://user-images.githubusercontent.com/57719617/150774223-efc50cfe-e052-4b9a-8fd7-da573675ebee.png)  
[표 1] 고속도로 교통사고 원인별 사망자 현황  

2) 딥러닝 기반 안구 인식기술의 한계점
- 시중에 상용화되어있는 어플은 스마트폰 전면 카메라를 통해 얼굴의 눈 깜박임을 인식하여 졸음 상태를 알려준다.
- 안구 움직임 측정 장치는 주변의 조명, 바람, 습도 등에 의한 영향으로 늘 정확한 결과를 얻기 어렵다. 또한 눈동자의 움직임과 근육의 변화로 졸음을 감지하는 방법은 졸음이 상당히 진행된 상태가 되어야 정확한 진단이 가능하므로 졸음 상태의 빠른 진단에 활용하기에는 어려움이 있다.
- 더 나아가 눈동자 변화, 눈꺼풀 변화량, 시선방향 등을 종합적으로 판단해야 한다는 단점이 있다.

3) 작품의 필요성
- 졸음운전 경험이 있는 운전자들은 졸음운전에 대해 경각심을 가지지만 실제로 졸음이 온 상황에서는 대처하기가 힘들다. 이 어플이 깔려있다면 운전자의 뇌파 상태를 선제적으로 파악하고 그에 따른 조치를 취해주기 때문에 운전자는 졸음운전에 대한 부담을 덜고 운전할 수 있다.

### 1.3 기대 효과

1) 졸음운전 경고를 통해 사고 예방 가능
- 졸음 상태를 구분해 알람 재생을 하는 본 프로젝트의 알고리즘을 활용하면 졸음 운전으로 인한 교통사고 등 안전사고 발생률을 감소시키는 데 크게 기여 가능할 것으로 기대된다.

2) GPS 기능을 활용한 휴게소 안내
- 알고리즘 수행 결과 졸음 상태의 결괏값을 전송 받았을 경우, 본 프로젝트는 구글맵 API를 이용하여 인근 휴게소 정보를 알려주며 경로 안내를 시작한다.

3) 뇌파 서비스 제공의 다양성
- 본 프로젝트와 같은 뇌파 분석 결과를 통해 운전자의 안전뿐 아니라 게임 및 산업체 등 다양한 방면으로 뇌파 분석 시스템 활용이 가능하다.
- 뇌파는 뇌세포 사이에 오고 가는 미세한 전기 신호 파동으로 뇌 과학이 발전하면서 측정할 수 있게 되었다. 이는 뇌 질환을 진단하는 의학이나 인간의 마음을 읽는 심리학, 언어 능력 연구 등 다양한 분야에서 활용되고 있어, 향후 더 다양한 상태의 뇌파 형태를 분석, 가공 시 4차 산업 혁명 시대에 맞는 다양한 뇌파 서비스를 제공할 수 있을 것으로 기대된다.

4) 운전자와의 동승자 역할 실행
- 졸음 운전을 예방할 수 있는 방법 중 하나는 동승자가 옆에서 졸음에 빠질 때 깨워주거나 경각심을 알리는 것이다. 하지만 운전자는 졸음 상태에서 졸음을 인지하지 못하기 때문에 혼자서는 졸음에서 벗어나기 힘들다. 따라서 본 프로젝트는 운전자와의 상호작용을 통해 졸음 퇴치 기능을 수행해 동승자 역할을 실행한다.
- 졸음이 인식되면 보호자로 입력한 전화번호로 문자도 전송함으로 운전자가 홀로 사고에 처하는 위험을 미연에 방지하는 여러 안전장치를 제공한다.

## 2. 설계 내용

### 2.1 설계 계획

1) 졸음 판단 알고리즘
- CNN 알고리즘을 기반으로 학습된 모델로 해당 EEG 신호를 판별하여 해당 신호가 응급 상황일 경우 AWS EC2의 서버로 전송하였다.

2) 사용자와 의사소통을 위한 음성인식 기술
- STT란 음성 언어를 컴퓨터가 해석해 문자로 전환하는 기능이며 사용자가 음성을 이용해 졸음 퇴치 기능에 대한 제어를 적용 가능하도록 하였다.

3) 공공 데이터 이용
- 실시간으로 openweathermap과 airkorea에서 날씨 정보와 대기질 정보를 파싱하여 사용자에게 정보를 제공하기 위하여 공공 데이터를 이용하였다.

4) 뇌파 데이터 전처리 기술
- 정상상태와 졸음 상태의 뇌파 데이터를 추출하여 6:2:2의 비율로 train, validation, test 데이터 셋으로 나눠서 사용하였다.

### 2.2 실제 구현 내용

#### 2.2.1 메뉴 및 기능

‘Deep Awake’ 어플은 운전자의 뇌파를 측정하여 졸음 판단 알고리즘을 통해, 운전자의 졸음 여부를 판단한다. 졸음으로 판단 시 졸음 퇴치 기능 2가지를 제공한다. [그림 1]과 [그림 2]는 프로젝트의 순서와 흐름을 설명하고, [표 2]는 기능에 대한 상세 설명을 나타낸다.  

![image02](https://user-images.githubusercontent.com/57719617/150776396-a6d2ada4-7637-4709-b6e7-541eeb1198e3.png)  
[그림 1] 운전자 중심 프로젝트 흐름도  

![image03](https://user-images.githubusercontent.com/57719617/150776443-b97cd095-f156-46c9-8aba-8bf7a0e13bd9.png)  
[그림 2] 프로젝트 전체 흐름도  
[표 2] 전체 기능 목록  
[표 3]  
![1](https://user-images.githubusercontent.com/57719617/150778753-75ced89e-5687-4f1f-8e81-48af62f78d9f.jpg)  
![2](https://user-images.githubusercontent.com/57719617/150778758-a3b881b3-3cd0-485e-8d60-2bef6932c017.jpg)  
![3](https://user-images.githubusercontent.com/57719617/150778761-64bce9fc-ff57-414f-be18-0a8f24c4a39f.jpg)  
![4](https://user-images.githubusercontent.com/57719617/150778764-a169564a-6084-4a85-b3a7-3b0fdb90c28e.jpg)  
![5](https://user-images.githubusercontent.com/57719617/150778766-cb963831-09e9-4dfa-b0bc-fa889f2e9ff5.jpg)  
[시연 사진]  

![image04](https://user-images.githubusercontent.com/57719617/150776723-7a5ba0aa-3beb-4b67-afb5-b889a2626926.png)  
[메뉴 구성도]


#### 2.2.2 서비스 흐름도
![image05](https://user-images.githubusercontent.com/57719617/150776728-f94b63bd-e5cf-4bb4-af63-bad23188cc60.png)  
[서비스 흐름도]  

#### 2.2.3 CNN 모델링

 CNN은 신경망에 전처리를 추가한 다층 퍼셉트론의 한 종류이다. 이는 방대한 데이터를 훈련시키기 용이하다는 장점을 가지며 이미지, 동영상, 음성 학습에 많이 사용되는 알고리즘이다. CNN을 사용한 이유는 convolution layer와 Max pooling layer를 반복적으로 쌓아서 특징을 추출하는 방식이 뇌파의 노이즈를 제외하고 특징점만 추출하는데 용이하기 때문이다. 2차원 이미지의 경우 3개의 차원이 존재하지만 뇌파 데이터인 1차원 시계열 데이터는 feature dimension과 time_step으로 2개의 차원이 존재하므로 feature dimension을 채널로 이용한다. Conv1D 레이어는 위치에 상관없이 지역적인 특징을 잘 추출해 시계열에 적용하면 시계열의 데이터들을 보면서 특징을 잘 추출한다. 즉 이전 데이터를 보며 주요 특징을 추출하고, 그 중 가장 두드러지는 특징을 고르는 것이다. Conv1D방식으로 총 4번의 convolution layer과 3번의 Max Pooling layer를 거친 뒤 마지막 출력층에서 softmax가 0과1로 구성된 CNN 알고리즘을 구성하였다.  
ㅣㅣ|train|validation|test|totalㅣ
|----|---|-----|---ㅣ---ㅣ
ㅣ정상 상태|276,480|92,160|92,160ㅣ460,800ㅣ
|졸음 상태|184,320|61,440|61,440ㅣ307,200ㅣ  

 사용자의 졸음 상태 인식을 위한 데이터 수집을 위해, 성인 여성 4명이 프로젝트의 실험자로 진행되었다. 정상 상태의 데이터 추출을 위해 약 1분간 10회씩 가상 운전 시뮬레이션 게임을 하였고, 졸음 상태의 데이터 추출을 위해 피곤한 상태에서 약 1분간 10회 뇌파를 측정하였다. 뇌파의 Alpha, Theta, Delta, Beta, Gamma, Attention, Meditation 값 등 총 10개의 column으로 추출하였고 추출한 뇌파 데이터는 총 정상 상태 460,800개, 졸음 상태 307,200개이다. CNN 알고리즘에 적용된 데이터의 수는 정상 데이터 460,800개 중 60%에 해당하는 276,480개는 training set으로 20%에 해당하는 92,160개는 각각 validation set과 test set으로 사용되었다. 마찬가지로 졸음 데이터 307,200개를 6:2:2로 나누어 training set으로 184,320개, validation set, test set으로 각각 61,440개를 사용하였고 정확도는 85%를 보였다. 정상상태일 때를 0, 졸음 상태일 때를 1로 설정하여 결괏값을 받아왔다. cpu가 아닌 gpu를 활용하고자 했고, 구글에서 제공하는 colab gpu를 활용하였다.  
 ![image06](https://user-images.githubusercontent.com/57719617/150777128-60f36c75-f727-4c95-aaaa-18a2d765fc94.jpg)  
 [평상 시 뇌파와 졸음 시 뇌파]  
 
#### 2.2.4 졸음 예측 모델링 수행

Colab을 통해 실행하였으며 실시간으로 받아온 뇌파 데이터를 모델링의 데이터로 사용했다. CNN 모델을 이용하여 졸음 상태와 평상시 상태를 분류하여 판단하도록 구현하였다.
 평상시 데이터와 졸음 데이터를 train set으로 학습시킨 후 test set의 결과물을 살펴본 모습을 보여주는 사진이며 train set에 대한 학습은 예측 값과 실제 값이 거의 동일하게 나왔다. 

 test set에 대한 결과 값의 정확도를 높여주기 위하여 batch_size와 epochs 값을 조정한 결과 본 코드와 같은 조건이 정확도가 가장 높게 나왔다.

#### 2.2.5 개발 환경

![6](https://user-images.githubusercontent.com/57719617/150778991-ef63721d-7c06-4814-a415-069cf1314d24.jpg)  
[개발 환경]  

## 3. 참고 문헌

1) Stedman’s Medical Dictionary, 2008 Lippincott Williams & Wilkins.

2) 6-7 out of 10 highway traffic accident fatalities are drowsy driving or negligent driving (2020),https://www.yna.co.kr/view/AKR20200723118900530, Union News

3) Successfully developed an algorithm to catch drowsiness while driving (2019),
https://www.monews.co.kr/news/articleView.html?idxno=206758, Medical Observer

4) SeungGi Lee,YoungSu Kwon, Jisoo Park, Seoungjin Yun, and Won-Tae Kim, A Sleep-driving Accident Prevention System based on EEG analysis using Deep-learning Algorithm, Journal of The Institute of Electronics and Information Engineers Vol.55 , NO.3, March 2018, https://www.koreascience.or.kr/article/CFKO202133649172010.pdf

5) Ju-Won Seo, Wan-Tae Roh, Sang-Rak Lee, Rae-Hoon Jeong, Woongsup Kim, Drowsiness detection and prevention with Raspberry Pi, 2020 https://www.koreascience.or.kr/article/CFKO202133649172010.pdf
