import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    text: "The quality of these braiding extensions is unmatched. They are so lightweight and the colors are stunning!",
    rating: 5,
  },
  {
    id: 2,
    name: "Amanda T.",
    text: "I've tried many brands, but this one is truly tangle-free. My stylist was so impressed. Will buy again!",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica B.",
    text: "Absolutely love the texture and how long they last. They blend perfectly and look super natural.",
    rating: 5,
  }
];

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary fill-primary">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const Testimonials = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-[#181113] dark:text-white text-3xl font-black mb-2 text-center">Loved by Thousands</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-lg">Don't just take our word for it. Here's what our community has to say about our premium hair extensions.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-1">
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.text}"</p>
            <div className="font-bold text-[#181113] dark:text-white">- {testimonial.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
