import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery Information - EJ Shop",
  description: "Delivery options and information for EJ Shop in Quezon City and Metro Manila",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="text-left sm:text-center">
        <h2 className="py-5 text-3xl font-bold">Delivery Information</h2>
        <p>
          EJ Shop offers delivery services all around Metro Manila areas 
          through our trusted delivery partners. Please read the following information 
          about our delivery process.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Delivery Coverage</h2>
        <p>
          We currently deliver to:
          <br />
          <br />
          <span className="font-semibold">• Metro Manila areas</span>
          <br />
          <br />
          Note: Delivery is not available outside these areas at the moment.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Delivery Partners</h2>
        <p>
          We partner with trusted delivery services:
          <br />
          <br />
          •  Lalamove
          <br />
          •  Grab
          <br />
          •  Joyride
          <br />
          <br />
          You can choose your preferred delivery service by directly contacting <a href="https://m.me/ejjaysz" className="underline text-blue-600 hover:text-blue-800"> Seller</a>.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Delivery Fees</h2>
        <p>
          <span className="font-semibold"> Please note: </span>
          <br />
          •  Delivery fees are shouldered by the customer
          <br />
          •  Fees are calculated based on distance and delivery partner rates
          <br />
          •  Payment for delivery is made directly to the delivery service
          <br />
          •  Rates may vary depending on your location and chosen delivery partner
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">How It Works</h2>
        <p>
          1. Place your order through our website
          <br />
          2. Choose your preferred delivery partner
          <br />
          3. We will prepare your items for pickup
          <br />
          4. The delivery partner will collect and deliver your items
          <br />
          5. Pay the delivery fee directly to the rider
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Delivery Time</h2>
        <p>
          •  Delivery times vary depending on your location and chosen delivery service
          <br />
          •  Same-day delivery is available for orders placed during business hours
          <br />
          •  You can track your delivery through your chosen delivery partner&apos;s app
        </p>

        <p className="mt-10">
          For delivery inquiries or assistance, please contact us at <span className="mx-0"> {/* margin for spacing */} </span>
          <a href="tel:09669828873" className="underline text-blue-600 hover:text-blue-800">09669828873
          </a> 
          <span className="mx-0"> or email us at</span>
          <span className="mx-1"> {/* margin for spacing */} </span>
          <a href="mailto:christsonalloso021@gmail.com" className="underline text-blue-600 hover:text-blue-800">christsonalloso021@gmail.com
          </a>.
        </p>
      </div>
    </main>
  );
}