import LayoutBooking from '@components/LayoutBooking';
import ViewDepartureMassage from '@views/ViewDepartureMassage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const DepartureMassagePage = () => (
  <LayoutBooking>
    <ViewDepartureMassage />
  </LayoutBooking>
);

export default DepartureMassagePage;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['booking'])),
  },
});
