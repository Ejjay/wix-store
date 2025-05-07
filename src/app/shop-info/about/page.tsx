import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - EJ Shop",
  description: "Learn more about EJ Shop and our commitment to quality service",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="text-left sm:text-center">
        <h2 className="py-5 text-3xl font-bold">About EJ Shop</h2>
        <p>
          Welcome to EJ Shop! We are dedicated to providing high-quality products and exceptional 
          shopping experiences to our valued customers. Our journey began with a simple vision: 
          to create a convenient and reliable online shopping destination.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Our Mission</h2>
        <p>
          At EJ Shop, our mission is to deliver excellence in every aspect of your shopping experience. 
          We strive to:
          <br />
          <br />
          - Provide high-quality products at competitive prices
          <br />
          - Ensure fast and reliable delivery services
          <br />
          - Offer exceptional customer support
          <br />
          - Maintain transparency in all our operations
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">What Sets Us Apart</h2>
        <p>
          We pride ourselves on:
          <br />
          <br />
          - Carefully curated product selection
          <br />
          - Rigorous quality control
          <br />
          - Responsive customer service
          <br />
          - Secure shopping environment
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Our Commitment</h2>
        <p>
          We are committed to continuous improvement and innovation in our services. 
          Your satisfaction is our top priority, and we work tirelessly to ensure that 
          every interaction with EJ Shop exceeds your expectations.
        </p>

        <h2 className="mt-10 py-5 text-3xl font-bold">Customer Service</h2>
        <p>
          We believe in building strong relationships with our customers through excellent 
          service and support. Our dedicated team is always ready to assist you with any 
          questions or concerns you may have.
        </p>

        <p className="mt-10">
          If you have any questions or would like to learn more about EJ Shop, you can contact us via phone number 
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