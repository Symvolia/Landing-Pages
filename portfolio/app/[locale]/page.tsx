import { setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Notes } from "@/components/Notes";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Work />
      <Process />
      <Skills />
      <Notes />
      <Faq />
      <Contact />
    </>
  );
}
