export default function Home() {
  return (
    <div className="p-8 pt-20 text-center">
      <div class="flex items-center justify-center">
        <img src="/images/logo-icon.png" alt="Main Logo" />
      </div>
  
      <h1 className="text-3xl font-bold">Welcome to TeachTech Toolkit!</h1>
      <p className="mt-4">Your one-stop solution for creating and managing autograders.</p>
      <a href="/autograder" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">Get started with our Gradescope autograder tool →</a>
    </div>
  );
}