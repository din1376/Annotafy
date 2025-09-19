"use client";

// Demo: Hardcoded campaign and upload data
import AnnotationInput from "@/components/AnnotationInput";

const fakeCampaigns = [
  {
    pieceCid: "bafy...demo1",
    title: "Label Street Signs",
    description: "Help annotate images of street signs for autonomous vehicles.",
    prompt: "Label each street sign with its type.",
    type: "image",
    annotationType: "label",
    rewardPerUpload: "2",
    rewardPerAnnotation: "1",
    priceToBuy: "20",
    uploads: [
      { uploadCid: "up1", name: "sign1.jpg" },
      { uploadCid: "up2", name: "sign2.jpg" },
    ],
  },
  {
    pieceCid: "bafy...demo2",
    title: "Transcribe Handwritten Notes",
    description: "Transcribe text from scanned handwritten notes.",
    prompt: "Type the text you see in each image.",
    type: "image",
    annotationType: "text",
    rewardPerUpload: "3",
    rewardPerAnnotation: "2",
    priceToBuy: "25",
    uploads: [
      { uploadCid: "up3", name: "note1.jpg" },
      { uploadCid: "up4", name: "note2.jpg" },
    ],
  },
  {
    pieceCid: "bafy...demo3",
    title: "Bounding Boxes for Wildlife",
    description: "Draw bounding boxes around animals in wildlife camera photos.",
    prompt: "Draw a box around each animal.",
    type: "image",
    annotationType: "bbox",
    rewardPerUpload: "5",
    rewardPerAnnotation: "3",
    priceToBuy: "30",
    uploads: [
      { uploadCid: "up5", name: "wild1.jpg" },
      { uploadCid: "up6", name: "wild2.jpg" },
    ],
  },
];

type Annotation = { annotator: string; label?: string; bbox?: string; text?: string };
const fakeAnnotations: { [key: string]: Annotation[] } = {
  up1: [{ annotator: "Alice", label: "Stop Sign" }],
  up2: [{ annotator: "Bob", label: "Yield Sign" }],
  up3: [{ annotator: "You", text: "Meeting notes: ..." }],
  up4: [],
  up5: [{ annotator: "Carol", bbox: "34,45,100,120" }],
  up6: [],
};

import { use } from "react";

export default function CampaignDetailPage({ params }: { params: Promise<{ pieceCid: string }> }) {
  const { pieceCid } = use(params);
  const campaign = fakeCampaigns.find((c) => c.pieceCid === pieceCid);
  const uploads = campaign ? campaign.uploads : [];
  const loading = false;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {loading && <div>Loading campaign...</div>}
      {!loading && campaign && (
        <>
          <h2 className="text-2xl font-extrabold mb-2 text-blue-700">{campaign.title}</h2>
          <div className="mb-2 text-black">{campaign.description}</div>
          <div className="mb-4 text-xs text-blue-600">Prompt: {campaign.prompt}</div>
          {/* Fake upload form */}
          <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
            <div className="mb-2 font-semibold">Upload Data (demo only)</div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" disabled>
              Upload (disabled in demo)
            </button>
          </div>
          <h3 className="mt-6 text-lg font-extrabold text-blue-700">Uploads</h3>
          <ul className="space-y-4 mt-2">
            {uploads.length === 0 && <li className="text-gray-400">No uploads yet.</li>}
            {uploads.map((upload: { uploadCid: string; name: string }) => (
              <li key={upload.uploadCid} className="border rounded p-3 bg-white">
                <div className="break-all text-xs text-black">Upload: {upload.name}</div>
                {/* Annotation form */}
                <AnnotationInput 
                  annotationType={campaign.annotationType}
                  uploadCid={upload.uploadCid}
                  onAdd={(ann: { label?: string; bbox?: string; text?: string }) => {
                    if (!fakeAnnotations[upload.uploadCid]) fakeAnnotations[upload.uploadCid] = [];
                    fakeAnnotations[upload.uploadCid].push({ annotator: "You", ...ann });
                  }}
                />
                {/* Fake annotation list */}
                <div className="mt-2">
                  <div className="font-extrabold text-xs mb-1 text-blue-700">Annotations:</div>
                  <ul className="text-xs">
                    {(fakeAnnotations[upload.uploadCid] || []).length === 0 && (
                      <li className="text-black">No annotations yet.</li>
                    )}
                    {(fakeAnnotations[upload.uploadCid] || []).map((a: Annotation, idx: number) => (
                      <li key={idx} className="bg-gray-50 border rounded p-2 mb-1 text-black">
                        {a.label && <span className="text-blue-700">Label: <b>{a.label}</b></span>}
                        {a.bbox && <span className="text-blue-700">BBox: <b>{a.bbox}</b></span>}
                        {a.text && <span className="text-blue-700">Text: <b>{a.text}</b></span>}
                        <span className="ml-2 text-blue-600">By: {a.annotator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {!loading && !campaign && <div>Campaign not found.</div>}
    </div>
  );
}
