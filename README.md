# LLM + STT Server

이 프로젝트는 Whisper를 활용한 음성 인식(STT)과 OpenAI GPT 모델을 통한 챗봇 기능을 제공합니다.

사용자는 음성 녹음을 통해 오디오 파일을 전송하여 텍스트로 변환하고, WebSocket을 통해 실시간 채팅 응답을 받을 수 있습니다.

## 기능 소개

### 1. Whisper 기반 음성 인식 (STT)

- '/stt' 엔드포인트에 오디오 파일을 업로드하면 텍스트로 변환해 응답합니다.
- 내부적으로는 ffmpeg로 들어온 음성 파일을 '.wav'로 변환 후 whisper 모델로 처리합니다.

### 2. WebSocket기반 GPT 챗봇

- 클라이언트는 WebSocket으로 서버에 연결한 후 메시지를 보내면, 서버는 GPT-4o(OpenAI)를 통해 응답을 생성해 전송합니다.

## 프로젝트 구조

- 'uploads/'로 받아온 음성 파일을 임시 저장
- server.js는 Express + WebSocket + OpenAI 통합 서버
- whisper.py는 Whisper + ffmpeg STT 변환 파일
- .env는 OpenAI API key 및 ffmpeg 경로

## FFmpeg 설치 및 환경설정 방법

Whisper 모델은 오디오 파일을 처리하기 위해 FFmpeg가 필요합니다. 다음 순서에 따라 설치하고 환경 설정을 해주세요.

### Windows

1. FFmepeg 공식 웹사이트 ffmpeg-git-essentials.7z zip 파일 다운로드
2. 다운로드한 zip 파일 압축 해제 (예: C:\ffmpeg)
3. 시스템 환경 변수 설정:
   - 제어판 -> 시스템 -> 고급 시스템 설정 -> 환경 변수
   - 시스템 변수에서 Path편집 -> ffmpeg의 bin파일 추가 (예: C:\ffmpeg\bin)
4. 적용 확인
   - 명령 프롬프트(cmd)에서 ffmpeg 입력 시 버전 정보가 출력되면 성공

## 실행 방법

1. 패키지 설치

```
npm install
```

2. .env 환경 설정

```
OPENAI_KEY=<your-apiKey>
FFMPEG_PATH=<FFMPEG bin폴더 경로>
```

3. 파이선 라이브러리 설치

```
pip install -r requirements.txt
```

4. 서버 실행

```
node server.js
또는
npm start
```

## 사용 기술 스택

- Express
- JavaScript
- WebSocket
- multer
- Whisper
