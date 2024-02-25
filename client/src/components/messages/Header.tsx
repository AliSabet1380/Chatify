interface HeaderProps {
  toUser: string;
}

const Header = ({ toUser }: HeaderProps) => {
  return (
    <div className="bg-slate-500 px-4 mb-2 py-2">
      <span className="label-text">To:</span>
      <span className="text-gray-900 font-semibold text-sm ml-2">{toUser}</span>
    </div>
  );
};
export default Header;
