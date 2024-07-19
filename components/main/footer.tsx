export default function Footer() {
  return (
    <div className="bg-primary px-4 md:px-20 py-6 md:py-8 mt-[60px] md:mt-[120px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="text-primary-foreground text-sm md:text-base">
          <span className="font-bold text-xl md:text-2xl inline-block mr-4">
            Grypto
          </span>{" "}
          <br />
          Build with ❤️ by Gayuh Ridho{" "}
          <a
            className="animate-pulse underline font-bold"
            href="https://www.gayuhridho.site"
            target="_blank"
          >
            (www.gayuhridho.site)
          </a>
        </p>
        <p className="text-primary-foreground text-sm md:text-base">
          Copyright © 2024 <strong>PT Gayuh Ridho Cryptocurrency</strong>. All
          Right Reserved.
        </p>
      </div>
    </div>
  );
}
