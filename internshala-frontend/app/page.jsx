import "@/styles/globals.css";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <div className="w-full flex-center flex-col">

        <h1 className="head_text text-center">
          Discover & Apply
          <br className="max-md:hidden" />
          to
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">INTERNSHIPS</span>
        </h1>
        <p className="desc text-center">
          Internshala Automation is an open-source tool that automates your
          internship applications on Internshala.
        </p>
        <p className="text-center desc">
          Save time by logging in, filtering, and applying to top internships
          with just a few clicks. Simplify your search and land your dream
          internship effortlessly!
        </p>
      </div>
    </section>
  );
}

export default Home;
