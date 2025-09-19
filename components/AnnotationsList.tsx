import { useEffect, useState } from "react";
import { useSynapse } from "@/providers/SynapseProvider";

function getAnnotationCIDs(uploadPieceCid: string) {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(`annotations_${uploadPieceCid}`) || "[]");
  } catch {
    return [];
  }
}

export default function AnnotationsList({ uploadPieceCid }: { uploadPieceCid: string }) {
  const { synapse } = useSynapse();
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAnnotations() {
      setLoading(true);
      const cids = getAnnotationCIDs(uploadPieceCid);
      const fetched = [];
      for (const pieceCid of cids) {
        try {
          const data = await synapse?.storage.download(pieceCid);
          const json = new TextDecoder().decode(data);
          const annotation = JSON.parse(json);
          fetched.push({ ...annotation, pieceCid });
        } catch (err) {
          // ignore broken
        }
      }
      setAnnotations(fetched);
      setLoading(false);
    }
    if (synapse) fetchAnnotations();
  }, [synapse, uploadPieceCid]);

  return (
    <div className="mt-2">
      <div className="font-semibold text-xs mb-1">Annotations:</div>
      {loading && <div className="text-xs">Loading annotations...</div>}
      {!loading && annotations.length === 0 && <div className="text-xs text-gray-400">No annotations yet.</div>}
      <ul className="space-y-1">
        {annotations.map((a) => (
          <li key={a.pieceCid} className="bg-gray-50 border rounded p-2 text-xs">
            {a.label && <div>Label: <span className="font-bold">{a.label}</span></div>}
            {a.bbox && <div>BBox: <span className="font-bold">{a.bbox}</span></div>}
            {a.text && <div>Text: <span className="font-bold">{a.text}</span></div>}
            <div className="text-gray-400">By: {a.annotator}</div>
            <div className="text-gray-300">PieceCID: {a.pieceCid}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
