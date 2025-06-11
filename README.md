# LMS
Как запустить проект
1. Клонируй репозиторий:
git clone https://github.com/Saaayurii/LMS
2. Открой два терминала и перейди в корень проекта.
3. В папке server создай файл .env со следующим содержимым:

STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxx

MONGO_URI=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

JWT_SECRET=xxxxxxxxxxxxxxxxxx

CLOUDINARY_CLOUD_NAME=xxxxxxxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxx

PORT=8080


4. В первом терминале:

cd client
npm install
npm run dev


5. Во втором терминале:

cd server
npm install
npm run dev
