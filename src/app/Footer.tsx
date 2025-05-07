import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-secondary py-10 sm:pt-16 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:col-span-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
            <div className="text-2xl font-bold">EJ Shop</div>
            <p className="mt-7 text-base leading-relaxed text-muted-foreground">
               &quot;Commit to the Lord whatever you do, and he will establish your plans.&quot;
                <br />
               <span className="text-base leading-relaxed text-muted-foreground font-bold">— Proverbs 16:3</span>
               </p>

            <ul className="mt-9 flex items-center space-x-3">
             {/* telephone svg*/}
              <li>
                <a
                  href="tel:09669828873"
                  title="Call us"
                  className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-primary focus:bg-primary"
                >
                  <svg 
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                 >
                 <path d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z" fill="white"/>
</svg>
                </a>
              </li>
            {/*Facebook svg*/}
              <li>
                <a
                  href="https://www.facebook.com/share/1LCeKq1JEc/"
                  title=""
                  className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-primary focus:bg-primary"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>
              <li>
              {/* Messenger svg */}
                <a
                  href="https://m.me/ejjaysz"
                  title=""
                  className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-primary focus:bg-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="h-4 w-4" viewBox="0 0 50 50">
                  <path fill="white" d="M 25 2 C 12.347656 2 2 11.597656 2 23.5 C 2 30.007813 5.132813 35.785156 10 39.71875 L 10 48.65625 L 11.46875 47.875 L 18.6875 44.125 C 20.703125 44.664063 22.800781 45 25 45 C 37.652344 45 48 35.402344 48 23.5 C 48 11.597656 37.652344 2 25 2 Z M 25 4 C 36.644531 4 46 12.757813 46 23.5 C 46 34.242188 36.644531 43 25 43 C 22.835938 43 20.742188 42.6875 18.78125 42.125 L 18.40625 42.03125 L 18.0625 42.21875 L 12 45.375 L 12 38.8125 L 11.625 38.53125 C 6.960938 34.941406 4 29.539063 4 23.5 C 4 12.757813 13.355469 4 25 4 Z M 22.71875 17.71875 L 10.6875 30.46875 L 21.5 24.40625 L 27.28125 30.59375 L 39.15625 17.71875 L 28.625 23.625 Z"></path>
                  </svg>
                </a>
              </li>
              
            {/*Github svg*/}
              <li>
                <a
                  href="https://github.com/ejjays"
                  title=""
                  className="flex size-7 items-center justify-center rounded-full bg-foreground text-background transition-all duration-200 hover:bg-primary focus:bg-primary"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Shop info
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="/shop-info/about"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  {" "}
                  About{" "}
                </a>
              </li>

              <li>
                <a
                  href="/shop-info/features"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  {" "}
                  Features{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  {" "}
                  Works{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  {" "}
                  Career{" "}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  {" "}
                  Customer Support{" "}
                </a>
              </li>

              <li>
                <a
                  href="/shop-info/delivery"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  {" "}
                  Delivery Details{" "}
                </a>
              </li>

              <li>
                <a
                  href="/shop-info/terms"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  {" "}
                  Terms & Conditions{" "}
                </a>
              </li>

              <li>
                <a
                  href="/shop-info/policy"
                  title=""
                  className="flex text-base transition-all duration-200 hover:text-primary focus:text-primary"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              📬 Get notified
            </p>

            <form action="#" method="POST" className="mt-6">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="mt-3 inline-flex items-center justify-center rounded-md bg-primary px-6 py-4"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <hr className="mb-10 mt-16" />

        <p className="text-center text-sm text-muted-foreground">
          © Copyright {new Date().getFullYear()}, All Rights Reserved by EJ Shop
        </p>
      </div>
    </footer>
  );
}
