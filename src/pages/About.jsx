const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">About PersonalBlog</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to PersonalBlog, a platform dedicated to sharing insightful stories, tutorials, and experiences from creators around the world. Our mission is to foster a community where ideas can flourish and knowledge can be freely exchanged.
      </p>
      <p className="text-lg text-gray-700 mb-6">
        Whether you're here to read inspiring blogs, engage with content through likes and comments, or simply explore new perspectives, we hope you find value in every post. Stay connected and keep the conversation going!
      </p>
      <div className="text-center">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
          alt="About us"
          className="rounded-lg shadow-md mx-auto max-w-md"
        />
      </div>
    </div>
  );
};

export default About;