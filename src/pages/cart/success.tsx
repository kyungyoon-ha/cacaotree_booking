import React from "react";
import LayoutBooking from "@components/LayoutBooking";

import ViewOrderSuccess from "@views/ViewOrderSuccess";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SuccessPage = () => {
  return (
    <LayoutBooking>
      <ViewOrderSuccess />
    </LayoutBooking>
  );
};
export default SuccessPage;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["booking"])),
  },
});
