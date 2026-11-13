import { render, screen } from "@testing-library/react";
import Footer from "@/components/organisms/Footer";
import FooterContact from "@/components/molecules/FooterContact";
import FooterLinks from "@/components/molecules/FooterLinks";
import type { Dictionary } from "@/types/dictionary";

describe("Footer", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-01-01"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders current year", () => {
    render(<Footer />);
    const yearText = screen.getByText(/2023/);
    expect(yearText).toBeInTheDocument();
  });

  it("renders services list inside a responsive grid wrapper", () => {
    render(<Footer />);
    const servicesHeading = screen.getByRole("heading", {
      name: /Szolgáltatások/i,
    });
    const servicesSection = servicesHeading.closest("div");
    const gridWrapper = servicesSection?.querySelector("div.grid");
    expect(gridWrapper).toHaveClass("grid");
    expect(gridWrapper).toHaveClass("grid-cols-1");
    expect(gridWrapper).toHaveClass("sm:grid-cols-2");
    const uls = servicesSection?.querySelectorAll("ul");
    uls?.forEach((ul) => expect(ul).toHaveClass("space-y-2"));
  });

  it("renders quick links list inside a grid wrapper", () => {
    render(<Footer />);
    const quickLinksHeading = screen.getByRole("heading", {
      name: /Gyorslinkek/i,
    });
    const quickLinksSection = quickLinksHeading.closest("div");
    expect(quickLinksSection).toHaveClass("grid");
    expect(quickLinksSection).toHaveClass("grid-cols-1");
    const ul = quickLinksSection?.querySelector("ul");
    expect(ul).toHaveClass("space-y-2");
  });

  it("includes expected link texts", () => {
    render(<Footer />);
    const linkTexts = [
      "Weboldal Készítés",
      "WordPress Webshop",
      "Webshop Fejlesztés",
      "WordPress Fejlesztés",
      "Weboldal Felújítás",
      "Helyi SEO",
      "SEO Optimalizálás",
      "Technikai SEO Audit",
      "Marketing Lead Generálás",
      "WordPress Karbantartás",
      "Weboldal Gyorsítás",
      "WordPress Biztonság",
      "Grafikai Tervezés",
      "Logó Tervezés",
      "Szórólap Tervezés",
      "Csomagolás Tervezés",
      "Egyedi Fejlesztés",
      "Prémium AI & Automatizáció",
    ];
    linkTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("renders localized content when dictionary is provided", () => {
    const dictionary = {
      services: "Services EN",
      quickLinks: "Quick Links",
      contact: "Contact EN",
      copyright: "©",
      rightsReserved: "All rights reserved",
      privacyPolicy: "Privacy",
      termsOfService: "Terms",
      phone: "+1 555 0100",
      email: "hello@example.com",
      address: "New York, USA",
      description: "Localized footer description.",
      serviceLinkItems: [
        { label: "EN Service One", href: "/en/service-one" },
        { label: "EN Service Two", href: "/en/service-two" },
      ],
      quickLinkItems: [{ label: "EN Quick Link", href: "/en/quick" }],
    } as unknown as Dictionary["footer"];

    render(<Footer dictionary={dictionary} />);

    expect(screen.getByText("Localized footer description.")).toBeInTheDocument();
    expect(screen.getByText("EN Service One")).toBeInTheDocument();
    expect(screen.getByText("EN Service Two")).toBeInTheDocument();
    expect(screen.getByText("EN Quick Link")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Quick Links" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Contact EN" })
    ).toBeInTheDocument();
  });
});

describe("FooterContact", () => {
  it("renders default title and address without props", () => {
    render(<FooterContact />);
    expect(
      screen.getByRole("heading", { name: "Elérhetőség" })
    ).toBeInTheDocument();
    expect(screen.getByText("Kecskemét, Magyarország")).toBeInTheDocument();
  });

  it("renders custom title, address and className", () => {
    render(
      <FooterContact
        title="Contact"
        address="Budapest"
        className="custom-class"
      />
    );
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByText("Budapest")).toBeInTheDocument();
  });
});

describe("FooterLinks", () => {
  const links = [
    { name: "Link A", href: "/a" },
    { name: "Link B", href: "/b" },
  ];

  it("renders links with default listClassName", () => {
    render(<FooterLinks title="Links" links={links} />);
    expect(screen.getByRole("heading", { name: "Links" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Link A" })).toHaveAttribute(
      "href",
      "/a"
    );
    expect(screen.getByRole("link", { name: "Link B" })).toHaveAttribute(
      "href",
      "/b"
    );
  });

  it("renders custom className and listClassName", () => {
    render(
      <FooterLinks
        title="Links"
        links={links}
        className="grid grid-cols-1 gap-2"
        listClassName="grid gap-4"
      />
    );
    const heading = screen.getByRole("heading", { name: "Links" });
    expect(heading.parentElement).toHaveClass("grid");
    const ul = heading.parentElement?.querySelector("ul");
    expect(ul).toHaveClass("grid");
    expect(ul).toHaveClass("gap-4");
  });
});
