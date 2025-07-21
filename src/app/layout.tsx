export const metadata = {
  title: "TiTim Airlines",
  description: "TiTim Airlines is a new airlines company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
