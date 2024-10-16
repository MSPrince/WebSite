import LabHero from "./LabHero";
import LifeStylePackage from "./LifeStylePackage";

import PopularTest from "./PopularTest";
import Process from "./Process";
import WhychooseMe from "./WhychooseMe";
import DownloadApp from './../../components/DownloadApp';
import { useEffect } from 'react';
import Popularpackage from "./Popularpackage";

function LabTest() {
    useEffect(() => {
      window.scrollTo(0, 0), (document.title = "Lab Test");
    }, []);
  return (
    <>
      <LabHero />
      {/*
      <LifeStylePackage/> */}
      <LifeStylePackage />
      <Popularpackage />
      <PopularTest />

      <WhychooseMe />
      <DownloadApp />
      <Process />
    </>
  );
}

export default LabTest;
