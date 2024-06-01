import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-20 xl:py-24">
          <div className="container flex flex-col items-center px-4 space-y-4 md:px-6 lg:space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                About Acme Inc
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We`re on a mission to help teams build better software, faster.
                Our platform is designed to take the pain out of development, so
                you can focus on innovation.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl">
              <img
                alt="Photo"
                className="mx-auto aspect-[16/9] overflow-hidden rounded-lg object-cover object-center"
                height="350"
                src="/placeholder.svg"
                width="750"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our Mission
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We believe that every company should be able to deliver
                high-quality software at scale. Our mission is to make that
                vision a reality by providing the tools and infrastructure that
                modern development teams need to succeed.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our Values
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                At Acme Inc, we are guided by a set of core values that inform
                everything we do. We believe in transparency, collaboration, and
                a relentless focus on the customer. Our commitment to excellence
                drives us to continually innovate and improve, and our passion
                for our work shines through in the quality of our products and
                the success of our customers.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our Expertise
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                With decades of combined experience in software development, our
                team is uniquely positioned to understand the challenges that
                modern development teams face. We've been in your shoes, and we
                know what it takes to deliver great software on time and on
                budget.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Meet the Team
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our team is made up of passionate, talented individuals who are
                dedicated to helping our customers succeed. We are committed to
                providing the best possible experience for our users, and we are
                always looking for ways to improve our platform.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8 lg:gap-12 [&>img]:mx-auto">
              <img
                alt="User"
                className="aspect-square rounded-full overflow-hidden object-cover object-center"
                height="150"
                src="/placeholder.svg"
                width="150"
              />
              <img
                alt="User"
                className="aspect-square rounded-full overflow-hidden object-cover object-center"
                height="150"
                src="/placeholder.svg"
                width="150"
              />
              <img
                alt="User"
                className="aspect-square rounded-full overflow-hidden object-cover object-center"
                height="150"
                src="/placeholder.svg"
                width="150"
              />
              <img
                alt="User"
                className="aspect-square rounded-full overflow-hidden object-cover object-center"
                height="150"
                src="/placeholder.svg"
                width="150"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-20 border-t border-gray-200 dark:border-gray-800">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Contact Us
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Ready to take your team`s productivity to the next level?
                Contact us to learn more about our platform and how it can help
                you build better software, faster.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[400px] space-y-4">
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" required type="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
