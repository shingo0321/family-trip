// 家族旅行ポータルサイトのコンテンツデータ
// ここを実際の情報に差し替えるだけでページ全体が更新されます。
const TRIP_DATA = {
  title: "家族旅行",
  subtitle: "TODO: キャッチコピーを入れる（例: 行き先名）",
  dateRange: "TODO: 旅行日程（例: 2026年8月1日(土)〜2日(日)）",

  itinerary: [
    {
      date: "TODO: 1日目の日付（例: 8月1日(土)）",
      items: [
        { time: "10:00", title: "TODO: 予定（例: 出発・集合）", place: "TODO: 場所" },
        { time: "13:00", title: "TODO: 予定", place: "TODO: 場所" },
        { time: "18:00", title: "TODO: 予定（例: 宿にチェックイン）", place: "TODO: 場所" }
      ]
    },
    {
      date: "TODO: 2日目の日付（例: 8月2日(日)）",
      items: [
        { time: "09:00", title: "TODO: 予定", place: "TODO: 場所" },
        { time: "15:00", title: "TODO: 予定（例: 解散）", place: "TODO: 場所" }
      ]
    }
  ],

  packingList: [
    {
      category: "貴重品",
      items: ["財布", "スマホ・充電器", "健康保険証"]
    },
    {
      category: "衣類",
      items: ["着替え", "羽織るもの", "パジャマ"]
    },
    {
      category: "その他",
      items: ["常備薬", "モバイルバッテリー", "折りたたみ傘"]
    }
  ]
};
