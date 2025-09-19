import { useState } from "react";
import { useSynapse } from "@/providers/SynapseProvider";

export default function AnnotationForm({ uploadPieceCid, annotationType, campaignPieceCid }: { uploadPieceCid: string, annotationType: string, campaignPieceCid: string }) {
  const { synapse } = useSynapse();
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState("");

  // For bbox: just a simple string for hackathon; real UI would be more complex
  const [bbox, setBbox] = useState("");
  const [textAnn, setTextAnn] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Uploading annotation...");
    try {
      // Use address from wagmi
      const { address } = require('wagmi').useAccount();
      let annotation: any = { uploadPieceCid, annotator: address || "", campaignPieceCid };
      if (annotationType === "label") annotation.label = label;
      if (annotationType === "bbox") annotation.bbox = bbox;
      if (annotationType === "text") annotation.text = textAnn;
      const json = JSON.stringify(annotation);
      const data = new TextEncoder().encode(json);
      const result = await synapse?.storage.upload(data);
      if (result && result.pieceCid) {
        setStatus(`Annotation uploaded! PieceCID: ${result.pieceCid}`);
        // For hackathon: store annotation PieceCID in localStorage for this upload
        const annKey = `annotations_${uploadPieceCid}`;
        const anns = JSON.parse(localStorage.getItem(annKey) || "[]");
        anns.push(result.pieceCid);
        localStorage.setItem(annKey, JSON.stringify(anns));
      } else {
        setStatus("Failed to upload annotation.");
      }
    } catch (err: any) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 bg-gray-50 p-4 rounded-lg shadow">
      {annotationType === "label" && (
        <div>
          <label className="block font-semibold mb-1">Label</label>
          <input
            placeholder="Label"
            value={label}
            onChange={e => setLabel(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      )}
      {annotationType === "bbox" && (
        <div>
          <label className="block font-semibold mb-1">Bounding Box (x,y,w,h)</label>
          <input
            placeholder="Bounding Box (x,y,w,h)"
            value={bbox}
            onChange={e => setBbox(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      )}
      {annotationType === "text" && (
        <div>
          <label className="block font-semibold mb-1">Text Annotation</label>
          <textarea
            placeholder="Text Annotation"
            value={textAnn}
            onChange={e => setTextAnn(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
      )}
      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Submit Annotation</button>
      {status && <div className="mt-2 text-center text-green-700 font-semibold">{status}</div>}
    </form>
  );
}
