export default function Footer() {
  return (
    <div className="bg-primary px-20 py-8 mt-[120px]">
      <div className="flex justify-between items-center">
        <p className="text-primary-foreground">
          <span className="font-bold text-2xl inline-block mr-4">Grypto</span>{" "}
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
        <p className="text-primary-foreground">
          Copyright © 2024 <strong>PT Gayuh Ridho Cryptocurrency</strong>. All
          Right Reserved.
        </p>
      </div>
    </div>
  );
}
