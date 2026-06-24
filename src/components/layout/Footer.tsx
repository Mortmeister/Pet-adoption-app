export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Pet adoption.</p>
      </div>
    </footer>
  );
}
