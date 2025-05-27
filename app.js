const express = require("express");
const { exec, execFile } = require("child_process");
const multer = require("multer");
const fs = require("fs");
const OpenAI = require("openai");
const WebSocket = require("ws");
const http = require("http");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const uploads = multer({ storage: storage });
const apiKey = process.env.OPENAI_KEY;

app.get("/", (req, res) => {
  res.send("LLM WebSocket Server is running.");
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chatMessage = async (message) => {
  const client = new OpenAI({ apiKey });
  const userMessage = message.toString().trim();

  const response = await client.responses.create({
    model: "gpt-4o",
    input: userMessage,
  });

  return response.output_text;
};

wss.on("connection", (ws) => {
  ws.on("message", async (message) => {
    try {
      ws.send(await chatMessage(message));
    } catch (error) {
      console.log(error);
      ws.send("죄송합니다. 답변을 생성하지 못했습니다. 다시 시도해 주세요.");
    }
  });

  ws.on("close", () => {
    console.log("클라이언트와 접속 닫힘");
  });
});

app.post("/stt", uploads.single("audio"), (req, res) => {
  const audioFilePath = req.file.path;
  const fixedPath = audioFilePath.replace(/\\/g, "/");

  if (!req.file) {
    return res.status(400).json({ error: "오디오 파일을 받지 못했습니다." });
  }

  execFile(
    "python",
    ["whisper_stt.py", fixedPath],
    { encoding: "utf8" },
    (error, stdout, stderr) => {
      setTimeout(() => {
        try {
          fs.unlinkSync(fixedPath);
          fs.unlinkSync(fixedPath + ".wav");
        } catch (err) {
          console.warn("파일 삭제 실패:", err.message);
        }
      }, 500);

      if (error) {
        console.error(`python 실행 중 에러: ${error}`);
        return res.status(500).json({ error: "내부 서버 오류" });
      }

      res.json({ text: stdout.trim() });
    }
  );
});

server.listen(3333, "0.0.0.0", () => {
  console.log("Server is running on http://localhost:3333");
});
