import { Star } from "lucide-react";

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`w-4 h-4 lg:w-5 lg:h-5 ${
          rating >= n ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
        }`}
      />
    ))}
  </div>
);

export default RatingStars;