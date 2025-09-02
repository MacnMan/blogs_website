// app/page.tsx

import { sanityClient } from './../../lib/sanity.client';
import { successStoriesQuery, successStoriesV2Query } from './../../lib/queries';
import Hero from '@/components/HomePageComponents/Hero';
import NavbarWrapper from '@/components/HomePageComponents/NavbarWrapper';
import SuccessStoriesListHome from '@/components/SuccessStoriesComponents/SuccessStoriesListHome';
import NewlyAddedStories from '@/components/HomePageComponents/NewlyAddedStories';
import MainContactUs from '@/components/HomePageComponents/MainContactUs';
import TermsAndConditions from '@/components/HomePageComponents/TermsAndConditions';
import Sitemap from '@/components/HomePageComponents/Sitemap';
import Authority from '@/components/HomePageComponents/Authority';
import SuccessStoriesListV2New from '@/components/SuccessStoriesVersionComponents/SuccessStoriesListV2New'

export default async function HomePage() {
	const stories = await sanityClient.fetch(successStoriesQuery);
	const storiesV2 = await sanityClient.fetch(successStoriesV2Query);
	return (
		<>
			<NavbarWrapper />
			<div className="md:pt-[-80px]">
				<Hero />
			</div>
			<main className="sm:ml-12 sm:py-8 sm:max-w-8xl sm:mx-auto sm:space-y-12 overflow-x-hidden">
				{/* Success Stories Section */}
				<section className='overflow-x-hidden'>
					<SuccessStoriesListHome stories={stories} />
				</section>
			</main>
			<main className="sm:px-16 sm:py-2 sm:max-w-8xl sm:mx-auto sm:space-y-12 overflow-x-hidden">
				<NewlyAddedStories stories={stories} />

				<section className='overflow-x-hidden'>
					<SuccessStoriesListV2New stories={storiesV2} />
				</section>
			</main>
			<MainContactUs theme='light' />
			<div className='hidden md:block'>
				<TermsAndConditions theme='light' />
				<Sitemap theme="light" />
				<Authority />
			</div>
		</>
	);
}
