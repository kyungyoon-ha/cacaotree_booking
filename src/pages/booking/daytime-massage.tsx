import LayoutBooking from "@components/LayoutBooking";
import ViewDaytimeMassageDirect from "@views/ViewDaytimeMassageDirect";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DaytimeMassage = () => (
  <LayoutBooking>
    <ViewDaytimeMassageDirect />
  </LayoutBooking>
);

export default DaytimeMassage;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["booking"])),
  },
});
