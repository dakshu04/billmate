export async function uploadPDFToUploadThing(pdfBytes: Uint8Array, filename: string) {
  // Replace with your UploadThing or S3 logic
  // Here we just fake a URL
  return { url: `https://fake-storage.com/${filename}` }
}
