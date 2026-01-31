import NewsAPI from '../News/NewsAPI';
import InfiniteTweetCarousal from './InfiniteTweetCarousal';

const FeedContainer = () => {
return (
  <div className="flex flex-col gap-6">
    {/* 1. Carousel at the very top */}
    <div className="w-full">
      <InfiniteTweetCarousal />
    </div>
    <NewsAPI/>
  </div>
  )
}

export default FeedContainer