import { useEffect } from "react";
import privacypolicy from "../../assets/background/privacypolicy.jpg";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "Privacy Policy : Doctor's Diary");
  }, []);

  return (
    <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-4 bg-gray-50 rounded-lg shadow-lg">
      <div
        className="text-white rounded-lg shadow-lg bg-primary"
        style={{
          backgroundImage: `url(${privacypolicy})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-16 text-center bg-opacity-75 backdrop-blur-lg">
          <h1 className="text-4xl font-extrabold mb-6">Privacy Policy</h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg mb-6">
            Your privacy is important to us. We are committed to protecting your
            personal information and ensuring transparency. Learn how we
            collect, use, and safeguard your data, so you can feel confident
            when using our services.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-500 font-semibold px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-blue-100 transition">
              <a href="#cancle"> Read Now ↘️ </a>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white mt-10 p-8 rounded-lg shadow-md text-justify">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Introduction
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          This Privacy Policy describes how Doctors Diary and its affiliates
          (collectively "Doctors Diary, we, our, us") collect, use, share,
          protect or otherwise process your information/ personal data through
          our website www.adoctorsdiary.com (hereinafter referred to as
          Platform). Please note that you may be able to browse certain sections
          of the Platform without registering with us. We do not offer any
          product/service under this Platform outside India and your personal
          data will primarily be stored and processed in India. By visiting this
          Platform, providing your information or availing any product/service
          offered on the Platform, you expressly agree to be bound by the terms
          and conditions of this Privacy Policy, the Terms of Use and the
          applicable service/product terms and conditions, and agree to be
          governed by the laws of India including but not limited to the laws
          applicable to data protection and privacy. If you do not agree please
          do not use or access our Platform.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">Collection</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We collect your personal data when you use our Platform, services or
          otherwise interact with us during the course of our relationship. Some
          of the information that we may collect includes but is not limited to
          personal data / information provided to us during sign-up/registering
          or using our Platform such as name, date of birth, address,
          telephone/mobile number, email ID and/or any such information shared
          as proof of identity or address. Some of the sensitive personal data
          may be collected with your consent, such as your bank account or
          credit or debit card or other payment instrument information or
          biometric information such as your facial features or physiological
          information (in order to enable use of certain features when opted
          for, available on the Platform) etc all of the above being in
          accordance with applicable law(s) You always have the option to not
          provide information, by choosing not to use a particular service or
          feature on the Platform. We may track your behaviour, preferences, and
          other information that you choose to provide on our Platform. This
          information is compiled and analysed on an aggregated basis. We will
          also collect your information related to your transactions on Platform
          and such third-party business partner platforms. When such a
          third-party business partner collects your personal data directly from
          you, you will be governed by their privacy policies. We shall not be
          responsible for the third-party business partner's privacy practices
          or the content of their privacy policies, and we request you to read
          their privacy policies prior to disclosing any information. If you
          receive an email, a call from a person/association claiming to be
          Doctors Diary seeking any personal data like debit/credit card PIN,
          net-banking or mobile banking password, we request you to never
          provide such information. If you have already revealed such
          information, report it immediately to an appropriate law enforcement
          agency.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">Usage</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We use personal data to provide the services you request. To the
          extent we use your personal data to market to you, we will provide you
          the ability to opt-out of such uses. We use your personal data to
          assist sellers and business partners in handling and fulfilling
          orders; enhancing customer experience; to resolve disputes;
          troubleshoot problems; inform you about online and offline offers,
          products, services, and updates; customise your experience; detect and
          protect us against error, fraud and other criminal activity; enforce
          our terms and conditions; conduct marketing research, analysis and
          surveys; and as otherwise described to you at the time of collection
          of information. You understand that your access to these
          products/services may be affected in the event permission is not
          provided to us.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">Sharing</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We may share your personal data internally within our group entities,
          our other corporate entities, and affiliates to provide you access to
          the services and products offered by them. These entities and
          affiliates may market to you as a result of such sharing unless you
          explicitly opt-out. We may disclose personal data to third parties
          such as sellers, business partners, third-party service providers
          including logistics partners, prepaid payment instrument issuers,
          third-party reward programs and other payment opted by you. These
          disclosure may be required for us to provide you access to our
          services and products offered to you, to comply with our legal
          obligations, to enforce our user agreement, to facilitate our
          marketing and advertising activities, to prevent, detect, mitigate,
          and investigate fraudulent or illegal activities related to our
          services. We may disclose personal and sensitive personal data to
          government agencies or other authorised law enforcement agencies if
          required to do so by law or in the good faith belief that such
          disclosure is reasonably necessary to respond to subpoenas, court
          orders, or other legal process. We may disclose personal data to law
          enforcement offices, third-party rights owners, or others in the good
          faith belief that such disclosure is reasonably necessary to: enforce
          our Terms of Use or Privacy Policy; respond to claims that an
          advertisement, posting or other content violates the rights of a third
          party; or protect the rights, property or personal safety of our users
          or the general public.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Security Precautions
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          To protect your personal data from unauthorised access or disclosure,
          loss or misuse we adopt reasonable security practices and procedures.
          Once your information is in our possession or whenever you access your
          account information, we adhere to our security guidelines to protect
          it against unauthorised access and offer the use of a secure server.
          However, the transmission of information is not completely secure for
          reasons beyond our control. By using the Platform, the users accept
          the security implications of data transmission over the internet and
          the World Wide Web which cannot always be guaranteed as completely
          secure, and therefore, there would always remain certain inherent
          risks regarding use of the Platform. Users are responsible for
          ensuring the protection of login and password records for their
          account.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Data Deletion and Retention
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          You have an option to delete your account by visiting your profile and
          settings on our Platform, this action would result in you losing all
          information related to your account. You may also write to us at the
          contact information provided below to assist you with these requests.
          We may in the event of any pending grievance, claims, pending
          shipments or any other services we may refuse or delay deletion of the
          account. Once the account is deleted we will retain your personal data
          as required or permitted under applicable laws for the duration as
          required to comply with the laws.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Changes to the Privacy Policy
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We may change this Privacy Policy from time to time. We will notify
          you of significant changes in the way we treat personal data by
          sending a notice to the primary email address specified in your
          account or by placing a prominent notice on our Platform. We encourage
          you to periodically review this Privacy Policy to stay informed about
          our collection, use, and disclosure of personal data.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">Contact Us</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          If you have any questions about this Privacy Policy, please contact
          us:
          <br />
          Email: support@adoctorsdiary.com
          <br />
          Phone: +91 7897173138 <br />
          Phone: +91 9598149103
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
