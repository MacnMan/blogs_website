	// app/page.tsx

	import { sanityClient } from './../../lib/sanity.client';
	import { successStoriesQuery } from './../../lib/queries';
	import Hero from '@/components/HomePageComponents/Hero';
	import NavbarWrapper from '@/components/HomePageComponents/NavbarWrapper';
	import SuccessStoriesList from '@/components/successStoriesComponents/SuccessStoriesList';
	import NewlyAddedStories from '@/components/HomePageComponents/NewlyAddedStories';
	import MainContactUs from '@/components/HomePageComponents/MainContactUs';
	import TermsAndConditions from '@/components/HomePageComponents/TermsAndConditions';
	import Sitemap from '@/components/HomePageComponents/Sitemap';
	import Authority from '@/components/HomePageComponents/Authority';

	export default async function HomePage() {
		const stories = await sanityClient.fetch(successStoriesQuery);
		return (
			<>
				<NavbarWrapper />
				<div className="md:pt-[-80px]">
					<Hero />
				</div>
				<main className="sm:ml-12 sm:py-8 sm:max-w-8xl sm:mx-auto sm:space-y-12 overflow-x-hidden">
					{/* Success Stories Section */}
					<section className='overflow-x-hidden'>
						<SuccessStoriesList stories={stories} />
					</section>
				</main>
				<main className="sm:px-16 sm:py-2 sm:max-w-8xl sm:mx-auto sm:space-y-12 overflow-x-hidden">
					<NewlyAddedStories stories={stories} />
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
