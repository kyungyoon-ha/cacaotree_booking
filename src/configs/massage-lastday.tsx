import { SelectOption } from "src/types";

const massageLastday: SelectOption = [
  {
    label: "massage.group.classic",
    options: [
      { label: "massage.lastday.90thai", value: "90분 타이/90 Thai/45000" },
      { label: "massage.lastday.90shiatsu", value: "90분 시아추/90 Shiatsu/45000" },
      { label: "massage.lastday.90oil", value: "90분 오일/90 Oil/45000" },
      { label: "massage.lastday.90kid", value: "90분 성장마지지/90 Kid/30000" },
      { label: "massage.lastday.120thai", value: "120분 타이/120 Thai/60000" },
      { label: "massage.lastday.120shiatsu", value: "120분 시아추/120 Shiatsu/60000" },
      { label: "massage.lastday.120oil", value: "120분 오일/120 Oil/60000" },
    ],
  },
  {
    label: "massage.group.special",
    options: [
      { label: "massage.lastday.90lavastone", value: "90분 라바스톤/90 LavaStone/45000" },
      { label: "massage.lastday.90sunburn", value: "90분 썬번/90 Sun Burn/45000" },
      { label: "massage.lastday.120lavastone", value: "120분 라바스톤/120 LavaStone/60000" },
      { label: "massage.lastday.120sunburn", value: "120분 썬번/120 Sun Burn/60000" },
    ],
  },
];

export default massageLastday;
