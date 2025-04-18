import { redirect } from "next/navigation";
import clientPromise from "@/lib/db";

export default async function Page({
  params,
}: {
  params: Promise<{ alias: string }>;     
}) {
  const { alias } = await params;

  const db = (await clientPromise).db("urlShortener");
  const doc = await db.collection("urls").findOne({ alias });

  if (!doc) {
    return redirect("/");                 
  }

  return redirect(doc.url);               
}
