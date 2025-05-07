import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - EJ Shop",
  description: "Terms and conditions for using the EJ Shop services",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="text-left sm:text-center">
        <h2 className="py-5 text-3xl font-bold">Terms and Conditions</h2>
        <p>
          Welcome to EJ Shop app! By using our service, you agree to be bound
          by these terms and conditions. Please read them carefully before
          placing any orders.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Ordering and Delivery</h2>
        <p>
          All orders placed through our application will be processed and
          delivered in a timely manner. We make sure to ship all orders within 3-5
          business days, but delivery times may vary depending on your location
          and the availability of the items ordered.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Payment Methods</h2>
        <p>
          We accept the following payment methods:
          <br />
          <br />
          • Gcash
          <br />
          • Credit/Debit Cards
          <br />
          • Cash on Delivery (for select locations)
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Returns and Refunds</h2>
        <p>
          We want you to be completely satisfied with your purchase. If for any
          reason you are not happy with your order, you can return the item(s)
          within 14 days of delivery for a full refund. Please refer to our
          Returns Policy for more details.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Privacy and Security</h2>
        <p>
          We take the privacy and security of our customers very seriously. We
          will never share your personal information with third parties without
          your consent. For more information, please review our
          <span className="mx-0"> {/* margin for spacing */} </span>
            <a href="./policy" className="underline text-blue-600 hover:text-blue-800">Privacy Policy
            </a>.
        </p>
        <h2 className="mt-10 py-5 text-3xl font-bold">Intellectual Property</h2>
        <p>
          All content and materials on the EJ Shop app, including but not
          limited to text, graphics, logos, and images, are the property of EJ
          Shop and are protected by copyright and trademark laws. Unauthorized
          use or reproduction of these materials is strictly prohibited.
        </p>
        
        <p className="mt-10">
  If you have any questions or concerns, you can contact us via phone number 
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