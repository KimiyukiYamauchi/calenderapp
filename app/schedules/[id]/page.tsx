import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "予定詳細",
};

type Props = {
  params: {
    id: string;
  };
};

export default async function ScheduleDetailPage({ params }: Props) {
  const { id } = params;

  if (!id) return notFound();

  return (
    <div>
      <h1>予定詳細</h1>
      <p>予定ID: {id}</p>
    </div>
  );
}
