const createData = ({ title = "", text = "" }) => {
  return JSON.stringify({
    "@type": "MessageCard",
    "@context": "http://schema.org/extensions",
    themeColor: "0076D7",
    summary: "meme",
    sections: [
      {
        activityTitle: title,
        activitySubtitle: text,
        markdown: true,
      },
    ],
    potentialAction: [
      {
        "@type": "ActionCard",
        name: "おかわり",
        actions: [
          {
            "@type": "HttpPOST",
            name: "おかわり",
            target:
              "https://us-central1-meme-bot-249d1.cloudfunctions.net/meme",
          },
        ],
      },
      {
        "@type": "ActionCard",
        name: "+",
        actions: [
          {
            "@type": "HttpPOST",
            name: "+",
            target:
              "https://us-central1-meme-bot-249d1.cloudfunctions.net/meme",
          },
        ],
      },
    ],
  });
};

export { createData };
