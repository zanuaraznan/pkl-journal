import JournalForm from "@/components/Home/FormJournal";
import { auth } from "@/lib/auth";
import { getSiswaFromDB } from "@/lib/auth-libs";

export default async function Page() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  const siswa = await getSiswaFromDB(session.user?.id!);

  return (
    <section className="my-6 flex flex-col md:flex-row-reverse gap-4 items-center container md:max-w-6xl">
      <div className="border border-neutral-200 p-8 bg-white rounded-2xl shadow-xl shadow-black/5 w-full md:max-w-xl">
        <h1 className="text-xl font-semibold tracking-wide text-center">
          Jurnal Harian
        </h1>
        <JournalForm />
        <div></div>
      </div>
    </section>
  );
}
