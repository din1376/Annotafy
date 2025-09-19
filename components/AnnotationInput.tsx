"use client";

import { useState } from "react";

type AnnotationInputProps = {
  annotationType: string;
  uploadCid: string;
  onAdd: (ann: { label?: string; bbox?: string; text?: string }) => void;
};

export default function AnnotationInput({ annotationType, uploadCid, onAdd }: AnnotationInputProps) {
  const [label, setLabel] = useState("");
  const [bbox, setBbox] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (annotationType === "label" && label) {
      onAdd({ label });
      setLabel("");
      setStatus("Annotation added!");
    } else if (annotationType === "bbox" && bbox) {
      onAdd({ bbox });
      setBbox("");
      setStatus("Annotation added!");
    } else if (annotationType === "text" && text) {
      onAdd({ text });
      setText("");
      setStatus("Annotation added!");
    } else {
      setStatus("Please enter a value.");
    }
    setTimeout(() => setStatus(""), 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-2">
      {annotationType === "label" && (
        <input
          className="border border-gray-300 p-2 rounded w-full text-black"
          placeholder="Label"
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
      )}
      {annotationType === "bbox" && (
        <input
          className="border border-gray-300 p-2 rounded w-full text-black"
          placeholder="Bounding Box (x,y,w,h)"
          value={bbox}
          onChange={e => setBbox(e.target.value)}
        />
      )}
      {annotationType === "text" && (
        <textarea
          className="border border-gray-300 p-2 rounded w-full text-black"
          placeholder="Text Annotation"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      )}
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
        Add Annotation
      </button>
      {status && <div className="text-xs text-green-700">{status}</div>}
    </form>
  );
}
