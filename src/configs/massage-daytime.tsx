import { SelectOption } from "@types";

const massageDaytime: SelectOption = [
  {
    label: "massage.group.classic",
    options: [
      { label: "massage.daytime.60thai", value: "60분 타이/60 Thai/30000" },
      { label: "massage.daytime.60shiatsu", value: "60분 시아추/60 Shiatsu/30000" },
      { label: "massage.daytime.60oil", value: "60분 오일/60 Oil/30000" },
      { label: "massage.daytime.90thai", value: "90분 타이/90 Thai/40000" },
      { label: "massage.daytime.90shiatsu", value: "90분 시아추/90 Shiatsu/40000" },
      { label: "massage.daytime.90oil", value: "90분 오일/90 Oil/40000" },
      { label: "massage.daytime.90kid", value: "90분 성장마지지/90 Kid/20000" },
      { label: "massage.daytime.120thai", value: "120분 타이/120 Thai/50000" },
      { label: "massage.daytime.120shiatsu", value: "120분 시아추/120 Shiatsu/50000" },
      { label: "massage.daytime.120oil", value: "120분 오일/120 Oil/50000" },
    ],
  },
  {
    label: "massage.group.special",
    options: [
      { label: "massage.daytime.90lavastone", value: "90분 라바스톤/90 LavaStone/45000" },
      { label: "massage.daytime.90sunburn", value: "90분 썬번/90 Sun Burn/45000" },
      { label: "massage.daytime.120lavastone", value: "120분 라바스톤/120 LavaStone/55000" },
      { label: "massage.daytime.120sunburn", value: "120분 썬번/120 Sun Burn/55000" },
    ],
  },
  {
    label: "massage.group.combo",
    options: [
      { label: "massage.daytime.90oilthai", value: "90분 오일+타이/90 Body+Thai/50000" },
      { label: "massage.daytime.90oilshiatsu", value: "90분 오일+시아추/90 Body+Shiatsu/50000" },
      { label: "massage.daytime.120oilthai", value: "120분 오일+타이/120 Body+Thai/60000" },
      { label: "massage.daytime.120oilshiatsu", value: "120분 오일+시아추/120 Body+Shiatsu/60000" },
    ],
  },
];

export default massageDaytime;
