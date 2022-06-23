const Header = () => {
  return (
    <div className="flex items-center justify-between py-8 px-4 bg-[#202020]">
      <h1 className="text-3xl text-gray-300 uppercase">kanban </h1>
      <div>
        <span className="mr-4 text-xl text-gray-300">John Doe</span>
        <span className="rounded-full p-2 bg-gray-100 uppercase">JD</span>
      </div>
    </div>
  );
};

export default Header;