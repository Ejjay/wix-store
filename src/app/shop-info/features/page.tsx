import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features - EJ Shop",
  description: "Discover the features and services offered by EJ Shop",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="text-left sm:text-center">
        <h2 className="py-5 text-3xl font-bold">Features</h2>
        <p>
          At EJ Shop app, we aim to provide straight-forward and convenient shopping services 
          to our customers. Here are the features we offer to make your 
          shopping experience better.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Easy Shopping</h2>
        <p>
          - Simple product browsing and selection
          <br />
          - Clear product descriptions and prices
          <br />
          - Easy-to-use shopping cart
          <br />
          - Straightforward checkout process
          <br />
          - Mobile-friendly Application
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Payment Options</h2>
        <p>
          - Cash on delivery
          <br />
          - GCash payments
          <br />
          - Bank transfer
          <br />
          - Secure payment processing
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Local Delivery</h2>
        <p>
          - Same-day delivery within our service area
          <br />
          - Affordable delivery rates
          <br />
          - Careful handling of items
          <br />
          - Order tracking updates
          <br />
          - Flexible delivery schedule
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Customer Support</h2>
        <p>
          - Quick response to inquiries
          <br />
          - Local phone support
          <br />
          - Easy returns process
          <br />
          - Friendly customer service
          <br />
          - Help with product selection
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Special Offers</h2>
        <p>
          - Regular discounts
          <br />
          - Special deals for regular customers
          <br />
          - Bundle offers
          <br />
          - Seasonal sales
        </p>

        <p className="mt-10">
          For more information about our features or if you need help, please contact us at
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