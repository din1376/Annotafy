"use client";

// Demo: Hardcoded campaign data
const fakeCampaigns = [
  {
    pieceCid: "bafy...demo1",
    title: "Label Street Signs",
    description: "Help annotate images of street signs for autonomous vehicles.",
    type: "image",
    annotationType: "label",
    rewardPerUpload: "2",
    rewardPerAnnotation: "1",
    priceToBuy: "20",
  },
  {
    pieceCid: "bafy...demo2",
    title: "Transcribe Handwritten Notes",
    description: "Transcribe text from scanned handwritten notes.",
    type: "image",
    annotationType: "text",
    rewardPerUpload: "3",
    rewardPerAnnotation: "2",
    priceToBuy: "25",
  },
  {
    pieceCid: "bafy...demo3",
    title: "Bounding Boxes for Wildlife",
    description: "Draw bounding boxes around animals in wildlife camera photos.",
    type: "image",
    annotationType: "bbox",
    rewardPerUpload: "5",
    rewardPerAnnotation: "3",
    priceToBuy: "30",
  },
];

export default function CampaignsList() {
  const campaigns = fakeCampaigns;
  const loading = false;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-blue-700">Active Campaigns</h2>
      {loading && <div className="text-lg text-gray-500">Loading campaigns...</div>}
      {!loading && campaigns.length === 0 && <div className="text-lg text-gray-400">No campaigns found.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((c) => (
          <a
            key={c.pieceCid}
            href={`/campaigns/${c.pieceCid}`}
            className="block border rounded-xl p-6 bg-white shadow hover:shadow-lg transition hover:bg-blue-50 cursor-pointer"
          >
            <h3 className="text-xl font-extrabold mb-1 text-blue-700">{c.title}</h3>
            <div className="text-sm text-black mb-2">{c.description}</div>
            <div className="flex flex-wrap gap-2 text-xs mb-2">
              <span className="bg-blue-100 px-2 py-1 rounded text-black">Type: {c.type}</span>
              <span className="bg-green-100 px-2 py-1 rounded text-black">Annotation: {c.annotationType}</span>
              <span className="bg-yellow-100 px-2 py-1 rounded text-black">Reward/Upload: {c.rewardPerUpload} USDFC</span>
              <span className="bg-pink-100 px-2 py-1 rounded text-black">Reward/Annotation: {c.rewardPerAnnotation} USDFC</span>
              <span className="bg-purple-100 px-2 py-1 rounded text-black">Buy: {c.priceToBuy} USDFC</span>
            </div>
            <div className="mt-2 text-xs text-blue-600 break-all">PieceCID: {c.pieceCid}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
