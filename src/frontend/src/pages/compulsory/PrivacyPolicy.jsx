import { useEffect } from "react";
import privacypolicy from "../../assets/background/privacypolicy.jpg"


function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0), (document.title = "Privacy Policy : Doctor's Diary");
  }, []);
  return (
    <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8 py-4 bg-gray-50 rounded-lg shadow-lg">
      <div
        className=" text-white rounded-lg shadow-lg bg-primary"
        // style={{
        //   backgroundImage: `url(${privacypolicy})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      >
        <div className="p-16 text-center">
          <h1 className="text-4xl font-extrabold mb-6 TextGradient text-white text-center">
            Privacy Policy
          </h1>
          <p className=" max-w-3xl mx-auto text-base md:text-lg mb-6">
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

      <div className="bg-white mt-10 p-6 rounded-lg shadow-md text-justify">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          {" "}
          Introduction
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We, at Doctor's Diary Pvt Ltd (hereinafter referred to as "Doctor's
          Diary Pvt Ltd"), are committed to respecting your online privacy and
          recognize the need for appropriate protection and management of any
          personally identifiable information you share with us. This Privacy
          Policy ("Policy") describes how Doctor's Diary Pvt Ltd collects, uses,
          discloses and transfers personal information of users through its
          websites and applications, including through Doctor's Diary Pvt Ltd,
          mobile applications and online services (collectively, the
          "Platform"). This policy applies to those who visit the Platform, or
          whose information Doctor's Diary Pvt Ltd otherwise receives in
          connection with its services (such as contact information of
          individuals associated with Doctor's Diary Pvt Ltd including partners)
          (hereinafter collectively referred to as "Users"). For the purposes of
          the Privacy Policy, "You" or "Your" shall mean the person who is
          accessing the Platform.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          This Privacy Policy is published in compliance with, inter alia:
          Section 43A of the Information Technology Act, 2000; Regulation 4 of
          the Information Technology (Reasonable Security Practices and
          Procedures and Sensitive Personal Information) Rules, 2011 (the “SPI
          Rules”); Regulation 3(1) of the Information Technology (Intermediaries
          Guidelines) Rules, 2011.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Types of Personal Information collected by Doctor's Diary Pvt Ltd
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          "Personal information" (PI) - means any information relating to an
          identified or identifiable natural person including common identifiers
          such as a name, an identification number, location data, an online
          identifier or one or more factors specific to the physical,
          physiological, genetic, mental, economic, cultural or social identity
          of that natural person and any other information that is so
          categorized by applicable laws. We collect information about you
          and/or your usage to provide better services and offerings.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          The Personal Information that we collect, and how we collect it,
          depends upon how you interact with us. We collect the following
          categories of Sensitive Personal Information in the following ways:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-600 leading-relaxed mb-6">
          <li>
            {" "}
            When your register with us we collect your name, contact data (such
            as your email address and phone number); demographic data (such as
            your gender, your date of birth and your pin code); medical history
            data regarding your usage of the services and history of the
            appointments made by or with you through the use of our Services;
            medical insurance data (such as your insurance carrier and insurance
            plan); other information that you voluntarily choose to provide to
            us (such as information shared by you with us through emails or
            letters.)
          </li>
          <li>
            The information collected from you by Doctor's Diary Pvt Ltd may
            constitute 'personal information' or 'sensitive personal data or
            information' under the SPI Rules. The SPI Rules further define
            “Sensitive Personal Data or Information” of a person to mean
            personal information about that person relating to: passwords;
            financial information such as bank accounts, credit and debit card
            details or other payment instrument details; physical, physiological
            and mental health condition; sexual orientation; medical records and
            history; biometric information; information received by body
            corporate under lawful contract or otherwise; visitor details as
            provided at the time of registration or thereafter; and call data
            records.
          </li>
          <li>
            Doctor's Diary Pvt Ltd will be free to use, collect and disclose
            information that is freely available in the public domain without
            your consent.
          </li>
          <li>
            information about the services that you use and how you use them,
            including log information and location information, when you are a
            user of the services through the Platform;
          </li>
          <li>
            {" "}
            we may collect your Personal Information such as name, age, contact
            details, preferences, etc. through surveys and forms, when you
            choose to participate in these surveys etc.;
          </li>
          <li>
            when you communicate with Doctor's Diary Pvt Ltd, we collect
            information about your communication and any information you choose
            to provide;
          </li>
          <li>
            {" "}
            when you visit the Platform, we use cookies to automatically
            collect, store and use technical information about your system and
            interaction with our Platform;
          </li>
          <li>
            when you use a device to access the Platform, Doctor's Diary Pvt Ltd
            may collect technical or other related information from the device
            as well as the device location;
          </li>
        </ul>
        <p className="text-gray-600 leading-relaxed mb-6">
          To the extent permitted by law, Doctor's Diary Pvt Ltd may record and
          monitor your communications with us to ensure compliance with our
          legal and regulatory obligations and our internal policies. This may
          include the recording of telephone conversations;
        </p>
        <h2 className="text-xl font-semibold mb-4 text-primary">
          How Doctor's Diary Pvt Ltd may use your Personal Information
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We will only use your personal data in a fair and reasonable manner,
          and where we have a lawful reason to do so.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Our use of your personal data depends on the purpose for which you
          interact with us. We may process your Personal Information for the
          following purposes:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-600 leading-relaxed mb-6">
          <li>
            Providing our services and products to you including to send you
            related alerts, calendar alerts, relevant search results and other
            recommendations facilities;
          </li>
          <li>Protecting our Users and providing you with customer support;</li>
          <li>
            We use information collected from cookies and other technologies, to
            improve your user experience and the overall quality of our services
            (for more information please refer to paragraph 4 below). When
            showing you tailored ads, we will not associate an identifier from
            cookies or similar technologies with sensitive categories, such as
            those based on race, religion, sexual orientation or health.
          </li>
          <li>
            Improving the Platform and its content to provide better features
            and services.
          </li>
          <li>
            Conducting market research and surveys with the aim of improving our
            products and services.
          </li>
          <li>
            Sending you information about our products and services for
            marketing purposes and promotions;
          </li>
          <li>
            Preventing, detecting, investigating and taking action against
            crimes (including but not limited to fraud and other financial
            crimes), any other illegal activities, suspected fraud, or
            violations of Doctor's Diary Pvt Ltd's Terms of Use in any
            jurisdiction.
          </li>
          <li>
            To the extent required for identity verification, government
            sanctions screening and due diligence checks.
          </li>
          <li>
            Establishing, exercising or defending legal rights in connection
            with legal proceedings (including any prospective legal proceedings)
            and seeking professional or legal advice in relation to such legal
            proceedings.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Cookies and Other Tracking Technologies
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Some of our web pages utilize "cookies" and other tracking
          technologies. A "cookie" is a small text file that may be used, for
          example, to collect information about web-site activity. Some cookies
          and other technologies may serve to recall Personal Information
          previously indicated by a user. Most browsers allow you to control
          cookies, including whether or not to accept them and how to remove
          them.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          You may set most browsers to notify you if you receive a cookie, or
          you may choose to block cookies with your browser, but please note
          that if you choose to erase or block your cookies, you will need to
          re-enter your original user ID and password to gain access to certain
          parts of the Platform.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Tracking technologies may record information such as Internet domain
          and host names; Internet protocol (IP) addresses; browser software and
          operating system types; clickstream patterns; and dates and times that
          our site is accessed. Our use of cookies and other tracking
          technologies allows us to improve our Platform and the overall website
          experience. We may also analyse information that does not contain
          Personal Information for trends and statistics.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          For more information about our use of cookies please refer to our
          Cookie Policy.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          The Basis/ Grounds which we rely on for collection and processing of
          your Personal Information:
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Your Personal Information is collected and processed by Doctor's Diary
          Pvt Ltd based on the following legal grounds depending upon the nature
          of Personal Information and the purposes for which it is processed.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          <span> Consent:</span>Doctor's Diary Pvt Ltd relies on your consent in
          order to process your Personal Information in certain situations. If
          Doctor's Diary Pvt Ltd requires your consent to collect and process
          certain Personal Information, as per the requirements under the
          applicable data protection laws, your consent is sought at the time of
          collection of your Personal Information and such processing will only
          be performed where consent is secured.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          <span>Compliance with a legal obligation: </span>Your Personal
          Information may be processed by Doctor's Diary Pvt Ltd, to the extent
          that such processing is necessary to allow Doctor's Diary Pvt Ltd to
          comply with a legal obligation. An example of this would be if
          Doctor's Diary Pvt Ltd is required to disclose your Personal
          Information to respond to a court order or if Doctor's Diary Pvt Ltd
          is required to retain specific records for a fixed period to comply
          with requirements under any applicable law.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Information Sharing and Disclosure
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Doctor's Diary Pvt Ltd does not disclose, transfer or share your
          Personal Information with others except with:
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Our affiliates and group companies to the extent required for our
          internal business and/or administrative purposes and/or general
          corporate operations and for provision of services aimed at helping
          you and improve our services;
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Third parties including enforcement, regulatory and judicial
          authorities, if we determine that disclosure of your Personal
          Information is required to:
          <ul className="list-disc list-inside space-y-4 text-gray-600 leading-relaxed mb-6">
            <li>
              respond to subpoenas, court orders, or legal process, or to
              establish or exercise our legal rights or defend against legal
              claims; or
            </li>
            <li>
              investigate, prevent, or take action regarding illegal activities,
              suspected fraud, situations involving potential threats to the
              physical safety of any person, violations of Doctor's Diary Pvt
              Ltd's Terms of Use or as otherwise required by law;
            </li>
          </ul>
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          In the event of a merger, acquisition, financing, or sale of assets or
          any other situation involving the transfer of some or all of Doctor's
          Diary Pvt Ltd's business assets we may disclose Personal Information
          to those involved in the negotiation or transfer.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Third party service providers and marketing partners that Doctor's
          Diary Pvt Ltd engages to a) provide services over the Platform on
          Doctor's Diary Pvt Ltd's behalf; b) maintain the Platform and mailing
          lists; or c) communicate with you on Doctor's Diary Pvt Ltd's behalf
          about offers relating to its products and/or services. Doctor's Diary
          Pvt Ltd will take reasonable steps to ensure that these third-party
          service providers are obligated to protect your Personal Information
          and are also subject to appropriate confidentiality / non-disclosure
          obligations.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          The Company does not provide any Personal Information to the
          advertiser when you interact with or view a targeted advertisement.
          However, if you interact with or view an advertisement, the advertiser
          may make certain assumptions and, in the process, learn certain
          Personal Information about you. For instance, if you view and click an
          advertisement that is targeted towards women in the age group 18- 24
          from a specific geographic area, the advertiser may assume that you
          meet the relevant criteria.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          Doctor's Diary Pvt Ltd does not intend to transfer Personal
          Information without your consent to third parties who are not bound to
          act on Doctor's Diary Pvt Ltd's behalf unless such transfer is legally
          required.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          If your Personal Information is transferred outside India, we take the
          necessary steps to protect your Personal Information in accordance
          with applicable data protection laws.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Third Party Content:
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Please be aware that the Platform sometimes may contain links to other
          sites that are not governed by this Privacy Policy. Users may be
          directed to third-party sites for more information, such as
          advertisers, blogs, content sponsorships, vendor services, social
          networks, etc.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          Doctor's Diary Pvt Ltd makes no representations or warranties
          regarding how your information is stored or used on third-party
          servers. We recommend that you review the applicable privacy
          statements and policies of each third-party site linked from the
          Platform to determine their use of your personal information.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Children Information
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          Use of our Platform is available only to persons who can form a
          legally binding contract under the Indian Contract Act, 1872. We do
          not knowingly solicit or collect personal information from children
          under the age of 18 years. If you have shared any personal information
          of children under the age of 18 years, you represent that you have the
          authority to do so and permit us to use the information in accordance
          with this Privacy Policy. If you are under the age of 18 or the age of
          majority in your jurisdiction, you must use the Platform under the
          supervision of your parent, legal guardian or responsible adult.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          {" "}
          Retention of Personal Information
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We retain your personal information in accordance with applicable
          laws, for a period no longer than is required for the purpose for
          which it was collected or as required under any applicable law.
          However, we may retain data related to you if we believe it may be
          necessary to prevent fraud or future abuse, to enable Doctor's Diary
          Pvt Ltd to exercise its legal rights and/or defend against legal
          claims or if required by law or for other legitimate purposes.{" "}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          We may continue to retain your data in anonymised form for analytical
          and research purposes.{" "}
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Controlling your personal information
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          You have the right to invoke your rights which are available to data
          principals or data subjects (as per applicable laws and regulations)
          in relation to your Personal Information which is being processed by
          Doctor's Diary Pvt Ltd.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Doctor's Diary Pvt Ltd provides you the ability to keep your Personal
          Information accurate and up-to-date. If at any time you would like to
          a) rectify, update or correct your Personal Information; b) obtain
          confirmation on whether or not your Personal Information is processed
          by it; c) access your Personal Information or exercise your right to
          data portability; or d) exercise your right to restrict the continuing
          disclosure of your Personal Information to any third party by Doctor's
          Diary Pvt Ltd in certain circumstances, you are requested to contact
          us using the contact details mentions in paragraph 14 below. We will
          require you to provide a valid proof of your identity, in order to
          ensure that your rights are respected. For the exercise of certain
          rights, you may be required to approach the relevant authority /
          designated officer as per the provisions of the applicable data
          protection laws, Doctor's Diary Pvt Ltd may in accordance with the
          provisions of applicable data protection laws, charge a fee for
          fulfilling your request, in particular in case of excessive or
          manifestly unfounded request. Further you acknowledge that the above
          mentioned rights are not absolute and are subject to limitations as
          per the applicable data protection laws.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          At any time, if you wish to delete your account on Doctor's Diary Pvt
          Ltd it can be initiated by raising a request with our call center and
          necessary action for deletion of user account will be taken by us.{" "}
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Confidentiality and Security{" "}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          The security and confidentiality of your Personal Information is
          important to us and Doctor's Diary Pvt Ltd has invested significant
          resources to protect the safekeeping and confidentiality of your
          personal data. When using external service providers acting as
          processors, we require that they adhere to the same standards as
          Doctor's Diary Pvt Ltd does. Regardless of where your Personal
          Information is transferred or stored, we take all steps reasonably
          necessary to ensure that personal data is kept secure.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          We seek to ensure compliance with the requirements of the Information
          Technology Act, 2000 and Rules made there under to ensure the
          protection and preservation of your privacy. We have physical,
          electronic, and procedural safeguards that comply with the laws
          prevalent in India to protect your Personal Information. By accepting
          the terms of this Privacy Policy, you agree that the standards and
          practices being implemented by us, are reasonable and sufficient for
          the protection of your Personal Information.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Your Personal Information is maintained by Doctor's Diary Pvt Ltd in
          electronic form on its equipment, and on the equipment of its
          employees. Such information may also be converted to physical form
          from time to time. Doctor's Diary Pvt Ltd takes all necessary
          precautions to protect your personal information both online and
          off-line, and implements reasonable security practices and measures
          including certain managerial, technical, operational and physical
          security control measures that are commensurate with respect to the
          information being collected and the nature of Doctor's Diary Pvt Ltd's
          business.{" "}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          No administrator at Doctor's Diary Pvt Ltd will have knowledge of your
          password. It is important for you to protect against unauthorized
          access to your password, your computer and your mobile phone. Be sure
          to log off from the Website when finished. Doctor's Diary Pvt Ltd does
          not undertake any liability for any unauthorised use of your account
          and password. If you suspect any unauthorized use of your account, you
          must immediately notify Doctor's Diary Pvt Ltd by sending an email to
          info@Doctor's Diary Pvt Ltd. You shall be liable to indemnify Doctor's
          Diary Pvt Ltd due to any loss suffered by it due to such unauthorized
          use of your account and password.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          Doctor's Diary Pvt Ltd makes all User information accessible to its
          employees, agents or partners and third parties only on a need-to-know
          basis, and binds only its employees to strict confidentiality
          obligations.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          Part of the functionality of Doctor's Diary Pvt Ltd is assisting the
          doctors to maintain and organise such information. Doctor's Diary Pvt
          Ltd may, therefore, retain and submit all such records to the
          appropriate authorities, or to doctors who request access to such
          information.{" "}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Part of the functionality of the Doctor's Diary Pvt Ltd is assisting
          the patients to access information relating to them. Doctor's Diary
          Pvt Ltd may, therefore, retain and submit all such records to the
          relevant patients, or to their doctors.{" "}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          Notwithstanding the above, Doctor's Diary Pvt Ltd is not responsible
          for the confidentiality, security or distribution of your Personal
          Information by our partners and third parties outside the scope of our
          agreement with such partners and third parties. Further, Doctor's
          Diary Pvt Ltd shall not be responsible for any breach of security or
          for any actions of any third parties or events that are beyond the
          reasonable control of Doctor's Diary Pvt Ltd including but not limited
          to, acts of government, computer hacking, unauthorised access to
          computer data and storage device, computer crashes, breach of security
          and encryption, poor quality of Internet service or telephone service
          of the User etc.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Social Media
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          Doctor's Diary Pvt Ltd may operate channels, pages and accounts on
          some social media sites to inform, assist and engage with customers.
          Doctor's Diary Pvt Ltd monitors and records comments and posts made on
          these channels about itself in order to improve its products and
          services. Please note that you must not communicate the following
          information to Doctor's Diary Pvt Ltd through such social media sites:
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          - sensitive personal data including (i) special categories of personal
          data meaning any information revealing racial or ethnic origin,
          political opinions, religious or philosophical beliefs, or trade union
          membership, and the processing of genetic data, biometric data for the
          purpose of uniquely identifying a natural person, data concerning
          health or data concerning a natural person's sex life or sexual
          orientation and (ii) other sensitive personal data such as criminal
          convictions and offences and national identification number ; -
          Excessive, inappropriate, offensive or defamatory content. Doctor's
          Diary Pvt Ltd is not responsible for any information posted on those
          sites on its behalf Doctor's Diary Pvt Ltd is only responsible for its
          own use of the Personal Information received through such sites.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          Changes to this Privacy Policy{" "}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          Doctor's Diary Pvt Ltd reserves the right to update, change or modify
          this Privacy Policy at any time. The Privacy Policy shall come to
          effect from the date of publication of such update, change or
          modification.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-primary">
          {" "}
          Disclaimer
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Doctor's Diary Pvt Ltd does not store any account related information
          or any credit / debit card details. Doctor's Diary Pvt Ltd shall not
          be liable for any loss or damage sustained by Users as a result of any
          disclosure (inadvertent or otherwise) of any information concerning
          the User's account, credit cards or debit cards in the course of any
          online transactions or payments made for any products and/or services
          offered through the Platform.{" "}
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          In case any Personal Information is shared by you with Doctor's Diary
          Pvt Ltd, which is not requested by Doctor's Diary Pvt Ltd during
          registration, (whether mandatorily or optionally), Doctor's Diary Pvt
          Ltd will not be liable for any information security breach or
          disclosure in relation to such information.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          {" "}
          If you have any questions regarding this Privacy Policy or the
          protection of your Personal Information, please contact Doctor's Diary
          Pvt Ltd's Data Protection Officer/ Grievance Officer at the following:
        </p>
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Data Protection Officer/ Grievance Officer{" "}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          In case you have any complaints and/or grievances in relation to the
          processing of your Personal Information you can send your complaints
          via e-mail to our grievance officer:{" "}
        </p>

        <ul className="list-disc list-inside space-y-4 text-gray-600 leading-relaxed mb-6">
          <li>
            <span>Phone </span> +91 9598149103
          </li>
          <li>
            <span>Email </span>help@adoctorsdiary.com{" "}
          </li>
          <li>
            <span>Time </span>Mon - Sat (9:00 - 18:00){" "}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PrivacyPolicy
