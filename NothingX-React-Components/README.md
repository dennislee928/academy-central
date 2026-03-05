# NothingX React Components

React 元件庫，對應 [NThing-UI-main](https://github.com/runixe786/NThing-UI) Rainmeter 皮膚的視覺風格（NothingOS / Nothing Phone 風格）。

## 設計來源

- **Clock**：雙圓時鐘，小時黑字、分鐘紅字
- **Date**：圓角卡片 + 日期圓形 + 日進度弧 + 月份/星期
- **Weather**：深色圓角卡片 + 天氣圖示 + 溫度 + 描述
- **Monitor (RAM / Storage)**：圓角卡片 + 圓形/長條進度 + 標籤
- **Battery**：圓角卡片 + 電量百分比 + 充電狀態
- **Music**：封面區 + 播放控制（可接 Web API）
- **Quotes**：雙圓 + 引言與作者
- **Calendar**：月曆網格 + 當日紅點
- **Photos**：圖片網格占位
- **CalendarEvent**：下一個行程

## 使用方式

各元件為獨立 React 元件，可搭配任一 React/Next 專案，並依專案引入對應的 CSS 變數或 Tailwind 設定（如 `--nothing-red`、`bg-nothing-surface`）。
