import LayoutBasic from "@components/LayoutBasic";
import ViewHome from "@views/ViewHome";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Main() {
  return (
    <LayoutBasic>
      <ViewHome />
    </LayoutBasic>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["booking"])),
  },
});
