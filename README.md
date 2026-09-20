# Full-Stack Todo App

**Frontend (HTML/JS) + Backend (Node.js/Express) + Database (PostgreSQL)** — GitHub এ push করে Coolify তে Docker Compose হিসেবে deploy করার জন্য তৈরি একটা মিডিয়াম সাইজের টেস্ট প্রজেক্ট।

## এটা কী করে
- একটা Todo list app: টাস্ক যোগ, done mark, ডিলিট করা যায়
- সব ডাটা PostgreSQL এ persist হয় (server restart হলেও ডাটা থাকবে)
- `/health` route এ ডাটাবেস কানেকশন status দেখা যায়

## Local এ টেস্ট করতে চাইলে (Docker দরকার)

```bash
cd fullstack-app
docker compose up --build
```

তারপর ব্রাউজারে যান: `http://localhost:3000`

বন্ধ করতে: `docker compose down` (ডাটা থাকবে) অথবা `docker compose down -v` (ডাটাসহ মুছে যাবে)

## ধাপ ১: GitHub এ Upload

```bash
git init
git add .
git commit -m "Full-stack todo app with Postgres"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## ধাপ ২: Coolify তে Deploy (Docker Compose হিসেবে)

1. Coolify Dashboard → **New Resource** → **Docker Compose**
2. Source হিসেবে **GitHub** বেছে repository connect করুন
3. Coolify স্বয়ংক্রিয়ভাবে `docker-compose.yml` detect করবে (app + db দুইটা সার্ভিসই দেখাবে)
4. **Environment Variables** এ গিয়ে নিচেরগুলো সেট করুন (নিজের পছন্দমতো মান দিন, `.env.example` দেখুন):
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
5. `app` সার্ভিসের জন্য Domain সেট করুন (আগেরবার যেভাবে করেছিলেন), internal port `3000`
6. **Deploy** ক্লিক করুন

⚠️ **গুরুত্বপূর্ণ:** `db` সার্ভিসের জন্য কোনো public domain দেবেন না — এটা শুধু `app` এর সাথে internal network এ কথা বলবে। শুধু `app` সার্ভিসে domain লাগবে।

## Deploy এর পর টেস্ট

- `https://your-domain.com/` → Todo app UI দেখাবে
- `https://your-domain.com/health` → `{"status":"healthy","db":"connected"}` দেখাবে

`db: connected` দেখলে বুঝবেন backend আর database ঠিকমতো একে অপরের সাথে কথা বলছে।

## ডাটা কোথায় থাকে

`docker-compose.yml` এ `db-data` নামে একটা named volume দেওয়া আছে, তাই Coolify তে redeploy করলেও ডাটাবেসের ডাটা মুছে যাবে না।
