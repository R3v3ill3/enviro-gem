
const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Your Project
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          This is a minimal React project setup, ready for development and GitHub sync.
        </p>
        <div className="mt-8">
          <div className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
            <span className="mr-2">🚀</span>
            Ready to build something amazing
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
