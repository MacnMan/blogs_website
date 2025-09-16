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
import Image from "next/image";

export default async function HomePage() {
	const stories = await sanityClient.fetch(successStoriesQuery);
	const storiesV2 = await sanityClient.fetch(successStoriesV2Query);
	return (
		<>
			<NavbarWrapper />
			<div className="md:pt-[-80px] sm:mx-20 sm:mt-20 overflow-hidden sm:rounded-5xl">
				<Hero />
			</div>
			<main className="sm:mx-12  sm:py-8 sm:max-w-8xl sm:space-y-12 overflow-x-hidden">
				{/* Success Stories Section */}
				<section className='overflow-x-hidden'>
					<SuccessStoriesListV2New stories={storiesV2} />
				</section>
			</main>
			<main className="sm:px-16 sm:py-2 sm:max-w-8xl sm:mx-auto sm:space-y-12 overflow-x-hidden">
				<NewlyAddedStories stories={stories} />

				<section className='overflow-x-hidden px-4 sm:px-0'>
					<SuccessStoriesListHome stories={stories} />
				</section>
			</main>
			{/* Decorative image */}
			<div className="w-full my-10">
				<Image
					src="/blogs/Group 370.svg"
					alt="products image macnman"
					width={1920}   // set a large width for full coverage
					height={200}   // adjust height as needed
					className="w-full h-auto"
				/>
			</div>
			<MainContactUs theme='light' />
			<div className='hidden md:block'>
				<TermsAndConditions theme='light' />
				<Sitemap theme="light" />
				<Authority />
			</div>
		</>
	);
}
