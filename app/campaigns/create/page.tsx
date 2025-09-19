"use client";

import { useState } from "react";
import { useSynapse } from "@/providers/SynapseProvider";
import { v4 as uuidv4 } from "uuid";

const MIN_CAMPAIGN_FEE = 10; // Minimum 10 USDFC to create a campaign

const defaultForm = {
  title: "",
  description: "",
  type: "image",
  prompt: "",
  annotationType: "label",
  rewardPerUpload: "0",
  rewardPerAnnotation: "0",
  priceToBuy: "0",
};

export default function CreateCampaign() {
  const { synapse } = useSynapse();
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    if (parseFloat(form.priceToBuy) < MIN_CAMPAIGN_FEE) {
      setError(`Minimum price to create a campaign is ${MIN_CAMPAIGN_FEE} USDFC.`);
      return;
    }
    setStatus("Creating campaign...");
    try {
      const campaign = {
        ...form,
        id: uuidv4(),
        creator: synapse?.signer?.address || "",
        createdAt: new Date().toISOString(),
        status: "active",
        uploads: [],
        annotations: [],
      };
      const json = JSON.stringify(campaign);
      const data = new TextEncoder().encode(json);
      const result = await synapse?.storage.upload(data);
      setStatus(
        result?.pieceCid
          ? `Campaign created! PieceCID: ${result.pieceCid}`
          : "Failed to upload campaign metadata."
      );
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-black">Create a New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1 text-black">Title</label>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-black">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-black">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
            >
              <option value="image">Image</option>
              <option value="text">Text</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-black">Annotation Type</label>
            <select
              name="annotationType"
              value={form.annotationType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
            >
              <option value="label">Label</option>
              <option value="bbox">Bounding Box</option>
              <option value="text">Text Annotation</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-black">Prompt/Instructions</label>
          <input
            name="prompt"
            placeholder="Prompt/Instructions"
            value={form.prompt}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-1 text-black">Reward per Upload (USDFC)</label>
            <input
              name="rewardPerUpload"
              placeholder="Reward per Upload"
              value={form.rewardPerUpload}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
              type="number"
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-black">Reward per Annotation (USDFC)</label>
            <input
              name="rewardPerAnnotation"
              placeholder="Reward per Annotation"
              value={form.rewardPerAnnotation}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
              type="number"
              min="0"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-black">Price to Buy Dataset (USDFC)</label>
            <input
              name="priceToBuy"
              placeholder="Price to Buy Dataset"
              value={form.priceToBuy}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-400 text-black placeholder-gray-400"
              type="number"
              min="0"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
        >
          Create Campaign
        </button>
      </form>
      {error && <div className="mt-4 text-center text-lg font-semibold text-red-600">{error}</div>}
      {status && <div className="mt-6 text-center text-lg font-semibold text-green-700">{status}</div>}
    </div>
  );
}
