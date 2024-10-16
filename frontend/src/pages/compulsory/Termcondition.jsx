import { useEffect } from "react";
import privacypolicy from "../../assets/background/jhj.jpg";
import bgImage from "../../assets/background/home background.avif";


function Termcondition() {
  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "Term Condition : Doctor's Diary");
  }, []);
  return (
    <div
      className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover", // or 'contain' if you prefer
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Adjust position if needed
      }}
    >
      <div
        className="text-white rounded-lg shadow-lg bg-primary"
        // style={{
        //   backgroundImage: `url(${privacypolicy})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="p-8 md:p-16 text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-white text-center">
            Term & Condition
          </h1>
          <p className=" max-w-3xl mx-auto text-base md:text-lg mb-6">
            By using our services, you agree to abide by our Terms & Conditions.
            These guidelines ensure a smooth experience for all users and
            outline the rules governing your use of our platform. Please read
            through them carefully to understand your rights and
            responsibilities.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-500 font-semibold px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-blue-100 transition">
              <a href="#cancle"> Read Now ↘️ </a>
            </button>
          </div>
        </div>
      </div>

      <article className="bg-white/30 backdrop-blur-md backdrop-filter mt-10 p-6 rounded-lg shadow-md text-justify">
        <p className="text-sm text-gray-500 mb-4">
          Last updated on Dec 24th 2023
        </p>
        <p className="mb-4 text-gray-500">
          For the purpose of these Terms and Conditions, the terms "we", "us",
          "our" used anywhere on this page shall mean
          <strong> Doctor's Diary Pvt Ltd</strong>, whose registered/operational
          office is B1/26 New Ashok Nagar, 1st Floor Gali no 2 East Delhi DELHI
          110096. "you", "your", "user", "visitor" shall mean any natural or
          legal person who is visiting our website and/or agreed to purchase
          from us.
        </p>
        <section>
          <p className="text-lg text-primary font-semibold mb-2">
            Your use of the website and/or purchase from us is governed by the
            following Terms and Conditions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-500">
            <li>
              The content of the pages of this website is subject to change
              without notice.
            </li>
            <li>
              Neither we nor any third parties provide any warranty or guarantee
              as to the accuracy, timeliness, performance, completeness or
              suitability of the information and materials found or offered on
              this website for any particular purpose. You acknowledge that such
              information and materials may contain inaccuracies or errors and
              we expressly exclude liability for any such inaccuracies or errors
              to the fullest extent permitted by law.
            </li>
            <li>
              Your use of any information or materials on our website and/or
              product pages is entirely at your own risk, for which we shall not
              be liable. It shall be your own responsibility to ensure that any
              products, services or information available through our website
              and/or product pages meet your specific requirements.
            </li>
            <li>
              Our website contains material which is owned by or licensed to us.
              This material includes, but is not limited to, the design, layout,
              look, appearance and graphics. Reproduction is prohibited other
              than in accordance with the copyright notice, which forms part of
              these terms and conditions.
            </li>
            <li>
              All trademarks reproduced in our website which are not the
              property of, or licensed to, the operator are acknowledged on the
              website.
            </li>
            <li>
              Unauthorized use of information provided by us shall give rise to
              a claim for damages and/or be a criminal offense.
            </li>
            <li>
              From time to time our website may also include links to other
              websites. These links are provided for your convenience to provide
              further information.
            </li>
            <li>
              You may not create a link to our website from another website or
              document without Doctor's Diary Pvt Ltd's prior written consent.
            </li>
            <li>
              Any dispute arising out of use of our website and/or purchase with
              us is subject to the laws of India.
            </li>
            <li>
              We shall be under no liability whatsoever in respect of any loss
              or damage arising directly or indirectly out of the decline of
              authorization for any Transaction, on account of the Cardholder
              having exceeded the preset limit mutually agreed by us with our
              acquiring bank from time to time.
            </li>
          </ul>
        </section>
        <footer>
          <p className="font-semibold text-primary mt-6">Disclaimer:</p>
          <p className="text-gray-500">
            The above content is created at Doctor's Diary Pvt Ltd's sole
            discretion. Razorpay shall not be liable for any content provided
            here and shall not be responsible for any claims and liability that
            may arise due to merchant’s non-adherence to it.
          </p>
        </footer>
      </article>
    </div>
  );
}

export default Termcondition;
