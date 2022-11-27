import Image from 'next/image';
import Review from '../../interfaces/Review';
import { createdAtDate } from '../../utils/moment';

interface IRoomReviewsProps {
  reviews?: Review[];
}

export default function RoomReviews({ reviews }: IRoomReviewsProps) {
  return (
    <div className="py-10 space-y-4">
      <div className="text-xl font-semibold">
        <h1>{reviews?.length} Reseñas</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {reviews?.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

interface IReviewProps {
  review: Review;
}

function Review({ review }: IReviewProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Image
          alt="user"
          src={review.user.image || '/images/user.jpg'}
          width={40}
          height={40}
          className="object-cover rounded-full"
        />
        <div>
          <h3>{review.user.name}</h3>
          <span className="text-xs text-black opacity-70">
            {createdAtDate(review.createdAt)}
          </span>
        </div>
      </div>
      <div>
        <p className="text-black text-base">{review.description}</p>
      </div>
    </div>
  );
}
