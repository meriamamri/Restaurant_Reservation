import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import { Review } from "@prisma/client";

interface RatingProps {
  reviews: Review[];
}

const Rating = (props: RatingProps) => {
  const { reviews } = props;

  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>*****</p>
        <p className="text-reg ml-3">
          {calculateReviewRatingAverage(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
};
export default Rating;
