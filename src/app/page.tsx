import { ScrollProvider } from "@/components/site/scroll-provider";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Hero } from "@/components/site/hero";
import { Problem } from "@/components/site/problem";
import { Dimensions } from "@/components/site/dimensions";
import { Pipeline } from "@/components/site/pipeline";
import { Economics } from "@/components/site/economics";
import { CallToAction, SiteFooter, SiteNav } from "@/components/site/site-chrome";

export default function Home() {
  return (
    <ScrollProvider>
      <ScrollProgress />
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <Dimensions />
        <Pipeline />
        <Economics />
        <CallToAction />
      </main>
      <SiteFooter />
    </ScrollProvider>
  );
}
