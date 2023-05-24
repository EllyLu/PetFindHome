# 佩特找家寵物認養平台

https://pet-find-home.vercel.app/

## 簡介
登入後，送養者可以透過此平台將寵物資訊發布於領養頁面；領養者可以於領養頁面找尋合適的寵物並獲得送養者聯絡方式。  

試用帳號:  
1. linyu111@gmail.com 密碼: linyuyu  
2. qaz123@gmail.com 密碼: qaz123

## 網頁架構
### 前端
- src
   - App.js 路徑設定 
   - components
      - home 形象首頁
      - login 登入頁面
      - register 註冊頁面
      - userProfile 查看有興趣領養和曾發佈的寵物
      - pets 查看待領養寵物頁面
      - petProfile 查看單一寵物頁面
      - postPet 發佈送養寵物頁面

    - services 將前端請求發送至後端
      - auth 發送登入/登出/註冊相關請求
      - pets 發送與寵物相關的請求

### 後端
- 登入系統
- 客戶端認證（JWT）
- 客戶/寵物資料增刪改查
## 使用技術
- React
- JavaScript
- Node.js
- API
- Express
- MongoDB
- JSON Web Token（JWT）
