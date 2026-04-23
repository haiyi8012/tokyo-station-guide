export interface Line {
  id: string;
  name: string;
  nameJa: string;
  namePinyin: string;
  color: string;
  textColor: string;
}

export interface Station {
  id: string;
  name: string;
  nameJa: string;
  nameEn: string;
  namePinyin: string;
  lines: {
    line: Line;
    stationNumber: string;
  }[];
  description: string;
  descriptionJa: string;
}

export const LINES: Record<string, Line> = {
  yamanote: {
    id: "yamanote",
    name: "山手线",
    nameJa: "山手線",
    namePinyin: "shanshouxian",
    color: "#9ACD32",
    textColor: "#ffffff",
  },
  marunouchi: {
    id: "marunouchi",
    name: "丸之内线",
    nameJa: "丸ノ内線",
    namePinyin: "wanzhineilian",
    color: "#E60012",
    textColor: "#ffffff",
  },
  hibiya: {
    id: "hibiya",
    name: "日比谷线",
    nameJa: "日比谷線",
    namePinyin: "ribiguxian",
    color: "#9B7CB6",
    textColor: "#ffffff",
  },
  ginzaLine: {
    id: "ginzaLine",
    name: "银座线",
    nameJa: "銀座線",
    namePinyin: "yinzuoxian",
    color: "#FF9500",
    textColor: "#ffffff",
  },
  chuo: {
    id: "chuo",
    name: "中央线",
    nameJa: "中央線",
    namePinyin: "zhongyangxian",
    color: "#E0171F",
    textColor: "#ffffff",
  },
  keiyo: {
    id: "keiyo",
    name: "京叶线",
    nameJa: "京葉線",
    namePinyin: "jingye xian",
    color: "#E5171F",
    textColor: "#ffffff",
  },
  saikyo: {
    id: "saikyo",
    name: "埼京线",
    nameJa: "埼京線",
    namePinyin: "qijingxian",
    color: "#009F6B",
    textColor: "#ffffff",
  },
  tokyu_toyoko: {
    id: "tokyu_toyoko",
    name: "东急东横线",
    nameJa: "東急東横線",
    namePinyin: "dongjidonghe xian",
    color: "#E0171F",
    textColor: "#ffffff",
  },
  keihintohoku: {
    id: "keihintohoku",
    name: "京滨东北线",
    nameJa: "京浜東北線",
    namePinyin: "jingbindongbeilian",
    color: "#00AFCC",
    textColor: "#ffffff",
  },
};

export const STATIONS: Station[] = [
  {
    id: "tokyo",
    name: "东京",
    nameJa: "東京",
    nameEn: "Tokyo",
    namePinyin: "dongjing",
    lines: [
      { line: LINES.yamanote, stationNumber: "JY01" },
      { line: LINES.marunouchi, stationNumber: "M-17" },
      { line: LINES.keihintohoku, stationNumber: "JK26" },
    ],
    description: "东京都的中心车站，日本最繁忙的铁路枢纽之一。",
    descriptionJa: "東京の中心駅。日本最大の鉄道ターミナルの一つ。",
  },
  {
    id: "shinjuku",
    name: "新宿",
    nameJa: "新宿",
    nameEn: "Shinjuku",
    namePinyin: "xinsu",
    lines: [
      { line: LINES.yamanote, stationNumber: "JY17" },
      { line: LINES.marunouchi, stationNumber: "M-08" },
      { line: LINES.saikyo, stationNumber: "JA11" },
      { line: LINES.chuo, stationNumber: "JC05" },
    ],
    description: "世界最繁忙的车站，每日旅客超过350万人次。",
    descriptionJa: "世界一の乗降客数を誇る駅。毎日350万人以上が利用。",
  },
  {
    id: "shibuya",
    name: "涩谷",
    nameJa: "渋谷",
    nameEn: "Shibuya",
    namePinyin: "segu",
    lines: [
      { line: LINES.yamanote, stationNumber: "JY20" },
      { line: LINES.ginzaLine, stationNumber: "G-01" },
      { line: LINES.hibiya, stationNumber: "H-01" },
      { line: LINES.tokyu_toyoko, stationNumber: "TY01" },
    ],
    description: "东京年轻文化与时尚的中心，以涩谷十字路口闻名。",
    descriptionJa: "若者文化とファッションの中心地。スクランブル交差点で有名。",
  },
  {
    id: "akihabara",
    name: "秋叶原",
    nameJa: "秋葉原",
    nameEn: "Akihabara",
    namePinyin: "qiuyeyuan",
    lines: [
      { line: LINES.yamanote, stationNumber: "JY03" },
      { line: LINES.keihintohoku, stationNumber: "JK28" },
      { line: LINES.hibiya, stationNumber: "H-15" },
    ],
    description: "全球知名的电器与动漫文化圣地，科技爱好者的天堂。",
    descriptionJa: "世界的に有名な電気街・アニメの聖地。",
  },
  {
    id: "ginza",
    name: "银座",
    nameJa: "銀座",
    nameEn: "Ginza",
    namePinyin: "yinzuo",
    lines: [
      { line: LINES.ginzaLine, stationNumber: "G-09" },
      { line: LINES.marunouchi, stationNumber: "M-16" },
      { line: LINES.hibiya, stationNumber: "H-09" },
    ],
    description: "东京最高端的购物与娱乐区，奢侈品牌云集。",
    descriptionJa: "東京最高級のショッピング・エンターテインメント地区。",
  },
];

export const ALL_LINES = Object.values(LINES);
