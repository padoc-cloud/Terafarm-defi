"use server";
import fs from "node:fs/promises";

export async function uploadFile(formData: FormData) {
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    return await fs.writeFile(`@/public/uploads/avatar/${file.name}`, buffer);
}