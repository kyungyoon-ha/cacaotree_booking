import LayoutBooking from '@components/LayoutBooking';
import ViewArrivalMassage from '@views/ViewArrivalMassage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ArrivalMassagePage = () => (
  <LayoutBooking>
    <ViewArrivalMassage />
  </LayoutBooking>
);

export default ArrivalMassagePage;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['booking'])),
  },
});
