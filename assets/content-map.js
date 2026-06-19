const contentMap = {
  siteUrl: "https://home-zh-aiyouxi.com.cn",
  primaryTags: ["爱游戏", "游戏攻略", "玩家社区", "游戏评测", "新手入门"],
  sections: [
    {
      id: "home",
      label: "首页",
      keywords: ["爱游戏", "最新动态", "热门推荐"],
      entries: [
        { title: "欢迎来到爱游戏世界", url: "/welcome", tag: "爱游戏" },
        { title: "本周热门游戏一览", url: "/hot-this-week", tag: "热门推荐" }
      ]
    },
    {
      id: "guides",
      label: "攻略中心",
      keywords: ["爱游戏", "攻略", "技巧", "过关", "教程"],
      entries: [
        { title: "新手必备技巧", url: "/guides/newbie-tips", tag: "新手入门" },
        { title: "高级策略分享", url: "/guides/advanced-strat", tag: "游戏攻略" }
      ]
    },
    {
      id: "reviews",
      label: "游戏评测",
      keywords: ["爱游戏", "评测", "打分", "推荐", "踩雷"],
      entries: [
        { title: "年度最佳游戏评选", url: "/reviews/best-of-year", tag: "游戏评测" },
        { title: "小众佳作推荐", url: "/reviews/underrated-gems", tag: "游戏评测" }
      ]
    },
    {
      id: "community",
      label: "玩家社区",
      keywords: ["爱游戏", "社区", "讨论", "交友", "组队"],
      entries: [
        { title: "玩家交流区", url: "/community/forum", tag: "玩家社区" },
        { title: "组队招募贴", url: "/community/lfg", tag: "玩家社区" }
      ]
    }
  ],
  extraTags: ["爱游戏", "游戏情报", "电竞赛事", "独立游戏", "怀旧游戏"]
};

function searchContent(query) {
  const results = [];
  const q = query.toLowerCase().trim();
  if (!q) return results;

  contentMap.sections.forEach(section => {
    const sectionScore = section.keywords.some(kw => kw.toLowerCase().includes(q)) ? 1 : 0;
    section.entries.forEach(entry => {
      let score = 0;
      if (entry.title.toLowerCase().includes(q)) score += 2;
      if (entry.tag.toLowerCase().includes(q)) score += 2;
      if (entry.url.toLowerCase().includes(q)) score += 1;
      if (sectionScore > 0) score += 1;
      if (score > 0) {
        results.push({
          sectionId: section.id,
          sectionLabel: section.label,
          title: entry.title,
          url: contentMap.siteUrl + entry.url,
          tag: entry.tag,
          score: score
        });
      }
    });
  });

  results.sort((a, b) => b.score - a.score);
  return results;
}

function filterByTag(tag) {
  const tagLower = tag.toLowerCase().trim();
  const matches = [];
  contentMap.sections.forEach(section => {
    section.entries.forEach(entry => {
      if (entry.tag.toLowerCase() === tagLower) {
        matches.push({
          sectionId: section.id,
          sectionLabel: section.label,
          title: entry.title,
          url: contentMap.siteUrl + entry.url,
          tag: entry.tag
        });
      }
    });
  });
  return matches;
}

function listAllTags() {
  const tagSet = new Set();
  contentMap.sections.forEach(section => {
    section.entries.forEach(entry => tagSet.add(entry.tag));
  });
  contentMap.extraTags.forEach(t => tagSet.add(t));
  return Array.from(tagSet);
}