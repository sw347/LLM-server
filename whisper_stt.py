import whisper
import sys
import os
import io
import subprocess
from dotenv import load_dotenv

load_dotenv()

os.environ["PATH"] += os.pathsep + os.getenv("FFMPEG_PATH")
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def convert_to_wav(file_path):
    output_path = file_path + ".wav"
    subprocess.run([
        "ffmpeg",
        "-y",
        "-i",
        file_path,
        "-ar", "16000",
        "-ac", "1",
        output_path], check=True)
    
    return output_path

def transcribe_audio(file_path):
    model = whisper.load_model("base")
    result = model.transcribe(file_path, language="ko")
    print(result["text"])
    
    return result["text"]

if __name__ == "__main__":
    audio_file = sys.argv[1]
    wav_file = convert_to_wav(audio_file)
    transcribe_audio(wav_file)