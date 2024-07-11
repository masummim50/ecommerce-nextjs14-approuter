export async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append("key", process.env.IMGBB_API_KEY as string);
  formData.append("image", image);

  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data.data.display_url;
}
