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
				<div className="pt-[-80px]">
					<Hero />
				</div>
				<main className="ml-12 py-8 max-w-8xl mx-auto space-y-12 overflow-x-hidden">
					{/* Success Stories Section */}
					<section className='overflow-x-hidden'>
						<SuccessStoriesList stories={stories} />
					</section>
				</main>
				<main className="px-16 py-2 max-w-8xl mx-auto space-y-12 overflow-x-hidden">
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
