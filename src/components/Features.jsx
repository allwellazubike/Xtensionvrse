const Features = () => {
  const features = [
    {
      id: 1,
      icon: "verified_user",
      title: "Tangle-Free Guarantee",
      description: "Easy separation & styling",
      iconColor: "text-primary"
    },
    {
      id: 2,
      icon: "spa",
      title: "Lightweight Fiber",
      description: "All-day comfort wear",
      iconColor: "text-primary"
    },
    {
      id: 3,
      icon: "local_shipping",
      title: "Fast Shipping",
      description: "Fast delivery nationwide",
      iconColor: "text-primary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
      {features.map((feature) => (
        <div 
          key={feature.id}
          className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
        >
          {/* Icon */}
          <div className="size-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
            <span className={`material-symbols-outlined ${feature.iconColor}`}>
              {feature.icon}
            </span>
          </div>
          
          {/* Text */}
          <div>
            <h3 className="font-bold text-[#181113] dark:text-white">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;