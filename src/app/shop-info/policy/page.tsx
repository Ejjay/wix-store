import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - EJ Shop",
  description: "Privacy policy for using the EJ Shop services",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="text-left sm:text-center">
        <h2 className="py-5 text-3xl font-bold">Privacy Policy</h2>
        <p>
          Welcome to EJ Shop app! Your privacy is important to us. This privacy policy outlines how we collect, use, and protect your information when you use our application.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Information We Collect</h2>
        <p>
          We may collect personal information from you when you use our services. This information may include:
          <br />
          <br />
          • Name
          <br />
          • Email address
          <br />
          • Phone number
          <br />
          • Payment information
          <br />
          • Location
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">How We Use Your Information</h2>
        <p>
          We use your information to:
          <br />
          <br />
          • Process your orders
          <br />
          • Improve our services
          <br />
          • Communicate with you regarding your orders or inquiries
          <br />
          • Send promotional materials and updates (if you have opted in)
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Data Security</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. Your data is stored behind secured networks and is only accessible by a limited number of people who have special access rights to such systems.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Cookies</h2>
        <p>
          Our application may use &quot;cookies&quot; to enhance user experience. You can choose to have your mobile/computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. If you disable cookies, some features may not function properly.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Changes to Our Privacy Policy</h2>
        <p>
          We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Contact Us</h2>
        <p className="mt-10">
          If you have any questions or concerns regarding this privacy policy, you can contact us via phone number 
          <span className="mx-1"> {/* margin for spacing */} </span>
          <a href="tel:09669828873" className="underline text-blue-600 hover:text-blue-800">
            09669828873
          </a> 
          <span className="mx-1">or email us at</span>
          <span className="mx-1"> {/* margin for spacing */} </span>
          <a href="mailto:christsonalloso021@gmail.com" className="underline text-blue-600 hover:text-blue-800">
            christsonalloso021@gmail.com
          </a>.
        </p>
      </div>
    </main>
  );
}