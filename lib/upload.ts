import axios from "axios";

export async function uploadPDFToUploadThing(file: Uint8Array, filename: string) {
  const formData = new FormData();

  // Wrap the file in a new Uint8Array to satisfy TypeScript
  const blob = new Blob([new Uint8Array(file)], { type: "application/pdf" });
  formData.append("file", blob, filename);

  const res = await axios.post("https://uploadthing.com/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${process.env.UPLOADTHING_API_KEY}`,
    },
  });

  return res.data; // This usually returns the file URL
}
