const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-3 mt-10 border-t">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} Mithil's Personal Blog — All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
