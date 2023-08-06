import {
  SEO,
  AppLayout,
  Box,
  Card,
  Heading,
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";

const TermsOfService = () => {
  const { t: to } = useTranslation("common");

  return (
    <AppLayout title={to(`privacy-policy`)} contentWidth={"container.xl"}>
      <SEO title={to(`privacy-policy`)} />
      <Card my={6}>
        <Stack
          color={useColorModeValue("gray.700", "gray.300")}
          gap={2}
          fontSize="sm"
        >
          <Heading fontSize="lg" fontWeight="medium">
            Effective date: November 1, 2020
          </Heading>
          <Text>
            Please note that Users in different regions may be subject to
            different data protection standards; this document has a section
            dedicated to Californian consumers and their privacy rights, as well
            asa section dedicated to European Union consumers and their privacy
            rights.
          </Text>
          <Text>
            This document can be printed for reference by using the print
            command in the settings of any browser.
          </Text>
          <Text>
            By using this website or mobile application(the “Site”), or the
            services provided by Mederva Medical Corporation, (“Company”, “we”,
            “our” or “us”), you are accepting the practices described in this
            Privacy Policy. If you do not agree to this Privacy Policy, please
            do not use the Site, the Company’s services, or the Company’s mobile
            applications.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            What is the purpose of this Privacy Policy?
          </Heading>
          <Text>
            This Privacy Policy discloses Company’s personal information
            gathering and dissemination practices with respect to the Site,
            mobile applications, and our services. Please read this Privacy
            Policy carefully.
          </Text>
          <Text>
            We have also created this Privacy Policy to demonstrate our
            commitment to privacy. We recognize that when you provide us with
            information about yourself that you trust us to act in a responsible
            manner with that information. We are committed to making sure we
            earn that trust.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            What information do we collect from users and how is it used?
          </Heading>
          <Text>
            The following describes the types of personal and other information
            the Company may collect about you, and how the Company may use and
            maintain that information, including, but not limited to:
          </Text>
          <Text>
            <b>Eligibility and claims.</b> If you are eligible for Company
            services through your employer (together, your “employer”), your
            employer may provide to us data required to verify your eligibility,
            to allow us to communicate with you, and to understand your health.
            This information may include your name, email address, phone number,
            medical history and claims, and information used to verify your
            identity (such as birthday, and/or employee ID number).
          </Text>
          <Text>
            <b>Registration.</b> Before you can utilize certain services that we
            offer on the Site or otherwise, we may ask that you register with
            the Site and provide us with your email address, a password, your
            first and last name and other contact information and personal
            details. We request this information for identification purposes, to
            communicate with you regarding your account, and to facilitate the
            functioning of certain services. We may keep this information
            indefinitely.
          </Text>
          <Text>
            <b>Forms.</b> To fully utilize the services we offer, you may be
            required to fill out forms that will contain personal information
            such as your name, address, telephone number, social security
            number, account information, employment, health status and other
            personal information relevant to your health insurance coverage,
            diagnosis and treatment.
          </Text>
          <Text>
            <b>Medical Records.</b> In order for the medical professionals
            giving second-opinions regarding your health, you may be required to
            provide us with past and current medical records, description of
            symptoms, a medical history and life-style descriptions.
          </Text>
          <Text>
            <b>Correspondence.</b> If you correspond with us via email, we may
            gather in a file specific to you the information that you submit. We
            may keep this information indefinitely.
          </Text>
          <Text>
            <b>URL and IP addresses.</b> Like many other websites, Company
            collects information about users’ utilization and navigation of our
            Site. This information helps us to design our Site to better suit
            our users’ needs. For example, our Site will track the URL that you
            visited before you came to our Site, the URL to which you next go
            and your Internet Protocol (IP) address. We use your IP address to
            help diagnose problems with our server and to administer our Site.
            Your IP address also is used to help identify you and to gather
            broad demographic information.
          </Text>
          <Text>
            <b>Information Collected With Cookies.</b> Like most major websites,
            Company uses cookies on certain pages of our Site. Cookies make
            using the Internet easier by, among other things, saving your
            preferences for you. For example, a cookie lets the Site remember
            that you’ve registered, which allows us to speed up your future
            activities at our Site, and which allows you to enter your
            registration information less frequently while visiting our Site. We
            may also use cookies to deliver content tailored to your interests.
            Our cookies may enable us to relate your use of our Site to
            personally identifying information that you previously submitted,
            such as calling you by name when you return to our Site. If your
            browser is set to reject cookies, or if your browser notifies you
            that you are about to receive a cookie and you reject it, then your
            use of the Site may not be as efficient or as enjoyable as it would
            be if the cookie were enabled. The information that we collect with
            cookies allows us to improve our marketing and promotional efforts,
            to statistically analyze Site usage, to improve our content and
            product offerings and to customize our Site’s content, layout and
            services. However, we only use information collected with cookies on
            an aggregated basis without the use of any information that
            personally identifies you. You may learn more about specific cookies
            later in this document.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            To whom does Company disclose information about you that we collect?
          </Heading>
          <Text>
            We will not share, rent, sell or otherwise disclose any of the
            personally identifiable information that we collect about you,
            except when we have your permission or in any of the following
            situations
          </Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              If you have requested a Service, we may use information about you
              to fulfill such request (including providing that information to
              third parties). We may also at any time review your case, your
              medical records from prior to and after your interaction with the
              Site, and any records created as a result of services received. We
              may share information about you, your care, and your use of
              services to your healthcare payor, or as necessary to implement
              plan designs described to you in your applicable health plan
              documentation, or on your request. If your health plan provides
              incentives for utilization of services, we will share information
              required to implement such incentives. We may request courtesy
              notices from your treating physician(s) and/or request additional
              medical records from them, including records pertaining to care
              you received after receiving the services. We may review these
              records for, among other purposes, reviewing the quality of
              service you received, reviewing the quality of service provided by
              the physicians and medical professionals treating you (including
              the physicians and medical professionals to whom you may have
              received a referral), to better understand the course of treatment
              for your condition(s) including information regarding outcomes and
              costs, and to improve treatments and recommendations for people
              with similar or different conditions. We will take care to
              minimize personally identifying information in this process. We
              may also use anonymous information gathered, including information
              from your medical records, to generate conclusions about the
              healthcare process, particular conditions, and other matters. We
              and our affiliated physicians and researchers may publish this
              anonymous information in journals, websites and other locations.
              However, we will not publish your name or any identifying
              information about you; we will use only anonymous data for any
              public purpose.
            </ListItem>
            <ListItem>
              We may disclose information that we collect about you to our
              third-party contractors who perform services for Company in order
              to provide certain services or to complete or confirm a
              transaction that you conduct with us.
            </ListItem>
            <ListItem>
              We may use information we know about you to contact you to inform
              you about relevant services, including by telephone, text message,
              or direct mail.
            </ListItem>
            <ListItem>
              We may disclose the results of aggregated data about you for
              marketing or promotional purposes (for instance, that a certain
              percentage of our Site’s users are living in a particular
              location). In these situations, we do not disclose to these
              entities any information that could be used to personally identify
              you. Certain information, such as your password, is not disclosed
              to marketing advertisers at all, even in aggregate form.
            </ListItem>
            <ListItem>
              We may disclose information about you as part of a merger,
              acquisition or other sale or transfer of its assets or business.
              Company does not guarantee that any entity receiving such
              information in connection with one of these transactions will
              comply with all terms of this policy.
            </ListItem>
            <ListItem>
              We may disclose information about you for purposes such as to
              provide services available on the Site; to coordinate with
              insurance, reinsurance and excess or stop loss insurers; to
              enforce our members’ rights; to protect against actual or
              potential fraud; to resolve member inquiries or disputes; to
              receive payments; to carry out our business; to protect the
              confidentiality or security of our records; to administer
              preventive health and case management programs; to perform
              auditing and ratemaking functions; to enable our service providers
              to perform marketing services on our behalf and inform Members
              about our own products or services; to comply with federal or
              state laws and other applicable legal requirements.
            </ListItem>
            <ListItem>
              We may disclose your information, to the extent permitted by law,
              in court or in the stages leading to possible legal action arising
              from improper use of this website, application or services, or due
              to a dispute you initiate in connection with the related services.
            </ListItem>
            <ListItem>
              Moreover, we may be legally obligated to disclose information
              about you to the government or to third parties under certain
              circumstances, such as in connection with illegal activity on our
              Site or to respond to a subpoena, court order or other legal
              process. Company reserves the right to release information that we
              collect to law enforcement or other government officials, as we,
              in our sole and absolute discretion, deem necessary, appropriate
              or as required under law, such as your statement to hurt yourself
              or others.
            </ListItem>
          </UnorderedList>
          <Text>
            If you use our Site or services outside of the United States,
            information that we collect about you will be transferred to servers
            inside the United States, which may involve the transfer of
            information out of countries located in the European Economic Area.
            By allowing Company to collect information about you, you consent to
            such transfer and processing of your data.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            Your Rights Regarding Your Protected Health Information
          </Heading>
          <Text>
            You have certain rights regarding protected health information that
            we maintain about you.
          </Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              <b>Right to Access Your Protected Health Information.</b> You have
              the right to review or obtain copies of your protected health
              information records, with some limited exceptions. Usually the
              records include enrollment, billing, claims payment and case or
              medical management records. Your request to review and/or obtain a
              copy of your protected health information records must be made in
              writing. We may charge a fee for the costs of producing, copying
              and mailing your requested information, but we will tell you the
              cost in advance (waived as applicable by the GDPR and/or CCPA).
            </ListItem>
            <ListItem>
              <b>Right to Amend Your Protected Health Information.</b> If you
              feel that your information (including protected health
              information) maintained by us is incorrect or incomplete, you may
              request that we amend the information. Your request must be made
              in writing and must include the reason you are seeking a change.
              We may deny your request if, for example, you ask to amend a
              record that is already accurate and complete.
            </ListItem>
          </UnorderedList>
          <Text>
            If we deny your request to amend, we will notify you in writing. You
            then have the right to submit to us a written statement of
            disagreement with our decision and we have the right to rebut that
            statement.
          </Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              <b>Right to an Accounting of Disclosures.</b> You have the right
              to request an accounting of disclosures we have made of your
              protected health information. The list will not include our
              disclosures related to your treatment, our payment or healthcare
              operations, or disclosures made to you or with your authorization
              (except for users covered by the GDPR regime, which may request
              such uses). The list may also exclude certain other disclosures,
              such as for national security purposes.
            </ListItem>
          </UnorderedList>
          <Text>
            Your request for an accounting of disclosures must be made in
            writing and must state a time period for which you want an
            accounting. Your request should indicate in what form you want the
            list (for example, on paper or electronically). The first accounting
            that you request within a 12-month period will be free. For users
            outside the GDPR regime, we may charge for providing the accounting
            additional lists within the same time period, but we will tell you
            the cost in advance.
          </Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              <b>
                Right to Request Restrictions on the Use and Disclosure of Your
                Protected Health Information.
              </b>
              You have the right to request that we restrict or limit how we use
              or disclose your protected health information (or for users
              covered by the GDPR, all personal information) for treatment,
              payment or healthcare operations. We may not agree to your
              request. If we do agree, we will comply with your request unless
              the information is needed for an emergency. Your request for a
              restriction must be made in writing. In your request, you must
              tell us: (i) what information you want to limit; (ii) whether you
              want to limit how we use or disclose your information, or both;
              and (iii) to whom you want the restrictions to apply.
            </ListItem>
            <ListItem>
              <b>Right to Receive Confidential Communications.</b> You have the
              right to request that we use a certain method to communicate with
              you or that we send information about you to a certain location if
              the communication could endanger you. Your request to receive
              confidential communications must be made in writing. Your request
              must clearly state that all or part of the communication from us
              could endanger you. We will accommodate all reasonable requests.
              Your request must specify how or where you wish to be contacted.
            </ListItem>
            <ListItem>
              <b>Right to a Paper Copy of This Privacy Policy.</b> You have a
              right at any time to request a paper copy of this Privacy Policy,
              even if you had previously agreed to receive an electronic copy.
            </ListItem>
            <ListItem>
              <b>Contact Information for Exercising Your Rights.</b> You may
              exercise any of the rights described above by contacting our
              Privacy Office as follows:
            </ListItem>
          </UnorderedList>
          <Text>
            Privacy Officer
            <br />
            Mederva Medical Corporation
            <br />
            415 Mission St, 37th floor
            <br />
            San Francisco, CA 94105
            <br />
            1-800-988-5534
            <br />
            privacy@medervahealth.com
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            What security measures does the Site employ?
          </Heading>
          <Text>
            To help protect the privacy of data you transmit through this Site,
            where personally identifiable information is requested, we also use
            technology designed to encrypt the information that you input before
            it is sent to us using Secure Sockets Layer (SSL) technology or
            similar encryption technology. In addition, Company takes steps to
            protect the user data we collect against unauthorized access.
            However, you should keep in mind that this Site and our services are
            run on software, hardware and networks, any component of which may,
            from time to time, require maintenance or experience problems or
            breaches of security beyond our control.
          </Text>
          <Text>
            Please also be aware that despite our best intentions and the
            guidelines outlined in this Privacy Policy, no data transmission
            over the Internet or encryption method can be guaranteed to be 100%
            secure.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            How can you correct or update information that we collect about you?
          </Heading>
          <Text>
            You may correct or update information collected about you by
            managing your account profile or by contacting Company at the email
            or mailing address noted below. We will use reasonable efforts to
            update our records. If necessary, we may retain original and updated
            information for reasons such as technical constraints, dispute
            resolution, troubleshooting and agreement enforcement.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            What are the policies of linked Sites and other third parties?
          </Heading>
          <Text>
            This Privacy Policy only addresses the use and disclosure of
            information we collect from you. You should be aware that when you
            are on the Site, you can be directed to other websites that are
            beyond our control, and Company is not responsible for the privacy
            practices of third parties or the content of linked websites. We
            encourage you to read the posted privacy policy whenever interacting
            with any website.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            How will I know about changes in the Privacy Policy?
          </Heading>
          <Text>
            Company reserves the right to update this Privacy Policy from time
            to time. Please visit this page periodically so that you will be
            apprised of any changes.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            What is our policy on children users of our Site?
          </Heading>
          <Text>
            We do not knowingly collect or maintain personally identifiable
            information from persons under 18 years old, and no part of our Site
            is directed to persons under 18. IF YOU ARE UNDER 13 YEARS OFAGE,
            PLEASE DO NOT USE OR ACCESS OUR SITE AT ANY TIME OR IN ANY MANNER.
            If Company learns that personally identifiable information of
            persons less than 13 years old has been collected without verifiable
            parental consent, then Company will take the appropriate steps to
            delete this information. If you are a parent or guardian and
            discover that your child under the age of 18 has obtained a Company
            account, then you may alert Company at the address below and request
            that we delete that child’s personal information from our systems.
          </Text>
          <Text>
            We do collect from employers information regarding members of all
            ages, so that we may know who is eligible to receive Services. A
            parent/guardian may request that we stop processing that information
            if eligible under CCPA or GDPR, as further described below, however
            you should contact your employer if you would like that information
            no longer provided to health carriers.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            What law governs my use of the Site and Company’s services?
          </Heading>
          <Text>
            By choosing to visit this Site, use our services, or otherwise
            provide information to Company, you agree that any dispute over
            privacy or the terms contained in this Privacy Policy will be
            governed by the law of the State of California. You also agree to
            abide by any limitation on damages contained in our Terms of Service
            or other agreement that we have with you.
          </Text>
          <Text>
            <b>How to contact us / data controller?</b> If you have any
            questions about this PrivacyPolicy, or need to reach the owner /
            data controller for any other reason, you may contact us by e-mail
            at privacy@medervahealth.com or by mail:
          </Text>
          <Text>
            Mederva Medical Corporation
            <br />
            415 Mission St, 37th floor
            <br />
            San Francisco, CA 94105
            <br />
            1-800-988-5534
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            Additional Information About This Privacy Statement
          </Heading>
          <Text>
            The policies indicated in this Privacy Policy will remain effective,
            even if the Member’s coverage is terminated, to the extent we retain
            information about a member. We may change this Privacy Policy at any
            time and will inform you of any changes as required by law or
            regulation.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            Information about Particular Services
          </Heading>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Analytics
            </Heading>
            <Text>
              The services contained in this section enable the Owner to monitor
              and analyze web traffic and can be used to keep track of User
              behavior.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Google Analytics (Google Inc.)
            </Heading>
            <Text>
              Google Analytics is a web analysis service provided by Google Inc.
              (“Google”). Google utilizes the Data collected to track and
              examine the use of thisApplication, to prepare reports on its
              activities and share them with otherGoogle services. Google may
              use the Data collected to contextualize and personalize the ads of
              its own advertising network. <br />
              Personal Data collected: Cookies and Usage data. <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.google.com/intl/en/policies/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Display Advertising extension for GoogleAnalytics (Google Inc.)
            </Heading>
            <Text>
              Google Analytics on this Application might use Google’s
              Interest-based advertising, 3rd-party audience data and
              information from the DoubleClickCookie to extend analytics with
              demographics, interests and ads interaction data.
              <br /> Personal Data collected: Cookies and Usage data. <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.google.com/intl/policies/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              MixPanel (MixPanel)
            </Heading>
            <Text>
              MixPanel is an analytics service provided by Mixpanel Inc. <br />
              Personal Data collected: Cookies and Usage data. <br />
              Place of processing: US –{" "}
              <Link href="http://mixpanel.com/privacy/" target="_blank">
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Analytics collected directly (This Website)
            </Heading>
            <Text>
              This Website uses an internal analytics system that does not
              involve third parties. <br />
              Personal Data collected: Cookies and Usage Data.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Google Tag Manager (Google Inc.)
            </Heading>
            <Text>
              Google Tag Manager is an analytics service provided by Google Inc.{" "}
              <br />
              Personal Data collected: Cookies and Usage data. <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.google.com/intl/policies/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Facebook Ads conversion tracking (Facebook,Inc.)
            </Heading>
            <Text>
              Facebook Ads conversion tracking is an analytics service provided
              by Facebook,Inc. that connects data from the Facebook advertising
              network with actions performed on this Website. <br />
              Personal Data collected: Cookies and Usage Data, Tracking Pixel.
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.facebook.com/about/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Facebook Analytics for Apps (Facebook, Inc.)
            </Heading>
            <Text>
              Facebook Analytics for Apps is an analytics service provided by
              Facebook, Inc. <br />
              Personal Data collected: Usage Data and various types of Data as
              specified in the privacy policy of the service.
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.facebook.com/about/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Google AdWords conversion tracking (Google Inc.)
            </Heading>
            <Text>
              Google AdWords conversion tracking is an analytics service
              provided by GoogleInc. that connects data from the Google AdWords
              advertising network with actions performed on this Website. <br />
              Personal Data collected: Cookies and Usage Data, Tracking Pixel.{" "}
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.google.com/intl/en/policies/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              LinkedIn conversion tracking (LinkedInCorporation)
            </Heading>
            <Text>
              LinkedIn conversion tracking is an analytics service provided by
              LinkedInCorporation that connects data from the LinkedIn
              advertising network with actions performed on this Website. <br />
              Personal Data collected: Cookies and Usage Data, Tracking Pixel.{" "}
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.linkedin.com/legal/privacy-policy"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Content Commenting
            </Heading>
            <Text>
              Content commenting services allow Users to make and publish their
              comments on the contents of this Website.
              <br />
              Depending on the settings chosen by the Owner, Users may also
              leave anonymous comments. If there is an email address among the
              Personal Data provided by theUser, it may be used to send
              notifications of comments on the same content.Users are
              responsible for the content of their own comments.
            </Text>
            <Text>
              If a content commenting service provided by third parties is
              installed, it may still collect web traffic data for the pages
              where the comment service is installed, even when Users do not use
              the content commenting service.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Disqus (Disqus)
            </Heading>
            <Text>
              Disqus is a content commenting service provided by Big Heads Labs
              Inc. <br />
              Personal Data collected: Cookies, Usage Data and various types of
              Data asspecified in the privacy policy of the service.
              <br />
              Place of processing: US – Privacy Policy – Opt out
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Displaying content from external platforms
            </Heading>
            <Text>
              This type of service allows you to view content hosted on external
              platforms directly from the pages of this Website and interact
              with them. <br />
              This type of service might still collect web traffic data for the
              pages where the service is installed, even when Users do not use
              it.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Wistia widget (Wistia, Inc.)
            </Heading>
            <Text>
              Wistia is a video content visualization service provided by
              Wistia, Inc. that allows this Website to incorporate content of
              this kind on its pages. <br />
              Personal Data collected: Cookies and Usage Data. <br />
              Place of processing: US –{" "}
              <Link href="https://wistia.com/privacy" target="_blank">
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Infrastructure monitoring
            </Heading>
            <Text>
              This type of service allows this Website to monitor the use and
              behavior of its components so its performance, operation,
              maintenance and troubleshooting can be improved. Which Personal
              Data are processed depends on the characteristics and mode of
              implementation of these services, whose function is to filter the
              activities of this Website.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Rollbar (Rollbar, Inc.)
            </Heading>
            <Text>
              Rollbar is a monitoring service provided by Rollbar, Inc.
              <br />
              Personal Data collected: various types of Data as specified in the
              privacy policy of the service.
              <br />
              Place of processing: US –{" "}
              <Link href="https://rollbar.com/privacy/" target="_blank">
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Managing contacts and sending messages
            </Heading>
            <Text>
              This type of services makes it possible to manage a database of
              email contacts, phone contacts or any other contact information to
              communicate with the User.
            </Text>
            <Text>
              These services may also collect data concerning the date and time
              when the message was viewed by the User, as well as when the User
              interacted with it, such as by clicking on links included in the
              message.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Marketo Email Marketing (Marketo, Inc.)
            </Heading>
            <Text>
              Marketo Email Marketing is an email address management and message
              sending service provided by Marketo, Inc.
              <br />
              Personal Data collected: email address and Usage data.
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.marketo.com/trust/legal/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Interaction with external social networks and platforms
            </Heading>
            <Text>
              This type of services allows interaction with social networks or
              other external platforms directly from the pages of this
              Application.
              <br />
              The interaction and information obtained through this Application
              are always subject to the User’s privacy settings for each social
              network.
              <br />
              This type of service might still collect traffic data for the
              pages where the service is installed, even when Users do not use
              it.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Facebook Like button and social widgets (Facebook, Inc.)
            </Heading>
            <Text>
              The Facebook Like button and social widgets are services allowing
              interaction with the Facebook social network provided by Facebook,
              Inc. Personal Data collected: Cookies and Usage data. Place of
              processing: US –{" "}
              <Link
                href="http://www.facebook.com/privacy/explanation.php"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Google+ +1 button and social widgets (GoogleInc.)
            </Heading>
            <Text>
              The Google+ +1 button and social widgets are services allowing
              interaction with the Google+ social network provided by Google
              Inc.
              <br />
              Personal Data collected: Cookies and Usage data.
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.google.com/intl/policies/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Twitter Tweet button and social widgets (Twitter, Inc.)
            </Heading>
            <Text>
              The Twitter Tweet button and social widgets are services allowing
              interaction with the Twitter social network provided by Twitter,
              Inc.
              <br />
              Personal Data collected: Cookies and Usage data.
              <br />
              Place of processing: US –{" "}
              <Link href="https://twitter.com/privacy" target="_blank">
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              ShareThis (Sharethis Inc.)
            </Heading>
            <Text>
              ShareThis is a service provided by ShareThis Inc., which displays
              a widget that allows interaction with social networks and external
              platforms as well as sharing the contents of this Website.
              <br />
              Depending on the configuration, this service can display widgets
              belonging to third parties such as the managers of social networks
              where interactions are shared. In this case, also the third
              parties that provide the widget will be informed of interactions
              and Usage Data on the pages where this service is installed.
              <br />
              Personal Data collected: Cookies and Usage Data.
              <br />
              Place of processing: US –{" "}
              <Link href="http://sharethis.com/privacy" target="_blank">
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              LinkedIn button and social widgets (LinkedInCorporation)
            </Heading>
            <Text>
              The LinkedIn button and social widgets are services allowing
              interaction with the LinkedIn social network provided by LinkedIn
              Corporation.
              <br />
              Personal Data collected: Cookies and Usage Data.
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.linkedin.com/legal/privacy-policy"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Remarketing and Behavioral Targeting
            </Heading>
            <Text>
              This type of services allows this Application and its partners to
              inform, optimize and serve advertising based on past use of this
              Application by the User.
              <br />
              This activity is performed by tracking Usage Data and by using
              Cookies, information that is transferred to the partners that
              manage the remarketing and behavioral targeting activity.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Remarketing through Google Analytics forDisplay Advertising
              (Google Inc.)
            </Heading>
            <Text>
              Google Analytics for Display Advertising is a Remarketing and
              Behavioral Targeting service provided by Google Inc. that connects
              the tracking activity performed by Google Analytics and its
              Cookies with the Adwords advertising network and the Doubleclick
              Cookie.
              <br />
              Personal Data collected: Cookies and Usage data.
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.google.com/intl/en/policies/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>{" "}
              – Opt Out
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              AdRoll (Semantic Sugar, Inc.)
            </Heading>
            <Text>
              AdRoll is an advertising service provided by Semantic Sugar, Inc.
              <br />
              Personal Data collected: Cookies and Usage data.
              <br />
              Place of processing: US –{" "}
              <Link href="https://www.adroll.com/about/privacy" target="_blank">
                Privacy Policy
              </Link>{" "}
              – Opt Out
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              LinkedIn Website Retargeting (LinkedInCorporation)
            </Heading>
            <Text>
              LinkedIn Website Retargeting is a remarketing and behavioral
              targeting service provided by LinkedIn Corporation that connects
              the activity of this Website with the LinkedIn advertising
              network.
              <br />
              Personal Data collected: Cookies and Usage Data.
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.linkedin.com/legal/privacy-policy"
                target="_blank"
              >
                Privacy Policy
              </Link>{" "}
              – OptOut
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              User database management
            </Heading>
            <Text>
              This type of services allows the Owner to build user profiles by
              starting from an email address, a personal name, or other
              information that the User provides to this Application, as well as
              to track User activities through analytics features. This Personal
              Data may also be matched with publicly available information about
              the User (such as social networks’ profiles) and used to build
              private profiles that the Owner can display and use for improving
              this Application.
              <br />
              Some of these services may also enable the sending of timed
              messages to the User, such as emails based on specific actions
              performed on this Application.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Marketo Lead Generation (Marketo, Inc.)
            </Heading>
            <Text>
              Marketo Lead Generation is a User database management service
              provided by Marketo, Inc.
              <br />
              Personal Data collected: email address and various types of Data
              as specified in the privacy policy of the service.
              <br />
              Place of processing: US –{" "}
              <Link
                href="https://www.marketo.com/trust/legal/privacy/"
                target="_blank"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Heat mapping and session recording
            </Heading>
            <Text>
              Heat Mapping services are used to display the areas of a page
              where Users most frequently move the mouse or click. This shows
              where the points of interest are. These services make it possible
              to monitor and analyze web traffic and keep track of User
              behavior.
              <br />
              Some of these services may record sessions and make them available
              for later visual playback.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Crazy Egg (Crazyegg)
            </Heading>
            <Text>
              Crazy Egg is a heat mapping service provided by Crazy Egg, Inc.
              <br />
              Personal Data collected: Cookies and Usage Data.
              <br />
              Place of processing: US –{" "}
              <Link href="https://www.crazyegg.com/privacy" target="_blank">
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Content performance and features testing (A/B testing)
            </Heading>
            <Text>
              The services contained in this section allow the Owner to track
              and analyze the User response concerning web traffic or behavior
              regarding changes to the structure, text or any other component of
              this Website.
            </Text>
          </Box>
          <Box>
            <Heading fontSize="sm" fontWeight="semibold" pt={2} pb={1}>
              Optimizely (Optimizely, Inc.)
            </Heading>
            <Text>
              Optimizely is an A/B testing service provided by Optimizely, Inc.
              <br />
              Personal Data collected: Cookies and Usage Data.
              <br />
              Place of processing: US –{" "}
              <Link href="https://www.optimizely.com/privacy/" target="_blank">
                Privacy Policy
              </Link>
            </Text>
          </Box>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            Contacting the User
          </Heading>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Contact form (this Website)
          </Heading>
          <Text>
            By filling in any contact form with their Data, the User authorizes
            thisWebsite to use these details to reply to requests for
            information, quotes or any other kind of request as indicated by the
            form’s header.
            <br />
            Personal Data collected: various types of Data.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            System logs and maintenance
          </Heading>
          <Text>
            For operation and maintenance purposes, this Website and any
            third-partyservices may collect files that record interaction with
            this Website (Systemlogs) use other Personal Data (such as the IP
            Address) for this purpose.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Additional Information for EU / EEC Users
          </Heading>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Data Is required to provide services
          </Heading>
          <Text>
            Unless otherwise specified, all data requested is mandatory and your
            choice to not provide data may make it impossible to provide
            services to you. In cases where we have made clear that some Data is
            not mandatory, you are free not to communicate this Data without any
            consequences on the availability or the functioning of the service.
            If you are uncertain about which Personal Data is mandatory then you
            are welcome to contact us at the address specified above.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Additional information about your PersonalData
          </Heading>
          <Text>
            In addition to the information contained in this privacy policy,
            upon your request we may you with additional and contextual
            information concerning particular services or the collection and
            processing of Personal Data.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Your GDPR rights
          </Heading>
          <Text>
            Solely to the extent applicable to the Company, if you are subject
            to the GDPR regime, then you have the right, at any time, to know
            whether your PersonalData has been stored. You and can consult the
            Company to learn about their contents and origin, to verify their
            accuracy or to ask for them to be supplemented, cancelled, updated
            or corrected, or for their transformation into anonymous format or
            to block any data held in violation of the law, as well as to oppose
            their treatment for any and all legitimate reasons. Requests should
            be sent to the Data Controller at the contact information set out
            above.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Additional information regarding methods of processing
          </Heading>
          <Text>
            The Owner takes security measures to prevent unauthorized access,
            disclosure, modification, or unauthorized destruction of the Data.
            The Data processing is carried out using computers and/or IT enabled
            tools, following organizational procedures and modes strictly
            related to the purposes indicated. In addition to the Owner, in some
            cases, the Data may be accessible to certain types of persons in
            charge, involved with the operation of this Website (administration,
            sales, marketing, legal, system administration) or external parties
            (such as third-party technical service providers, mail carriers,
            hosting providers, IT companies, communications agencies) appointed,
            if necessary, as Data Processors by the Owner. If applicable, this
            list may be requested and by a GDPR-coveredPerson from the Owner at
            any time.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Legal basis for processing
          </Heading>
          <Text>
            The Owner may process Personal Data relating to Users if one of the
            following applies:
          </Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              Users or their agents (including group sponsors and employers)
              have given their consent for one or more specific purposes. Note:
              Under some legislations the Owner may be allowed to process
              Personal Data until the User objects to such processing
              (“opt-out”), without having to rely on consent or any other of the
              following legal bases;
            </ListItem>
            <ListItem>
              provision of Data is necessary for the performance of an agreement
              with the User or an authorized agent of the User (such as a group
              sponsor or employer) and/or for any pre contractual obligations
              thereof;
            </ListItem>
            <ListItem>
              processing is necessary for compliance with a legal obligation to
              which the Owner is subject;
            </ListItem>
            <ListItem>
              processing is related to a task that is carried out in the public
              interest or in the exercise of official authority vested in the
              Owner;
            </ListItem>
            <ListItem>
              processing is necessary for the purposes of the legitimate
              interests pursued by the Owner or by a third party.
            </ListItem>
          </UnorderedList>
          <Text>
            In any case, the Owner will gladly help to clarify the specific
            legal basis that applies to the processing, and in particular
            whether the provision of Personal Data is a statutory or contractual
            requirement, or a requirement necessary to enter into a contract.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Place of processing
          </Heading>
          <Text>
            The Data is processed at the Owner’s operating offices, in data
            centers located in the United States and in any other places where
            the parties involved in the processing are located. The United
            States has different (and often lesser)privacy protections than
            other jurisdictions. By providing data, using this website, using
            mobile applications provided by Company, or requesting services, you
            consent to the transfer of your data to the United States and the
            processing of such data in the United States.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Retention time
          </Heading>
          <Text>
            Personal Data shall be processed and stored for as long as required
            by the purpose they have been collected for.
          </Text>
          <Text>Therefore:</Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              Personal Data collected for purposes related to the performance of
              services shall be retained until the longer of (a) such services
              are completed, (b) as specified in a relevant agreement (such as
              an agreement with a group sponsor), and (c) as required to
              maintain records of such services.
            </ListItem>
            <ListItem>
              Personal Data collected for the purposes of the Owner’s legitimate
              interests shall be retained as long as needed to fulfill such
              purposes, including but not limited to retention of records of
              completed services as required by law, regulation and healthcare
              practice and for the other reasons described in this policy. Users
              may find specific information regarding the legitimate interests
              pursued by the Owner within the relevant sections of this document
              or by contacting the Owner.
            </ListItem>
          </UnorderedList>
          <Text>
            The Owner may be allowed to retain PersonalData for a longer period
            whenever the User has given consent to such processing, as long as
            such consent is not withdrawn. Furthermore, the Owner may be obliged
            to retain Personal Data for a longer period whenever required to do
            so for the performance of a legal obligation (including but not
            limited to retention of records of healthcare services performed or
            recommended) or upon order of an authority.
          </Text>
          <Text>
            The right to access, the right to erasure, the right to
            rectification and the right to data portability cannot be enforced
            after information has been deleted.
          </Text>
          <Heading fontSize="xl" fontWeight="medium" pt={4}>
            The purposes of processing
          </Heading>
          <Text>
            Data about you is collected to allow us to provide services to you,
            as well as for the following purposes: Analytics, Remarketing and
            behavioral targeting,Interaction with external social networks and
            platforms, Managing contacts and sending messages, User database
            management, Heat mapping session recording,Content commenting,
            Displaying content from external platforms, Content performance and
            features testing (A/B testing), Generation models of medical and
            clinical conditions, Generation models of physician and clinical
            performance, Infrastructure monitoring and Contacting the User.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Information not contained in this policy
          </Heading>
          <Text>
            More details concerning the collection or processing of Personal
            Data may be requested from the Data Controller at any time. Please
            see the contact information at the beginning of this document.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Legal Basis
          </Heading>
          <Text>
            This privacy statement has been prepared based on provisions of
            multiple legislations, including the U.S. Health Insurance
            Portability andAccountability Act of 1996 (“HIPAA”), the U.S. Health
            Information Technology for Economic and Clinical Health Act
            (“HITECH”). and Art. 13/14 of Regulation(EU) 2016/679 (General Data
            Protection Regulation or “GDPR”).
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Information for Californian consumers
          </Heading>
          <Text>
            This part of the document integrates with and supplements the
            information contained in the rest of the privacy policy and is
            provided by the business running this Website and, if the case may
            be, its parent, subsidiaries and affiliates (for the purposes of
            this section referred to collectively as “we”,“us”, “our”).
          </Text>
          <Text>
            The provisions contained in this section apply to all Users who are
            consumers residing in the state of California, UnitedStates of
            America, according to “The California Consumer Privacy Act of
            2018”(Users are referred to below, simply as “you”, “your”,
            “yours”), and, for such consumers, these provisions supersede any
            other possibly divergent or conflicting provisions contained in the
            privacy policy.
          </Text>
          <Text>
            This part of the document uses the term“personal information“ as it
            is defined in The California Consumer Privacy Act of 2018 (“CCPA”).
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Categories of personal information collected, disclosed or sold
          </Heading>
          <Text>
            Please refer to the list above under “What information do we collect
            from users and how is it used?”
          </Text>
          <Text>
            We will not collect additional categories of personal information
            without updating this document.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            How we use the information we collect: sharing and disclosing of
            your personal information with third parties for a business purpose
          </Heading>
          <Text>
            We may disclose the personal information we collect about you to a
            third party for business purposes. In this case, we enter a written
            agreement with such third party that requires the recipient to both
            keep the personal information confidential and not use it for any
            purpose(s) other than those necessary for the performance of the
            agreement.
          </Text>
          <Text>
            We may also disclose your personal information to third parties when
            you explicitly ask or authorize us to do so, in order to provide you
            with our Service.
          </Text>
          <Text>
            To find out more about the purposes of processing, please refer to
            the relevant section of this document.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Your right to opt out of the sale of personal information
          </Heading>
          <Text>
            We do not sell lists of members. We do not sell your personal health
            information to any party. We do not provide any information to
            pharmaceutical companies.
          </Text>
          <Text>
            However, some actions such as remarketing or statistical analysis
            may be considered “sales” under some interpretations of the CCPA.
            Accordingly, we will make it possible to opt out of those
            activities.
          </Text>
          <Text>
            You have the right to opt out of the sale of your personal
            information. This means that whenever you request us to stop selling
            your data, we will abide by your request.
            <br />
            Such requests can be made freely, at any time, without submitting
            any verifiable request, simply by following the instructions below.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Instructions to opt out of the sale of personal information
          </Heading>
          <Text>
            If you’d like to know more, or exercise your right to opt out in
            regard to all the sales carried out by this Website, both online and
            offline, you can contact us for further information using the
            contact details provided in this document.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            What are the purposes for which we use your personal information?
          </Heading>
          <Text>
            We may use your personal information to allow us to render services
            to you and your employer (if applicable), the operational
            functioning of this Website and features thereof (all together,
            “business purposes”). In such cases, your personal information will
            be processed in a fashion necessary and proportionate to the
            business purpose for which it was collected, and strictly within the
            limits of compatible operational purposes.
          </Text>
          <Text>
            We may also use your personal information for other reasons such as
            for commercial purposes as well as for complying with the law and
            defending our rights before the competent authorities where our
            rights and interests are threatened or we suffer an actual damage.
          </Text>
          <Text>
            We will not use your personal information for different, unrelated,
            or incompatible purposes without notifying you.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            Your California privacy rights and how to exercise them
            <br />
            The right to know and to portability
          </Heading>
          <Text>You have the right to request that we disclose to you:</Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              the categories and sources of the personal information that we
              collect about you, the purposes for which we use your information
              and with whom such information is shared;
            </ListItem>
            <ListItem>
              in case of sale of personal information or disclosure for a
              business purpose, two separate lists where we disclose:
            </ListItem>
            <ListItem>
              for sales, the personal information categories purchased by each
              category of recipient; and
            </ListItem>
            <ListItem>
              for disclosures for a business purpose, the personal information
              categories obtained by each category of recipient.
            </ListItem>
            <ListItem>
              The disclosure described above will be limited to the personal
              information collected or used over the past 12 months.
            </ListItem>
          </UnorderedList>
          <Text>
            If we deliver our response electronically, the information enclosed
            will be “portable”, i.e. delivered in an easily usable format to
            enable you to transmit the information to another entity without
            hindrance – provided that this is technically feasible.
          </Text>
          <Text>
            The right to request the deletion of your personal information
            <br />
            You have the right to request that we delete any of your personal
            information, subject to exceptions set forth by the law (such as,
            including but not limited to, where the information is used to
            identify and repair errors on thisWebsite, to detect security
            incidents and protect against fraudulent or illegal activities, to
            exercise certain rights etc.). For example, we cannot delete
            information that explains medical treatment decisions, as we are
            legally obligated to keep such information.
          </Text>
          <Text>
            If no legal exception applies, as a result of exercising your right,
            we will delete your personal information and direct any of our
            service providers to do so.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            How to exercise your rights
          </Heading>
          <Text>
            To exercise the rights described above, you need to submit your
            verifiable request to us by contacting us at
            privacy@medervahealth.com, by calling on your designated toll-free
            number (or our general toll-free number at 1-800-988-5534), or by
            submitting a message through the“chat” experience once logged-in.
          </Text>
          <Text>
            For us to respond to your request, it’s necessary that we know who
            you are. Therefore, you can only exercise the above rights by making
            a verifiable request which must:
          </Text>
          <UnorderedList spacing={2} pl={5}>
            <ListItem>
              provide sufficient information that allows us to reasonably verify
              you are the person about whom we collected personal information or
              an authorized representative;
            </ListItem>
            <ListItem>
              describe your request with sufficient detail that allows us to
              properly understand, evaluate, and respond to it.
            </ListItem>
          </UnorderedList>
          <Text>
            We will not respond to any request if we are unable to verify your
            identity and therefore confirm the personal information in our
            possession actually relates to you.
            <br />
            If you cannot personally submit a verifiable request, you can
            authorize a person registered with the California Secretary of State
            to act on your behalf.
          </Text>
          <Text>
            If you are an adult, you can make a verifiable request on behalf of
            a minor under your parental authority.
          </Text>
          <Text>
            You can submit a maximum number of 2 requests over a period of 12
            months.
          </Text>
          <Heading fontSize="md" fontWeight="semibold" pt={2}>
            How and when we are expected to handle your request
          </Heading>
          <Text>
            We will confirm receipt of your verifiable request within 10 days
            and provide information about how we will process your request.
            <br />
            We will respond to your request within 45 days of its receipt.
            Should we need more time, we will explain to you the reasons why,
            and how much more time we need. In this regard, please note that we
            may take up to 90 days to fulfill your request.
          </Text>
          <Text>
            Our disclosure(s) will cover the preceding 12 month period.
          </Text>
          <Text>
            Should we deny your request, we will explain you the reasons behind
            our denial.
          </Text>
          <Text>
            We do not charge a fee to process or respond to your verifiable
            request unless such request is manifestly unfounded or excessive. In
            such cases, we may charge a reasonable fee, or refuse to act on the
            request. In either case, we will communicate our choices and explain
            the reasons behind it.
          </Text>
          <Text></Text>
        </Stack>
      </Card>
    </AppLayout>
  );
};

export default TermsOfService;
