import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold text-center">
      <h1 className="text-4xl mb-4">404 - Không tìm thấy trang</h1>
      <p className="text-lg mb-8">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
      </p>
      <Link
        href="/"
        replace
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
