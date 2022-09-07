import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";

/* DummyData */
const DEMO_CATS3: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Naturaleza",
    taxonomy: "category",
    count: 100,
    thumbnail:
      "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Aventura",
    taxonomy: "category",
    count: 120,
    thumbnail:
      "https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "Extremo",
    taxonomy: "category",
    count: 84,
    thumbnail:
      "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Romantico",
    taxonomy: "category",
    count: 13,
    thumbnail:
      "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "Cultural",
    taxonomy: "category",
    count: 27,
    thumbnail:
      "https://images.pexels.com/photos/248837/pexels-photo-248837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  
];

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />

        {/* SECTION 1 */}
        <SectionSliderNewCategories
          categories={DEMO_CATS3}
          uniqueClassName="PageHome_s1"
        />


      </div>
    </div>
  );
}

export default PageHome;
