# NothingX React Components

React 元件庫，對應 [NThing-UI-main](https://github.com/runixe786/NThing-UI) Rainmeter 皮膚的視覺風格（NothingOS / Nothing Phone 風格）。

## 元件一覽

| 元件 | 檔案 | 說明 |
|------|------|------|
| Clock | `Clock.tsx` | 雙圓時鐘，小時黑字、分鐘紅字 |
| DateWidget | `Date.tsx` | 圓角卡片 + 日期圓形 + 日進度弧 + 月份/星期 |
| Weather | `Weather.tsx` | 深色圓角卡片 + 天氣圖示 + 溫度（Open-Meteo） |
| MonitorRAM | `MonitorRAM.tsx` | 深色卡片 + 圓形進度（瀏覽器 viewport 佔比） |
| MonitorStorage | `MonitorStorage.tsx` | 淺色卡片 + 垂直長條 + 磁碟標籤 |
| Battery | `Battery.tsx` | 圓角卡片 + 電量百分比 + Charging/Discharging（Battery API） |
| Music | `Music.tsx` | 封面區 + 標題/藝人 + 播放控制占位 |
| Quotes | `Quotes.tsx` | 雙圓 + 引言與作者 |
| Calendar | `Calendar.tsx` | 月曆網格 + 當日紅點 |
| Photos | `Photos.tsx` | 圖片網格（可傳 `imageUrls`） |
| CalendarEvent | `CalendarEvent.tsx` | 下一個行程標題與時間 |

## 使用方式

```ts
import {
  Clock,
  DateWidget,
  Weather,
  MonitorRAM,
  MonitorStorage,
  Battery,
  Music,
  Quotes,
  Calendar,
  Photos,
  CalendarEvent,
} from './NothingX-React-Components';
```

各元件為獨立 React 元件，可搭配任一 React/Next 專案；可依專案引入對應的 CSS 變數或 Tailwind 設定（如 `--nothing-red`、`bg-nothing-surface`）。設計 token 見 `theme.ts`。
