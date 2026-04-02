import BankAccounts from '@/components/back-accounts/back-accounts';
import Contact from '@/components/contact/contact';
import Corporate from '@/components/corporate/corporate';
import HeroCarousel from '@/components/hero-carousel/hero-carousel';
import PopularProducts from '@/components/popular-products/popular-products';
import SectoralProducts from '@/components/sectoral-products/sectoral-products';
import { getBankAccountsWithCache } from './_helpers/service/getBankAccounts/getBankAccounts.service';
import { getContactDataWithCache } from './_helpers/service/getContact/getContact.service';
import { getCorporateDataWithCache } from './_helpers/service/getCorporate/getCorporate.service';
import { getHomePageDataWithCache } from './_helpers/service/getHomePageData/getHomePageData.service';

export default async function HomePage() {
  const [homePageData, corporateData, contactData, bankAccountsData] =
    await Promise.all([
      getHomePageDataWithCache(),
      getCorporateDataWithCache(),
      getContactDataWithCache(),
      getBankAccountsWithCache(),
    ]);

  if (
    homePageData === null ||
    corporateData === null ||
    contactData === null ||
    bankAccountsData === null
  ) {
    throw new Error('Required data is missing');
  }

  return (
    <>
      <HeroCarousel data={homePageData?.banners} />
      <SectoralProducts data={homePageData?.sectoralProducts} />
      <PopularProducts data={homePageData?.popularSubCategories} />
      <Corporate data={corporateData} />
      <Contact data={contactData} />
      <BankAccounts data={bankAccountsData} />
    </>
  );
}
