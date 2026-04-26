import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "https://aicoderevieweronline.netlify.app/",
        process.env.CLIENT_URL
    ],
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/api/test", (req, res) => {
    res.json({ message: "Backend working" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
