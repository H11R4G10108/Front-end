import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Policy() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

        <p className="mb-4">
          Welcome to the website. Please read these terms of service carefully
          before using the website. By using the website, you agree to be bound
          by these terms of service. If you do not agree to these terms of
          service, you may not use the website. These terms of service govern
          your use of the website and all services provided by the website. If
          you do not agree to these terms of service, you may not use the
          website.
        </p>

        <p className="mb-4">
          By accessing this website, you agree to be bound by these terms of
          service, all applicable laws and regulations, and agree that you are
          responsible for compliance with any applicable local laws. If you do
          not agree with any of these terms, you are prohibited from using or
          accessing this site. The materials contained in this website are
          protected by applicable copyright and trademark law.
        </p>
        <p className="mb-4">
          We reserve the right to change these terms of service at any time
          without notice. By using this website you are agreeing to be bound by
          the then current version of these terms of service. Any updates you
          will be notified via email.
        </p>
        <h2 className="text-2xl font-bold mb-2">Security</h2>
        <p className="mb-4">
          We are committed to ensuring that your information is secure. In order
          to prevent unauthorized access or disclosure, we have put in place
          suitable physical, electronic, and managerial procedures to safeguard
          and secure the information we collect online.
        </p>
        <h2 className="text-2xl font-bold mb-2">Cookies</h2>
        <p className="mb-4">
          A cookie is a small file that asks permission to be placed on your
          computer's hard drive. Once you agree, the file is added, and the
          cookie helps analyze web traffic or lets you know when you visit a
          particular site. Cookies allow web applications to respond to you as
          an individual. The web application can tailor its operations to your
          needs, likes, and dislikes by gathering and remembering information
          about your preferences.
        </p>
        <p className="mb-4">
          Overall, cookies help us provide you with a better website by enabling
          us to monitor which pages you find useful and which you do not. A
          cookie in no way gives us access to your computer or any information
          about you, other than the data you choose to share with us.
        </p>
        <h2 className="text-2xl font-bold mb-2">Links to Other Websites</h2>
        <p className="mb-4">
          Our website may contain links to other websites of interest. However,
          once you have used these links to leave our site, you should note that
          we do not have any control over that other website. Therefore, we
          cannot be responsible for the protection and privacy of any
          information which you provide whilst visiting such sites and such
          sites are not governed by this privacy statement. You should exercise
          caution and look at the privacy statement applicable to the website in
          question.
        </p>
        <h2 className="text-2xl font-bold mb-2">
          Controlling Your Personal Information
        </h2>
        <p className="mb-4">
          You may choose to restrict the collection or use of your personal
          information in the following ways:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            If you have previously agreed to us using your personal information
            for direct marketing purposes, you may change your mind at any time
            by writing to or emailing us at [email protected]
          </li>
          <li>
            We will not sell, distribute, or lease your personal information to
            third parties unless we have your permission or are required by law
            to do so. We may use your personal information to send you
            promotional information about third parties which we think you may
            find interesting if you tell us that you wish this to happen.
          </li>
          <li>
            You may request details of personal information which we hold about
            you. If you would like a copy of the information held on you, please
            write to [Your Company Name, Address, City, State, Zip Code] or
            email [email protected]
          </li>
          <li>
            If you believe that any information we are holding on you is
            incorrect or incomplete, please write to or email us as soon as
            possible at the above address. We will promptly correct any
            information found to be incorrect.
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Policy;
