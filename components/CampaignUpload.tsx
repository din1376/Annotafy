import { useState } from "react";
import { useSynapse } from "@/providers/SynapseProvider";

export default function CampaignUpload({ campaignPieceCid }: { campaignPieceCid: string }) {
  const { synapse } = useSynapse();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !synapse) return;
    setStatus("Uploading...");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      // Optionally, add campaignPieceCid to metadata or a manifest
      const result = await synapse.storage.upload(data);
      setStatus(result?.pieceCid ? `Upload successful! PieceCID: ${result.pieceCid}` : "Upload failed.");
      // For hackathon: store uploaded PieceCID in localStorage for this campaign
      const uploadsKey = `campaign_uploads_${campaignPieceCid}`;
      const uploads = JSON.parse(localStorage.getItem(uploadsKey) || "[]");
      uploads.push(result.pieceCid);
      localStorage.setItem(uploadsKey, JSON.stringify(uploads));
    } catch (err: any) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4 mt-6 bg-gray-50 p-4 rounded-lg shadow">
      <label className="block font-semibold mb-1">Upload File</label>
      <input type="file" onChange={handleChange} className="block w-full border border-gray-300 rounded p-2" required />
      <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">
        Upload to Campaign
      </button>
      {status && <div className="mt-2 text-center text-green-700 font-semibold">{status}</div>}
    </form>
  );
}
